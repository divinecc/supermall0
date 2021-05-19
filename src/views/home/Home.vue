<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home"; //只有default导出才能把大括号删除，但是这的这个getHomeMultidata不是default导出，所以必须加大括号

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  //使用生命周期函数，当页面一旦创建好，就发送网络请求
  created() {
    //1.请求多个数据
    this.getHomeMultidata(); //注意这里必须加this
    //2.请求商品数据
    this.getHomeGoods("pop"); //注意这里必须加this
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    /*
      以下是事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //scrollTo方法是就是指定页面滚到哪个坐标，第一个和第二个参数就是x和y坐标，第三个参数是滚动的时间
      //this.$refs.scroll.scroll.scrollTo(0, 0, 500); //第一个scroll是上面组件定义的ref=scroll的scroll，第二个scroll是 Scroll.vue里面的data里面的scroll
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000; //加负号是y值始终是一个负值
      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh(); //刷新
    },
    //获取tabControl的offsettop值，不能在mounted里面进行，因为虽然mounted是挂载，但是有可能图片还没有加载完成，特别是轮播图这样较大的图，这样获取的值会比真实值小，不太准确
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
      以下是网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list); //这句话的意思就是把拿到的第一页的30条数据进行解构，边城一个个单独的元素，然后通过push，添加到goods对应类型的list中进行保存
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp(); //调用这个方法是为了可以一直上拉加载更多
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动，使用下面的属性，用了bscroll之后，就可以不用下面的属性了 */
  position: fixed; /*这句话的意思是上下滑动屏幕的时候让这个导航栏不要动*/
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>