<template>
  <view>
    <view class="my-userinfo-container">
      <view class="top-box">
        <image :src="avatar" class = "ava"></image>
        <view class="nic" >
          <rich-text :nodes="name" class="nic"></rich-text>
        </view>
      </view>
    </view>
    
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body">
            <view class="panel-item" @click="click1()">
              <image src="../../static/mistake.jpg" class="icon"></image>
              <rich-text nodes='错题本' class="title"></rich-text>
            </view>
            <view class="panel-item" @click="click2()">
              <image src="../../static/history.jpg" class="icon"></image>
              <rich-text nodes='历史记录' class="title"></rich-text>
            </view>
            <view class="panel-item" @click="click3()">
              <image src="../../static/rank.jpg" class="icon"></image>
              <rich-text nodes='刷题积分排行' class="title"></rich-text>
            </view>
            <view class="panel-item" @click="click4()">
              <image src="../../static/s_rank.png" class="icon"></image>
              <rich-text nodes='题解积分排行' class="title"></rich-text>
            </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        List: [],
        avatar: '',
        name: ''
      };
    },
    onLoad() {
      this.getavatar(),
      this.getname()
    },
    methods:{
      getavatar(){
        let that = this
        uni.getStorage({
          key: 'userinfo',
          success(res)  {
            that.avatar = res.data.avatarUrl
            console.log(that.avatar)
          }
        })
      },
      getname(){
        let that = this
        uni.getStorage({
          key: 'userinfo',
          success: (res) => {
            that.name = res.data.nickName
            console.log(that.name)
          }
        })
      },
      click0() {
        
           uni.navigateTo({
             url: '../change_name/change_name'
           })
        },
      click1() {
        
           uni.navigateTo({
             url: '../mistakes/mistakes'
           })
        },
       click2() {
           uni.navigateTo({
             url: '../history/history'
           })
        },
      click3() {
           uni.navigateTo({
             url: '../rank/rank'
           })
        
        },
      click4() {
           uni.navigateTo({
             url: '../s_rank/s_rank'
           })
        
        },
      
      
      
    }
  }
</script>

<style lang="scss">
.my-userinfo-container{
  height: 100%;
  background-color: #f4f4f4;
  .top-box{
    height: 400rpx;
    background-color:#000000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ava{
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 3px solid #FFFFFF;
    }
    .nic{
      font-size: 25px;
      color: #FFFFFF;
      font-weight: bold;
      margin-top: 20px;
    }
  }
}
  
.panel-list {
  padding: 0 10px;
  position: relative;
  top: 20px;

  .panel {
    background-color: white;
    border-radius: 5px;
    margin-bottom: 8px;

    .panel-body {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .panel-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
        border-radius: 10rpx;
        
        font-size: 13px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 5rpx solid #000000;

        .icon {
          width: 30px;
          height: 30px;
          margin-left: 20px;
          margin-right: 20px;
        }
        
        .title{
          font-size: 25px;
          color: #000000;
          font-weight:bold;
        }
      }
    }
  }
}
</style>
