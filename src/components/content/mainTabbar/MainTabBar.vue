<template>
  <!-- 这里的标签名本来是TabBar,但是由于HTML不能识别驼峰命名，所以要写成下面这种形式 -->
  <tab-bar>
    <tab-bar-item path="/home" activeColor="tomato">
      <!-- 注意assets前面的波浪号！！！在HTML里面使用自己命名的路径时，需要在前面加~ -->
      <img slot="item-icon" src="~assets/image/tabbar/home.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/image/tabbar/home_active.png"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" activeColor="tomato">
      <img slot="item-icon" src="~assets/image/tabbar/category.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/image/tabbar/category_active.png"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/cart" activeColor="tomato">
      <img slot="item-icon" src="~assets/image/tabbar/cart.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/image/tabbar/cart_active.png"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" activeColor="tomato">
      <img slot="item-icon" src="~assets/image/tabbar/profile.png" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/image/tabbar/profile_active.png"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>


<script>
// 注意！！！这些地方都是给文件路径起了别名，所以才可以不用写../
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>