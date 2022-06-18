<template>
  <view>
    <swiper class="swiper-container" indicator-dots indicator-color="grey" indicator-active-color="white" autoplay="true" interval="2500" circular="true">
      <swiper-item>
        <view class="scrollstyle">
          <image src="../../static/scroll2.jpg" mode = "aspectFit"></image>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="scrollstyle">
          <image src="../../static/scroll1.jpg" mode = "aspectFit"></image>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="scrollstyle">
          <image src="../../static/scroll3.jpg" mode = "aspectFit"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="login-container">
      <uni-icons type="contract-filled" size= "100" color= "#AFAFAF"></uni-icons>
       <button type = "primary" class="btn-login" @click = "getuser">微信授权登录</button>
       <view class="tips-text">@Copyright NewbeeEnglish</view>
    </view>
    
  </view>
  
</template>

<script>
  import utils from "../../utils/utils.js"
  
  export default {
    data() {
      isshow : false;
      userinfo:{};
      const app = getApp();
      return {
      }
    },
    
    methods: {
      onLoad(){
        let isshow = uni.getStorageSync('isshow') || false;
        let userinfo = uni.getStorageSync('userinfo')
        let check_session = uni.getStorageSync('Cookie')
        let re_judge = uni.getStorageSync('re_log')
        console.log('check'+check_session)
        if(re_judge != 1){
          if(isshow){
            isshow: true;
            uni.switchTab({
              url:'../Home/Home'
            })
          }
        }        
      },
      
      
      getuser(){
       uni.getUserProfile({
         desc:'微信授权登录',
         success(res) {
           isshow : true;
           let userinfo = res.userInfo
           uni.setStorageSync('re_log',0)
           uni.showToast({
             title: '授权成功',
             icon:'none'
           })
           console.log(res.userInfo.nickName)
           utils.login(res.userInfo.nickName)
           uni.switchTab({
             url:'../Home/Home'
           })
           uni.setStorageSync('isshow',true)
           uni.setStorageSync('userinfo', userinfo)
           console.log(res)
           
         },
         fail() {
           uni.showToast({
             title: '拒绝就赶紧滚',
             icon:'none'
           })
         }
       })
      }
    }
  }
</script>


<style lang = "scss">
  .swiper-container{
    height: 500rpx;
  }
  .scrollstyle{
    display: flex;
    justify-content: center;
  }
  .login-container {
  // 登录盒子的样式
  height: 500rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
