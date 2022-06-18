<template>
	<view>
		<uni-section title="历史记录" type="line">
      <view class="sta_btn_container">
        <button type="warn" class="sta_btn" @click="to_sta()">
          <rich-text nodes='刷题统计' class="sta_btn_text"></rich-text>
        </button>
      </view>
      
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current_tab" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="seg_onClickItem" />
			</view>
      

				<view v-if="current_tab === 0">
          	<uni-swipe-action ref="swipeAction">
          		<uni-swipe-action-item
          		    v-for="(item, index) in swipeList"
          		    :right-options="item.options"
          		    :key="item.id"
          		    @click="swipeClick($event, index)"
          		>
          			<button class="content-box" @click="click_nav(index)">
          				<text class="content-text">{{ item.content }}</text>
          			</button>
          		</uni-swipe-action-item>
          	</uni-swipe-action>
            <uni-section padding = 25px>
            			<uni-pagination :total="sum" 
                  title="标题文字" 
                  pageSize="10"
                  @change = "page_change">
                  </uni-pagination>
            </uni-section>
          </view>
        
        
				<view v-if="current_tab === 1">
          <view class="container">
          	<uni-swipe-action ref="swipeAction">
          		<uni-swipe-action-item
          		    v-for="(item, index) in swipeList"
          		    :right-options="item.options"
          		    :key="item.id"
          		    @click="swipeClick($event, index)"
          		>
          			<button class="content-box" @click="click_nav(index)">
          				<text class="content-text">{{ item.content }}</text>
          			</button>
          		</uni-swipe-action-item>
          	</uni-swipe-action>
            <uni-section padding = 25px>
            			<uni-pagination :total="sum" 
                  title="标题文字" 
                  pageSize="10"
                  @change = "page_change">
                  </uni-pagination>
            </uni-section>
          </view>
        </view>
        
        
				<view v-if="current_tab === 2">
          <view class="container">
          	<uni-swipe-action ref="swipeAction">
          		<uni-swipe-action-item
          		    v-for="(item, index) in swipeList"
          		    :right-options="item.options"
          		    :key="item.id"
          		    @click="swipeClick($event, index)"
          		>
          			<button class="content-box" @click="click_nav(index)">
          				<text class="content-text">{{ item.content }}</text>
          			</button>
          		</uni-swipe-action-item>
          	</uni-swipe-action>
            <uni-section padding = 25px>
            			<uni-pagination :total="sum" 
                  title="标题文字" 
                  pageSize="10"
                  @change = "page_change">
                  </uni-pagination>
            </uni-section>
          </view>
        
			</view>
		</uni-section>

		
	</view>
</template>

<script>
  import utils from "../../utils/utils.js"
  import { APIS } from "../../utils/api.js"
  const apis = APIS
  const app = getApp()
  var cu_page = 1
  var cu_num = 0
  var ques_type = null
  var recookie = uni.getStorageSync('Cookie')
	export default {
		components: {},
		data() {
			return {
        show: false,
        isOpened: 'none',
        swipeList: [],
        question_list: [],
        sum:1,
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
      let that = this
      let arraytemp = [];
      let crt = 0;
      recookie = uni.getStorageSync('Cookie')
      /*let this_tab = uni.getStorageSync('store_history_tab')
      if(this_tab==0 || this_tab==1||this_tab==2){
        this.current_tab = this_tab;
        crt = this_tab;
      }*/
      console.log(recookie)
      this.get_list(crt)
    	// 模拟延迟赋值
    	setTimeout(() => {
    		this.isOpened = 'right';
    	}, 1000);
    	
    	uni.$on('update',res=>{
    		console.log(111);
    		this.swipeClick({
    			content:{
    				text:'添加'
    			}
    		})
    	})
    },
    /*onUnload() {
      let back = 6
      //console.log('im back')
      uni.setStorageSync('store_history_tab', back)
    },*/
		methods: {
      to_sta(){
        uni.navigateTo({
          url:'../statistic/statistic'
        })
      },
			seg_onClickItem(e) {
			  this.current_tab = 1;
				if (this.current_tab !== e.currentIndex) {
					this.current_tab  = e.currentIndex
				}
			  console.log('分栏type'+this.current_tab)
        //uni.setStorageSync('store_history_tab',this.current_tab)
			  cu_page = 1
			  this.get_list(this.current_tab)
			},
      get_list(ptype){
        let arraytemp = []
        let pr_list = []
        let that = this
        var ttype = null
        this.$data.swipeList = []
        if(ptype!=0 && ptype!=1 && ptype != 2) ttype = ques_type
        else if(ptype == 0) ttype = 'choice_question'
        else if(ptype == 1) ttype = 'cloze_question'
        else if(ptype == 2) ttype = 'reading_question'
        ques_type = ttype
        //console.log(type)
        console.log(cu_page)
        
        new Promise((resolve, reject) => {
          uni.request({
            url: app.globalData.domain + apis.get_record.url,
            method: "GET",
            header: {
              Cookie: recookie
            },
            data: {
              pagenumber: cu_page,
              pagesize: 12,
              type: ttype,
            },
            success: (res) => {
              
              resolve(res)
            }
          })
        }).then(res => {
          console.log(res)
          this.$data.question_list = res.data.list
          this.$data.sum = res.data.total
          console.log(this.$data.question_list)
          
          console.log(this.$data.sum)
          for(let i = 0; i < this.$data.question_list.length; i++){
              let questemp = {}
              questemp = this.$data.question_list[i]
              //console.log(questemp)
              let ttmp = {}
              ttmp.options = [{text: '添加至错题本',style: {backgroundColor: 'rgb(254,156,1)'}},
                              {text: '删除',style: {backgroundColor: 'rgb(255,58,49)'}}],
              ttmp.num = i,
              ttmp.content= questemp["question"]["title"], //此处为题目标题
              ttmp.id = questemp["question"]["id"],
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
        if(this.type == 'next'){
          cu_page++;
          console.log(ques_type)
          this.get_list(ques_type)
        }
        else if(this.type == 'prev'){
          if(cu_page == 1){}
          else{
            cu_page--;
            this.get_list(ques_type)
          }
        }
      },
      click_nav(index){
        let pos = index;
        let that = this;
        //console.log(pos)
        let transtmp = this.$data.question_list[pos]
        //console.log(transtmp)
        let trans_id = transtmp["question"]["id"];
        let trans_type = transtmp["question"]["type"];
        //console.log(trans_id);
        try{
          uni.setStorageSync('nav_id',trans_id);
          uni.setStorageSync('nav_type',trans_type)
        }catch(e){
          //TODO handle the exception
          "store_id_failure"
        }
        uni.navigateTo({
          	url:"../history_answer/history_answer?id=" + trans_id
        })
      },
      swipeClick(e, index) {
      	let {
      		content
      	} = e;
        //此处获得由swiperlist传递的题目ID，存入storage
      	if (content.text === '删除') {
      		uni.showModal({
      			title: '提示',
      			content: '是否删除',
      			success: res => {
      				if (res.confirm) {
                //删除单条的操作
      					this.swipeList.splice(index, 1);
                this.delete_item(index);                
      				} else if (res.cancel) {
      					console.log('用户点击取消');
      				}
      			}
      		});
      	} else if(content.text == '添加至错题本'){
          uni.showModal({
          	title: '提示',
          	content: '是否添加至错题本',
          	success: res => {
          		if (res.confirm) {
                //删除单条的操作
                this.add_item(index);                
          		} else if (res.cancel) {
          			console.log('用户点击取消');
          		}
          	}
          });
        }else {
      		uni.showToast({
      			title: `点击了${e.content.text}按钮`,
      			icon: 'none'
      		});
      	}
      },
      add_item(index){
        let pos = index;
        let that = this;
        //console.log(pos)
        let deltmp = this.$data.question_list[pos]
        let del_id = deltmp["question"]["id"];
        //console.log(trans_id);
        uni.request({
          url: app.globalData.domain + apis.add_wq_book.url + '?id=' + del_id,
          method: "POST",
          header: {
            Cookie: recookie
          },
          data: {
            id: del_id
          }
        })
      },
      delete_item(index){
        let pos = index;
        let that = this;
        //console.log(pos)
        let deltmp = this.$data.question_list[pos]
        let del_id = deltmp["question"]["id"];
        //console.log(trans_id);
        uni.request({
          url: app.globalData.domain + apis.get_record.url + '?id=' + del_id,
          method: "POST",
          header: {
            Cookie: recookie
          },
          data: {
            id: del_id
          }
        })
        uni.redirectTo({
          url: '../../pages/history/history'
        })
      }
		}
	}
</script>

<style lang="scss">
  .sta_btn_container{
    display: flex;
    justify-content: flex-end;
    margin-bottom: -20px;
  }
  .sta_btn{
    display: flex;
    justify-content: center;
    width: 40%;
    border-radius: 100px;
    background-color: #000000;
  }
  .sta_btn_text{
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

	.uni-list-item__content-title {
		font-size: 14px;
	}
  .content-box {
  		flex: 1;
  		/* #ifdef APP-NVUE */
  		justify-content: center;
  		/* #endif */
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
    .container{
      height: 100%;
      weight: 600px;
    }
  	.content-text {
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
