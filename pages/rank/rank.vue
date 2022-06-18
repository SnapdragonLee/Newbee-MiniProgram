<template>
  <view>
    <uni-section title="排行榜" type="line">
      <view class="rich-text-wrp">
        <rich-text class="font-title">排名</rich-text>
        <rich-text class="font-title">用户</rich-text>
        <rich-text class="font-title">积分</rich-text>
      </view>
      <view>
        <view v-for="(item, index) in swipeList" :key="item.id">
          <view class="content-box">
            <text>{{item.rank}}</text>
            <text>{{item.name}}</text>
            <text>{{item.score}}</text>
          </view>
        </view>
        <uni-section padding=25px>
          <uni-pagination :total="sum" title="标题文字" pageSize="12" @change="page_change"></uni-pagination>
        </uni-section>
      </view>
    </uni-section>
  </view>
</template>

<script>
  import utils from "../../utils/utils.js"
  import {
    APIS
  } from "../../utils/api.js"
  const apis = APIS
  const app = getApp()
  var cu_page = 1
  var cu_num = 0
  var ques_type = null
  var recookie = uni.getStorageSync('Cookie')
  //var recookie = null
  export default {
    components: {},
    data() {
      return {
        show: false,
        isOpened: 'none',
        swipeList: [],
        rank_list: [],
        sum: 1,
        rank: 0,
        items: ['单项选择', '完型填空', ' 阅读理解'],
        styles: [{
            value: 'button',
            text: '按钮',
            checked: true
          },
          {
            value: 'text',
            text: '文字'
          }
        ],
        colors: ['#007aff', '#4cd964', '#dd524d'],
        current: 0,
        current_tab: 0,
        colorIndex: 0,
        activeColor: '#007aff',
        styleType: 'button'
      }
    },
    mounted() {
      setTimeout(() => {
        this.current = 5
      }, 3000)
    },
    onReady() {
      let that = this;
      let arraytemp = [];
      let crt = 0;
      recookie = uni.getStorageSync('Cookie')
      console.log(recookie)
      this.get_list(crt)
      // 模拟延迟赋值
      setTimeout(() => {
        this.isOpened = 'right';
      }, 1000);

      uni.$on('update', res => {
        console.log(111);
        this.swipeClick({
          content: {
            text: '添加'
          }
        })
      })
    },
    methods: {
      seg_onClickItem(e) {
        this.current_tab = 1;
        if (this.current_tab !== e.currentIndex) {
          this.current_tab = e.currentIndex
        }
        console.log('分栏type' + this.current_tab)
        //uni.setStorageSync('store_wrong_tab',this.current_tab)
        cu_page = 1
        this.get_list(this.current_tab)
      },
      get_list(ptype) {
        let arraytemp = []
        let pr_list = []
        let that = this
        var ttype = null
        this.$data.swipeList = []
        //console.log(type)
        console.log(cu_page)

        new Promise((resolve, reject) => {
          uni.request({
            url: app.globalData.domain + apis.get_rank.url,
            method: "GET",
            header: {
              Cookie: recookie
            },
            data: {
              pagenumber: cu_page
            },
            success: (res) => {
              resolve(res)
            }
          })
        }).then(res => {
          console.log(res)
          this.$data.rank_list = res.data.rank_que_list
          this.$data.sum = res.data.page_all
          console.log(this.$data.rank_list)

          console.log(this.$data.sum)
          for (let i = 0; i < this.$data.rank_list.length; i++) {
            let questemp = {}
            let thisrank = 0
            console.log(cu_page)
            this.$data.rank = 12 * (cu_page - 1) + i + 1
            console.log(this.$data.rank)
            thisrank = this.$data.rank
            questemp = this.$data.rank_list[i]
            //console.log(questemp)
            let ttmp = {}
            ttmp.num = i
            let blank1 =
              '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
            let blank2 = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
            ttmp.rank = thisrank
            ttmp.name = questemp["user_name"]
            ttmp.score = questemp["rank_question"]
            //console.log(ttmp)
            arraytemp.push(ttmp)
          }
          that.$data.swipeList = arraytemp
        })


      },

      page_change(e) {
        //console.log(e)
        this.current = e.current
        this.type = e.type
        console.log(this.type)
        if (this.type == 'next') {
          cu_page++;
          console.log(ques_type)
          this.get_list(ques_type)
        } else if (this.type == 'prev') {
          if (cu_page == 1) {} else {
            cu_page--;
            this.get_list(ques_type)
          }
        }
      }

    }
  }
</script>

<style lang="scss">
  .font-title {
    font-size: 20px;
    font-weight: bolder;
  }

  .example-body {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    padding: 0;
  }

  .uni-common-mt {
    margin-top: 30px;
  }

  .uni-padding-wrap {
    // width: 750rpx;
    padding: 0px 30px;
  }

  .seg_content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
    height: 100%;
    weight: 100%;
    text-align: center;
  }

  .seg_content-text {
    font-size: 14px;
    color: #666;
  }

  .color-tag {
    width: 25px;
    height: 25px;
  }

  .uni-list {
    flex: 1;
  }

  .uni-list-item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex: 1;
    flex-direction: row;
    background-color: #FFFFFF;
  }


  .uni-list-item__container {
    padding: 12px 15px;
    width: 100%;
    flex: 1;
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    /* #endif */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #eee;
  }

  .rich-text-wrp {
    display: flex;
    justify-content: space-between;
    padding: 0 25rpx;
    background-color: #fff;
  }

  .uni-list-item__content-title {
    font-size: 14px;
  }

  .content-box {
    display: flex;
    flex: 1;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
    weight: 100%;
    padding: 0 15px;
    position: relative;
    background-color: #fff;
    border-bottom-color: #f5f5f5;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  .container {
    height: 100%;
    weight: 600px;
  }

  .content-rank {
    display: flex;
    justify-content: flex-start;
    font-size: 15px;
  }

  .example-body {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    justify-content: center;
    padding: 10px 0;
    background-color: #fff;
  }

  .example-body {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
  }

  .btn-view {
    /* #ifndef APP-NVUE */
    display: flex;
    flex-direction: column;
    /* #endif */
    padding: 15px;
    text-align: center;
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }

  .btn-flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .button {
    margin: 20px;
    width: 150px;
    font-size: 14px;
    color: #333;
  }
</style>
