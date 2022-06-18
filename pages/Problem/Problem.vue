<template>
  <view>
    <view class="my-userinfo-container">
      <view class="top-box">
        <image src="../../static/scroll2.jpg" class = "ava"></image>
        <view class="nic" >
          <rich-text nodes="NewBee English" class="nic"></rich-text>
        </view>
      </view>
    </view>
    
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body">
            <view class="panel-item" @click="handleClick()">
              <image src="../../static/choice.png" class="icon"></image>
              <rich-text nodes='单项选择' class="title"></rich-text>
            </view>
            <view class="panel-item" @click="wanxingClick()">
              <image src="../../static/wanxing.png" class="icon"></image>
              <rich-text nodes='完形填空' class="title"></rich-text>
            </view>
            <view class="panel-item" @click="yueduClick()">
              <image src="../../static/reading.png" class="icon"></image>
              <rich-text nodes='阅读理解' class="title"></rich-text>
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

      };
    },
	methods:{
		handleClick(){
			uni.navigateTo({
				url: '../problem_danxuan/problem_danxuan',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		yueduClick(){
			uni.navigateTo({
				url: '../problem_yuedu/problem_yuedu',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		wanxingClick(){
			uni.navigateTo({
				url: '../problem_wanxing/problem_wanxing',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
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
