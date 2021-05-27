import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//使用懒加载插件
Vue.use(VueLazyLoad)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')