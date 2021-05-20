<template>
  <div id="App">
    <!-- 用keep-alive是为了让跳转时，路由不会销毁 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "../src/components/content/mainTabbar/MainTabBar.vue";
export default {
  name: "App",
  components: { MainTabBar },
};
</script>

<style>
@import "assets/css/base.css";
</style>
