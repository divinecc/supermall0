<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 以防属性被替换掉，最好给插槽最外面包装一层div -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive() {
      //这个的逻辑就是，将当前活跃的路由的路径与此时获得的路径进行比较，如果相等就是true，变红，不相等就是false，就还是黑色的
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      //判断是否处于活跃状态，是的话，则把获取的颜色赋给color，不是则传一个空的
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push("/location").catch((err) => {
        console.log(err);
      });
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>