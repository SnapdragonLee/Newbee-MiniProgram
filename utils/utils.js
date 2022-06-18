import { APIS } from "./api.js"

const apis = APIS
const app = getApp()
var infonickname

function login(logname) {
  return new Promise(function (resolve, reject) {
    console.log(APIS)
    infonickname = logname;
    console.log(infonickname)
    uni.login({
      provider: 'weixin',
      success: function(res){
        /*uni.getUserInfo({
              provider: 'weixin',
              success: function (infoRes) {
                console.log(infoRes.userInfo.nickName);
                infonickname = infoRes.userInfo.nickName;
              }
            });*/
        if(res.code){
          console.log("发送登录信息");
          console.log(res.code);
          uni.showLoading({
            title: '正在登录',
            mask: true,
          })
          
          uni.request({
            url: app.globalData.domain + apis.login.url,
            data: {
              code: res.code,
              username: infonickname,
            },
            method: apis.login.method,
            /*header: {
              'content-type' : 'application/x-www-form-urlencoded',
            },*/
            success(_res){
              uni.hideLoading()
              //成功登录回调
             if(app.globalData.intest){
                console.log(_res);
              }
              app.globalData.header['Cookie'] = _res.header['Set-Cookie'].split(';')[0];
              uni.setStorageSync('Cookie', app.globalData.header['Cookie'])
              app.globalData.userInfo["username"] = _res.data.username;
              console.log("登录成功");
              console.log(app.globalData.header['Cookie'])
              resolve(_res.data)
            },
            fail(_res){
              uni.hideLoading()
              //网络连接问题回调
              uni.showToast({
                title: '网络故障',
                mask: true,
              })
            }
          })
        }else{
          uni.showToast({
            title: '登陆失败',
            mask: true
          })
        }
      },
    });
  })
}

function request({
  url,
  data,
  method,
}){
  return new Promise(function(resolve, reject) {
    uni.request({
      url: app.globalData.domain + url,
      data: data,
      method: method,
      header: app.globalData.header,
      success(ress){
        if(ress.data.ret == 2){
          app.globalData.already_login = false;
          uni.redirectTo({
            url: '/pages/login/login'
          })
        }else{
          resolve(ress);
        }
      },
      fail(errr){
        uni.showToast({
          title: '网络故障',
          icon:"error",
        })
        reject(err)
      }  
    })     
 })
} 

module.exports = {
  login: login,
  request: request,
  APIS: apis,
}