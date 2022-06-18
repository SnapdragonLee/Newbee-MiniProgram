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
    <view class="billbord">
      <view>
        <rich-text nodes="<h1 style='color: white;display: flex; font-size:30px;justify-content: center; align-items:flex-start'>公告栏</h1>"></rich-text>
        <rich-text  class="notice_class" :nodes=notice ></h1>"></rich-text>
      </view>
      
    </view>
  </view>
  
</template>

<script>
  export default {
    data() {
      return {
		recookie : '',
		notice:'',
      };
    },
	methods:{
		re_login(){
		  console.log('re_login')
		  uni.setStorageSync('re_log',1)
		  uni.redirectTo({
		    url: '../login/login'
		  })
		}
	},
	onShow(e){
		console.log('onshow')
		uni.checkSession({
		  success: (res) =>{
//		    uni.showToast({
//		      title:'用户登录成功'
//		    })
		    console.log('session有效')
		  },
		  fail: (err) => {
		    console.log('session失效')
		    this.re_login();
		  }
		})
		  uni.request({
		  	url: 'http://122.9.32.180/api/user/notice' ,
		  	method: 'GET',
			header: {
				Cookie: this.recookie
			},
		  	success:(res)=>{
				console.log(res)
				console.log(this.recookie)
				this.notice = res.data.content
		  	},
		  	fail(res){
		  		console.log('fail')
		  	}
		  })
	},
	onLoad(){
		this.recookie = uni.getStorageSync('Cookie');
	},
  }

</script>


<style lang="scss">
  .swiper-container{
    height: 500rpx;
  }
  .scrollstyle{
    display: flex;
    justify-content: center;
  }
  .billbord view{
    margin-top: 50rpx;
    width: 100%;
    height: 600rpx;
    text-align: center;
    line-height: 100rpx;
  }
  .billbord view:nth-child(1) {
    background-color: black;
  }
  .notice_class{
	  color: white;
	  width: 80%;
	  font-size:18px;
	  display: flex;   
	  justify-content: center;
	  flex-direction: row;
	  align-items: center;
	  margin: 0 auto;
  }
</style>
