import axios from 'axios'

export function request(config) {

  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {  //use函数有两个参数，这两个参数都是函数，名字怎么取都得行，但是第一个返回的好像就是配置，拦截成功调用第一个函数，拦截失败返回第二个函数
    console.log(config);

    return config  //这里一定要记得返回config，因为拦截了，内部就没有config了
  }, err => {
    console.log(err);
  })

  //2.2响应拦截的作用
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data  //这里将结果拦截掉了，然后进行一定的处理，处理完成之后，还需要将数据返回回去，不然在其他地方要使用数据的时候，就无法获取这些数据 
  }, err => {
    console.log(err);
  })



  //3.发送真正的网络请求
  return instance(config) //因为request函数本身返回的就直接是Promise
}

