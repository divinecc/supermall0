module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //'@':'src'  //这个是已经配置好的别名，不用自己写 @指的就是src
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',
        'components': '@/components'
      }
    }
  }
}