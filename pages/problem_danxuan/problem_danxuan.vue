<template>

	<list :id="parentListId" class="page" :bounce="false" isSwiperList="true">
	<view id="head" class="header">
		<text class="header-title"> {{question}}</text>
	</view>
	<view>
		<button class="chakantimu" @click="showPopup">查看题目</button>
	</view>

	
	<van-popup :show=" show " position="bottom" round custom-style="height: 60%;" @close="onClose">
		<view>
				<button :class="is1?'yesclick':'notclick'" @tap="choose_click1" :disabled="disabled">{{items["0"].choose}}{{items["0"].name}}</button>
				<button :class="is2?'yesclick':'notclick'" @tap="choose_click2" :disabled="disabled">{{items["1"].choose}}{{items["1"].name}}</button>
				<button :class="is3?'yesclick':'notclick'" @tap="choose_click3" :disabled="disabled">{{items["2"].choose}}{{items["2"].name}}</button>
				<button :class="is4?'yesclick':'notclick'" @tap="choose_click4" :disabled="disabled">{{items["3"].choose}}{{items["3"].name}}</button>
		</view>
		
			<block v-if="isshow">
				<button class="tijiao" @tap="TijiaoClick">
				提交
				</button>
			</block>
			<block v-else>
				<view class="answer">
					<label>我的答案：{{value}}</label>
				</view>			
				<view class="answer">
					<label>正确答案：{{correct_answer}}</label>
				</view>
				<block v-if="istijie">
					<button class="chakantijie" @click="kantijie">
						查看题解
					</button>
				</block>
				<block v-else >
					<van-collapse accordion :value="activeName" @change="onChange" >
		
					  <view >
								<van-collapse-item class="tijie_title" v-for="(item1,index) in listinfo" :key="index">
								  		<template #title>
								  			<text>题解{{index+1}}.第{{listinfo[index].num}}小题的题解 
											作者:{{listinfo[index].auther_name}}</text>
								  		</template>
										<text class="tijie">
											{{item1.tijie}}
										</text>
										<view>
										<view v-if="(listinfo[index].like == false) && (listinfo[index].report == false)">
											<van-icon name="like-o" color='#000000' @click = "likeclick(index)"/><text>{{listinfo[index].likes}}</text>
										</view>
										<view v-else-if="(listinfo[index].like == true) && (listinfo[index].report == false)">
											<van-icon name="like" color='#ff0000'/><text>{{listinfo[index].likes }}</text>
										</view>
										<view v-else>
											
										</view>
										<view v-if="(listinfo[index].report == false) && (listinfo[index].like == false)">
											<van-icon name="warning" color='#000000' @click = "reportclick(index)"/><text>{{listinfo[index].reports}}</text>
										</view>
										<view v-else-if="(listinfo[index].report == true) && (listinfo[index].like == false)">
											<van-icon name="warning" color='#ff0000'/><text>{{listinfo[index].reports }}</text>
										</view>
										<view v-else>
											
										</view>
										</view>

								  
								</van-collapse-item>
					  </view>
					</van-collapse>
					
				</block>
				<block v-if = "iswrong">
					<button class="chakantijie" @click="add_wrong">
						加入错题本
					</button>
				</block>
		
				<block>
					<button class="xietijie" @click="gototijie">
						写题解
					</button>
					<button class="nextproblem" @tap = "next_question()">
						下一题
					</button>	
				</block>
		
			</block>
	</van-popup>


		


	</list>
</template>

<script>
	// #ifdef APP-PLUS
	const dom = weex.requireModule('dom');
	const app = getApp();
//	const recookie = uni.getStorageSync('Cookie');
	// #endif
	
	export default {
		data() {
			return {
				parentListId: "parentListId",
				pageHeight: 300,
				dataList: [],
				refreshing: false,
				refreshText: "",
				refreshFlag: false
			}
		},
	data() {
		return {
			question_num:0,
			xiaotiid:[],
			show:false,
			activeName: '1',
			recookie : '',
			is1: false,
			is2: false,
			is3: false,
			is4: false,
			max: 1,
			question:'',
			isOpen: false,
			iswrong: true,
			title: 'checkbox 复选框',
				items: [{
					value:'A',
					choose:'A.',
					name:''
				},
				{
					value:'B',
					choose:'B.',
					name:''
				},
				{
					value:'C',
					choose:'C.',
					name:''
				},
				{
					value:'D',
					choose:'D.',
					name:''
				},
			],
		listinfo: [],	
		correct_answer:'',
		answer:[{
			sub_id:'',
			submit:'',
		}],
		value:'',
		isshow: true,
		ischoose: false,
		disabled:false,
		istijie:true,
		questionid:0,
		tijie_num: 0,
		};
	},

		methods: {
			reportclick(index){
				if(this.listinfo[index].report == false)
				{
					uni.showModal({
						title:"提示",
						content:"确定要举报该题解？",
						success:(res1)=>{
							if(res1.confirm)
							{
								console.log(index)
								uni.request({
									url: 'http://122.9.32.180/api/user/solution_report',
									data:{
										id: this.listinfo[index].que_id,
									},
									method: 'POST',
									header: {
										Cookie: this.recookie,
									},
									success:(res)=>{
										console.log(res)
										this.listinfo[index].report = true
										uni.showToast({
											title:"举报成功！",
											icon:'exception',
											duration:850,
										})
										this.listinfo[index].reports += 1
									},
									fail:(res)=>{
										console.log(res)
										console.log("举报失败")
									},
								})
							}
							if(res1.cancel)
							{
								uni.showToast({
									title:"取消举报",
									icon:'exception',
									duration:850,
								})
							}
						}
					})

					
				}
			},
			likeclick(index){
				if(this.listinfo[index].like == false)
				{
					uni.request({
						url: 'http://122.9.32.180/api/user/solution_like',
						data:{
							id: this.listinfo[index].que_id,
						},
						method: 'POST',
						header: {
							Cookie: this.recookie,
						},
						success:(res)=>{
							console.log(res)
							this.listinfo[index].like = true
							uni.showToast({
								title:"点赞成功！",
								icon:'exception',
								duration:850,
							})
							this.listinfo[index].likes += 1
						},
						fail:(res)=>{
							console.log(res)
							console.log("点赞失败")
						},
					})
					
				}
			},
			  showPopup() {
			    this.show= true ;
			  },
			
			  onClose() {
			    this.show= false;
			  },
			onChange(event) {
			  this.activeName= event.detail
			},
			add_wrong(){
				uni.request({
					url: 'http://122.9.32.180/api/user/wrong_que_book?id=' + this.questionid ,
/*					data: {
						id: this.questionid,
					},*/
					method: 'POST',
					header: {
						Cookie: this.recookie,
					},
					success:(res)=>{
						console.log(res)
						uni.showToast({
							title:"成功添加至错题本！",
							icon:'exception',
							duration:850,
						});
					},
					fail:(res)=>{
						console.log(res)
					},
				})
				this.iswrong = false
			},
			choose_click1(){
				if(this.is1 == true)
				{
					this.value = null,
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = false,
					this.is3 = false,
					this.is4 = false
				}
				else
				{
					this.value = 'A',
					this.answer["0"]["submit"] = this.value
					this.is1 = true,
					this.is2 = false,
					this.is3 = false,
					this.is4 = false
				}

			},
			choose_click2(){
				if(this.is2 == true)
				{
					this.value = null,
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = false,
					this.is3 = false,
					this.is4 = false					
				}
				else
				{
					this.value = 'B',
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = true,
					this.is3 = false,
					this.is4 = false
				}
			},
			choose_click3(){
				if(this.is3 == true)
				{
					this.value = null,
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = false,
					this.is3 = false,
					this.is4 = false					
				}
				else
				{
					this.value = 'C',
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = false,
					this.is3 = true,
					this.is4 = false
				}
			},
			choose_click4(){
				if(this.is4 == true)
				{
					this.value = null,
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = false,
					this.is3 = false,
					this.is4 = false					
				}
				else
				{
					this.value = 'D',
					this.answer["0"]["submit"] = this.value
					this.is1 = false,
					this.is2 = false,
					this.is3 = false,
					this.is4 = true
				}
			},
			TijiaoClick(e){
				console.log(this.value)
				if(!this.value)
				{
					uni.showToast({
						title:"请作答",
						icon:'exception',
						duration:850,
					});
					console.log(123)
				}
				else
				{
					this.isshow= false
					console.log(this.value + "111")
					this.disabled= true
					uni.request({
						url: 'http://122.9.32.180/api/user/check_question' ,
						data: {
							type: 'choice_question',
							id: this.questionid,
							data: this.answer,
						},
						method: 'POST',
						header: {
							Cookie: this.recookie,
						},
						success:(res)=>{
							console.log(res)
							this.correct_answer = res.data["sub_que"]["0"]["answer"]
						},
						fail:(res)=>{
							console.log(res)
						},
					})
				}
				
			},
			gototijie(){
				uni.navigateTo({
					url:"../tijie/tijie?xiaotiid=" + encodeURIComponent(JSON.stringify(this.xiaotiid)),
				})
			},
			kantijie(){
				this.istijie=false;
				this.istijie=false;
				uni.request({
					url: 'http://122.9.32.180/api/user/solution' ,
					data: {
						id: this.questionid,
					},
					method: 'GET',
					header: {
						Cookie: this.recookie,
					},
					success:(res)=>{
						console.log(res)
						this.tijie_num = res.data.solution_num,
						this.listinfo.length = 0
						var i=0;
						for(i=0;i<this.tijie_num;i++)
						{
							this.listinfo.push({
								tijie:'',
								approved:0,
								likes:0,
								like:false,
								reports:0,
								report:false,
								auther_name:'',
								que_id:0,
								num:0,
							})
						}
						for(i=0;i<this.tijie_num;i++)
						{
							this.listinfo[i]["tijie"] = res.data["solution"][i]["content"]
							this.listinfo[i]["approved"]  =res.data["solution"][i]["approved"]
							this.listinfo[i]["likes"]  =res.data["solution"][i]["likes"]
							this.listinfo[i]["reports"]  =res.data["solution"][i]["reports"]
							this.listinfo[i]["auther_name"]  =res.data["solution"][i]["author_username"]
							this.listinfo[i]["que_id"]  =res.data["solution"][i]["id"]
							this.listinfo[i]["num"]  =res.data["solution"][i]["number"]
							if(this.listinfo[i]["approved"] == 1)
							{
								this.listinfo[i]["like"] = true
							}
							else if(this.listinfo[i]["approved"] == 2)
							{
								this.listinfo[i]["report"] = true
							}
						}
					},
					fail:(res)=>{
						
					},
				})
			},
			next_question(){
				uni.reLaunch({
					url:"../Problem_danxuan/Problem_danxuan"
				})
				// this.reload()
				
				this.show= false,
				this.isOpen= false,
				this.isshow= true,
				this.ischoose= false,
				this.disabled=false,
				this.istijie=true,
				this.value = null,
				this.is1 = false,
				this.is2 = false,
				this.is3 = false,
				this.is4 = false,
				this.iswrong = true,
				this.question_num = 0,
				uni.request({
					url: 'http://122.9.32.180/api/user/get_question' ,
					data: {
						type :'choice_question',
					},
					method: 'GET',
					header: {
						Cookie: this.recookie,
					},
					success:(res)=>{
						console.log(res)
						console.log(res.data["sub_que"]["0"]["options"]["0"])
						this.question = res.data["sub_que"]["0"]["stem"]
						this.items["0"].name = res.data["sub_que"]["0"]["options"]["0"]
						this.items["1"].name = res.data["sub_que"]["0"]["options"]["1"]
						this.items["2"].name = res.data["sub_que"]["0"]["options"]["2"]
						this.items["3"].name = res.data["sub_que"]["0"]["options"]["3"]
						this.questionid = res.data["id"]
						this.answer["0"]["sub_id"] = res.data["sub_que"]["0"]["id"]
						// this.items.forEach((item =>{
						// 	item.checked = ""
						// }))
						this.question_num = res.data["sub_que_num"]
						this.xiaotiid.length = 0
						var i=0;
						for(i=0;i<this.question_num;i++)
						{
							this.xiaotiid.push({
								id:0,
							})
							this.xiaotiid[i].id = res.data["sub_que"][i]["id"]
						}
					},
					fail(res){
						console.log('fail')
					}
				})
			},

		},
		onLoad(e){
				console.log('test');
				//清空check属性
				this.recookie = uni.getStorageSync('Cookie');
				uni.request({
					url: 'http://122.9.32.180/api/user/get_question' ,
					data: {
						type :'choice_question',
					},
					method: 'GET',
					header: {
						Cookie: this.recookie,
					},
					success:(res)=>{
						console.log(res)
						console.log(res.data["sub_que"]["0"]["options"]["0"])
						this.question = res.data["sub_que"]["0"]["stem"]
						this.items["0"].name = res.data["sub_que"]["0"]["options"]["0"]
						this.items["1"].name = res.data["sub_que"]["0"]["options"]["1"]
						this.items["2"].name = res.data["sub_que"]["0"]["options"]["2"]
						this.items["3"].name = res.data["sub_que"]["0"]["options"]["3"]
						 this.items["0"].checked = ''
						 this.items["1"].checked = ''
						 this.items["2"].checked = ''
						 this.items["3"].checked = ''
						 this.answer["0"]["sub_id"] = res.data["sub_que"]["0"]["id"]
						this.questionid = (res.data["id"])*1
						this.question_num = res.data["sub_que_num"]
						this.xiaotiid.length = 0
						var i=0;
						for(i=0;i<this.question_num;i++)
						{
							this.xiaotiid.push({
								id:0,
							})
							this.xiaotiid[i].id = res.data["sub_que"][i]["id"]
						}
						console.log(this.items)
						// this.items.forEach((item =>{
						// 	item.checked = false
						// }))
					},
					fail(res){
						console.log('fail')
					}
				})
		/*		获取答案
				uni.request({
					url: 'http://122.9.32.180/api/user/check_question' ,
					data: {
						type :'CHOICE_QUE_NAME',
					},
					method: 'GET',
					header: getApp().globalData.header,
					success:(res)=>{
						console.log(res)
					},
					fail(res){
						console.log('fail')
					}
				})*/
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.page {
		flex: 1;
	}

	.refresh-view {
		width: 750rpx;
		height: 80px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.header {
		margin-left: 20px;
		margin-right: 20px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #f4f4f4;
	}

	.header-title {
		font-size: 20px;
		font-weight: bold;
		color: #444;
		margin-left: 12px;
		margin-right: 12px;
	}

	.sticky-view {
		margin-left: 12px;
		margin-right: 12px;
		padding: 20px;
		background-color: #EBEBEB;
		border-radius: 5px;
	}

	.list {
		flex: 1;
	}

	.list-item {
		margin-left: 12px;
		margin-right: 12px;
		margin-top: 12px;
		padding: 20px;
		background-color: #fff;
		border-radius: 5px;
	}
	.tijiao{
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 10px;
		background-color: #EBEBEB;
		border-radius: 5px;
	}		
	.radio_class{
		margin-left: 12px;
		padding: 12px;
	}
	.name_class{
		margin-left: 0px;
		margin-right: 12px;
	}
	.answer{
		margin-left: 20px;
	}
	.kantijie{
		margin-left: 20px;
	}
	.chakantijie{
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 10px;
		border-radius: 5px;
	}
	.xietijie{
		width: 45% !important;
		margin-right: 12px;
		margin-bottom: 10px;
		float:right;
		margin-top: 10px;
		font-weight:100;
	}
	.nextproblem{
		width: 45% !important;
		float:left;
		margin-left: 12px;
		margin-top: 10px;
		margin-bottom: 10px;
		font-weight:100;
	}
	.tijie{
        display:inline-block;
        width: 100%;
        height: auto;
        font-family: Gibson;
        font-size: 32rpx;
        word-break: break-all;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: pre-wrap;
	}
	.tijie_title{
	    display:inline-block;
		width: 80%;
		margin-left: 20px;
		margin-right: 20px;
	    height: auto;
	    font-family: Gibson;
	    font-size: 32rpx;
	}
	.see_more{
		margin-left: 20px;
		margin-right: 20px;
		border-radius: 10px;
		background-color: #ffffff;
		padding: 5px;
		flex-direction: row;
		align-items: center;
	}
	.notclick{
		margin-left: 20px;
		disflex: flex;
		margin-right: 20px;
		margin-top: 10px;
		background-color: #ffffff;
		border-radius: 5px;
	}
	.yesclick{
		disflex: flex;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 10px;
		background-color: #55ff7f;
		border-radius: 5px;
	}
	.cuotiben{
        display: flex;
        height: 60%;
        width: 100%;
		margin-top: 10px;
        align-items: center;
        justify-content: center;
	}
	.chakantimu{
		display: flex;
		width: 80%;
		margin-left: 10%;
		margin-right: 10%;
		border-radius: 5px;
		position:fixed;
		bottom: 0;
		display:flex;
		align-items: center;
		justify-content: center;

	}
</style>
