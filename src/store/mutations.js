export default {
  //mutations唯一的目的就是修改state中变量的状态
  //mutations中的每一个方法尽可能完成的事件比较单一一点
  // addCart(state, payload) {
  //   //1.由于购物车里面添加的是不同的商品，同一商品只在数量上有累计，所以在加入购物车之前要先判断cartList里面是否已经有该商品了
  //   // let oldProduct = null;
  //   //法一：
  //   // for (let item of state.cartList) {
  //   //   if (item.iid === payload.iid) {
  //   //     oldProduct = item;
  //   //   }
  //   // }

  //   //法二:
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid);//find()函数是返回满足条件的第一个数组中的值

  //   //2.判断oldProduct
  //   if (oldProduct) {
  //     oldProduct.count += 1;
  //   } else {
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }
  // }
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    state.cartList.push(payload)
  }
}