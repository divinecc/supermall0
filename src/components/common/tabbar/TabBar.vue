<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
// 注意components里面主要放的是一些公共的组件，一些功能模块的组件尽量进件一个view文件，放到这里面
</script>

<style>
#tab-bar {
  /* 这个flex是为了把里面的几个元素等距离分开 */
  display: flex;
  background-color: #f6f6f6;
  /* 下面这四句话是把这个盒子定位到手机的底部 fixed是把它定到（0,0）这个坐标，然后离左、右、下边为0，这样就把盒子定位到了界面的最底部 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 这个是给这个盒子搞一个阴影 第一个参数是x轴偏移，向右为正，此时不需要左右偏移，所以为0，第二个参数是y轴偏移，向下为正，所以应该给一个负值，第三个不晓得，可能是宽度啥的吧，第四个是颜色 */
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.15);
}
</style>