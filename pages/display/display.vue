<template>
  <view>
    <image src="../../static/display.png" mode=""></image>
    <rich-text :nodes="pro_id.data"></rich-text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        pro_id: {}
      };
    },
    onReady() {
      let that = this;
      uni.getStorage({
        key: 'nav_id',
        success:function(res){
          that.$data.pro_id = res;
        }
      })
      try{
        pro_id = uni.getStorageSync('nav_id');
        console.log(pro_id);
      }catch(e){
        //TODO handle the exception
      }
    }
  }
</script>

<style lang="scss">

</style>
