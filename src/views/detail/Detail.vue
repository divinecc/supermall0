<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">
          {{ item }}
        </li>
      </ul>
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :images-info="imagesInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImagesInfo from "./childComps/DetailImagesInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      imagesInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },

  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //1.获取数据
      const data = res.result;
      //2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //4.创建店铺信息
      this.shop = new Shop(data.shopInfo);
      //5.保存商品的详情数据
      this.imagesInfo = data.detailInfo;
      //6.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 下面的这几行代码按理说注释不用打开，但是如果后面测试不对的话就还是把他打开好了
      // this.$nextTick(() => {
      //   //这个位置获取的值不对，不对的原因是图片没有计算在内
      //   //根据最新的数据，对应的DOM是已经被渲染出来了，但是图片依旧是没有加载完(目前获取到的offsetTop是不包含其中的图片的)
      //   //offsetTop值不对的时候，一般都是因为图片没加载完
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE); //在最后放入一个很大很大的数，便于后面判断区间，这样就不用分成两种情况
        console.log(this.themeTopYs);
      });
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },

    addToCart() {
      //1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里面
      // this.$store.commit("addCart", product);  commit是同步操作
      this.$store.dispatch("addCart", product); //dispatch处理的是异步操作
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>