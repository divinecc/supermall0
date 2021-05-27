export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);//这个传过来的payload就是在详情页定义的product
      //2.判断oldProduct
      if (oldProduct) { //数量+1
        // oldProduct.count += 1; 因为这个是操作属性，所以可以放到mutations里面去
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else { //添加新的商品
        payload.count = 1;
        // context.state.cartList.push(payload)  这个也是操作属性，也可以放到mutations里面去
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}