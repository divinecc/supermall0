// 防抖函数,解决重复频繁调用问题
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间格式化
export function formatDate(date, fmt) {
  //1.获取年份
  //y+是正则表达式，表示匹配一个或者多个y
  //y* 表示 0个或者多个y
  //y? 表示 0个或者1个y
  //RegExp是一个全局变量，表示的是匹配到的结果，RegExp.$1.length就是匹配到的结果的长度，如果是yyyy，长度为4, 4-4=0，所以从第0个开始截取，最后获得的结果就是2021
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  //获取
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
