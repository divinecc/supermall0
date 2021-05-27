import Toast from './Toast.vue'
const obj = {}

obj.install = function (Vue) {
  // document.body.appendChild(Toast.$el) //这句话是将Toast的模板添加到页面上,思想逻辑是对的，但是这样好像不能实现

  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  //3.将组件构造器手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是上面创建的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast  //把Toast组件放到原型对象上，意味着在其他地方可以拿到这个对象
}

export default obj