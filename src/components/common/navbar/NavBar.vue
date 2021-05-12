<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px; /*导航栏的高度一般为44，line-height可以使得文字上下居中,line-height要生效，必须要有内容*/
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.3);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>