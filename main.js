
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//internet request
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

$http.baseURL = "http://122.9.32.180:80/"
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中…'
  })
}

$http.afterRequest = function() {
  uni.hideLoading()
}

uni.$showMsg = function(title = '数据请求失败！', duration = 1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif