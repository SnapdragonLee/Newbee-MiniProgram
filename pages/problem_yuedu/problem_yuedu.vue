<template>

	<list :id="parentListId" class="page" :bounce="false" isSwiperList="true">
	<view id="head" class="header">
		<text class="header-title"> {{question}}</text>
		<text>\r\n\r\n\r\n\r\n</text>
	</view>
	
	
	<view>
		<button class="chakantimu" @click="showPopup">查看题目</button>
	</view>
	<van-popup :show=" show " position="bottom" round custom-style="height: 60%;" @close="onClose">
		<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in que.slice(0, question_num)" :key="que.index"  >
			<radio-group  @change="checkone($event,index)" >
				<label class="title">{{(index+1)}}.{{que[index].title}}</label>
				<label v-if="isquestion" class="uni-list-cell uni-list-cell-pd" v-for="item in que[index].items" :key="items.value"  >
					<view>
						<radio class="radio_class" :value="item.value" :disabled = "disabled" >
							<view class="name_class">{{item.choose}}{{item.name}}</view>
						</radio>
					</view>
				</label>
			</radio-group>
		</label>
		<block v-if="isshow">
			<button class="tijiao" @tap="TijiaoClick">
			提交
			</button>
		</block>
		<block v-else>
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

			<button class="xietijie" @click="gototijie">
				写题解
			</button>
			<button class="nextproblem" @tap = "next_question()">
				下一题
			</button>
		</block>
	</van-popup>


	</list>
</template>

<script>
	// #ifdef APP-PLUS
	const dom = weex.requireModule('dom');
	const app = getApp();
//	var value:'';
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
			xiaotiid:[],
			show:false,
			activeName: '1',
			question_num:'',
			recookie : '',
			max: 1,
			question:'',
			isOpen: false,
			isquestion: true,
			iswrong: true,
			correct_answer:'',
			que:[
				{
					i:'1',
					title:'',
					items: [{
							value:'1',
							choose:'A.',
							name:''
						},
						{
							value:'2',
							choose:'B.',
							name:''
						},
						{
							value:'3',
							choose:'C.',
							name:''
						},
						{
							value:'4',
							choose:'D.',
							name:''
						},
					],
				},
				{
					i:'2',
					title:'2',
					items: [{
							value:'1',
							choose:'A.',
							name:''
						},
						{
							value:'2',
							choose:'B.',
							name:''
						},
						{
							value:'3',
							choose:'C.',
							name:''
						},
						{
							value:'4',
							choose:'D.',
							name:''
						},
					],
				},
				{
					i:'3',
					title:'3',
					items: [{
							value:'1',
							choose:'A.',
							name:''
						},
						{
							value:'2',
							choose:'B.',
							name:''
						},
						{
							value:'3',
							choose:'C.',
							name:''
						},
						{
							value:'4',
							choose:'D.',
							name:''
						},
					],
				},
				{
					i:'4',
					title:'4',
					items: [{
							value:'1',
							choose:'A.',
							name:''
						},
						{
							value:'2',
							choose:'B.',
							name:''
						},
						{
							value:'3',
							choose:'C.',
							name:''
						},
						{
							value:'4',
							choose:'D.',
							name:''
						},
					],
				},
				{
					i:'5',
					title:'5',
					items: [{
							value:'1',
							choose:'A.',
							name:''
						},
						{
							value:'2',
							choose:'B.',
							name:''
						},
						{
							value:'3',
							choose:'C.',
							name:''
						},
						{
							value:'4',
							choose:'D.',
							name:''
						},
					],
				},
			],

		listinfo: [],	
		value:[],
		answer: [],
		correct_ans: [],
		iszuoda: false,
		isshow: true,
		ischoose: false,
		disabled:false,
		istijie:true,
		questionid:0,
		sum_question:0,
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
			/*		data: {
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
			checkone(e,index){
//				console.log(e)
//				console.log(index)
				this.value[index].num = e.detail.value
				this.value[index].isdo = true
				if(e.detail.value == '1')
				{
					this.answer[index].submit = 'A'
				}
				else if(e.detail.value == '2')
				{
					this.answer[index].submit = 'B'
				}
				else if(e.detail.value == '3')
				{
					this.answer[index].submit = 'C'
				}
				else if(e.detail.value == '4')
				{
					this.answer[index].submit = 'D'
				}
			},
			TijiaoClick(e){
				var j=0;
				var zuoda_num = 0;
				for(j=0;j<this.question_num;j++)
				{
					if(this.value[j].isdo == true)
					{
						zuoda_num++;
					}
				}
				if(zuoda_num != this.question_num)
				{
					uni.showToast({
						title:"请全部作答",
						icon:'exception',
						duration:850,
					});
					console.log(123)
				}
				else
				{
					this.isshow= false
					console.log(zuoda_num + "111")
					this.disabled= true
					uni.request({
						url: 'http://122.9.32.180/api/user/check_question' ,
						data: {
							type: 'reading_question',
							id: this.questionid,
							data: this.answer,
						},
						method: 'POST',
						header: {
							Cookie: this.recookie,
						},
						success:(res)=>{
							console.log(res)
							this.correct_answer = ''
							var i=0;
							this.correct_ans.length = 0
							for(i=0;i<this.question_num;i++)
							{
								this.correct_ans.push({
									ans:''
								})
							}
							for(i=0;i<this.question_num;i++)
							{
								this.correct_ans[i]["ans"] = res.data["sub_que"][i]["answer"]
								this.correct_answer += this.correct_ans[i]["ans"]
							}
							
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
					url:"../Problem_yuedu/Problem_yuedu"
				})
				this.isOpen= false,
				this.isshow= true,
				this.ischoose= false,
				this.disabled=false,
				this.istijie=true,
				this.isquestion = false,
				this.iszuoda = false,
				this.tijie_num = 0,
				this.iswrong = true
				var i=0;
				for(i=0;i<this.question_num;i++)
				{
					this.value[i].isdo = false;
					this.value[i].num = '';
				}
				uni.request({
					url: 'http://122.9.32.180/api/user/get_question' ,
					data: {
						type :'reading_question',
					},
					method: 'GET',
					header: {
						Cookie: this.recookie
					},
					success:(res)=>{
						console.log(res);
//						console.log(res.data["sub_que"]["0"]["options"]["0"])
						this.question = res.data["text"];
						this.question_num = res.data["sub_que_num"];
						this.value.length = 0;
						var j=0;
						for(j=0; j<this.question_num; j++)
						{
							this.value.push({
								isdo: false,
								num: 0,
							})
						}
						this.answer.length = 0
						for(j=0; j<this.question_num; j++)
						{
							this.answer.push({
								sub_id: '',
								submit: '',
							})
						}
						var i=0;
						for(i=0;i<this.question_num;i++)
						{
							this.que[i].title = res.data["sub_que"][i]["stem"]
							this.que[i].items["0"].name = res.data["sub_que"][i]["options"]["0"]
							this.que[i].items["1"].name = res.data["sub_que"][i]["options"]["1"]
							this.que[i].items["2"].name = res.data["sub_que"][i]["options"]["2"]
							this.que[i].items["3"].name = res.data["sub_que"][i]["options"]["3"]
							this.que[i].items["0"].checked = ''
							this.que[i].items["1"].checked = ''
							this.que[i].items["2"].checked = ''
							this.que[i].items["3"].checked = ''		
							this.answer[i]["sub_id"] = res.data["sub_que"][i]["id"]
						}

						this.questionid = res.data["id"];

						this.isquestion = true;
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
						type :'reading_question',
					},
					method: 'GET',
					header: {
						Cookie: this.recookie
					},
					success:(res)=>{
						console.log(res)
						console.log(res.data["sub_que"]["0"]["options"]["0"])
						this.question = res.data["text"]
						this.question_num = res.data["sub_que_num"]
						this.value.length = 0
						for(i=0;i<this.question_num;i++)
						{
							this.value.push({
								isdo: false,
								num: 0,
							})
						}
						this.answer.length = 0
						for(j=0; j<this.question_num; j++)
						{
							this.answer.push({
								sub_id:'',
								submit:'',
							})
						}
						var i=0;
						var j=0;
						for(i=0;i<this.question_num;i++)
						{
							this.que[i].title = res.data["sub_que"][i]["stem"]
							this.que[i].items["0"].name = res.data["sub_que"][i]["options"]["0"]
							this.que[i].items["1"].name = res.data["sub_que"][i]["options"]["1"]
							this.que[i].items["2"].name = res.data["sub_que"][i]["options"]["2"]
							this.que[i].items["3"].name = res.data["sub_que"][i]["options"]["3"]
							this.que[i].items["0"].checked = ''
							this.que[i].items["1"].checked = ''
							this.que[i].items["2"].checked = ''
							this.que[i].items["3"].checked = ''		
							this.answer[i]["sub_id"] = res.data["sub_que"][i]["id"]
//							console.log(res.data["sub_que"][i]["id"])
						}
						this.questionid = res.data["id"]

//						console.log(this.items)
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
		font-size: 25px;
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
		border-radius: 5px;
	}
	.xietijie{
		width: 45% !important;
		margin-right: 12px;
		float:right;
		margin-top: 10px;
		font-weight:100;
	}
	.nextproblem{
		width: 45% !important;
		float:left;
		margin-left: 12px;
		margin-top: 10px;
		font-weight:100;
	}
	.tijie{
		margin-left: 20px;
		margin-right: 20px;
		border-radius: 10px;
		background-color: #ffffff;
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
	.title{
		margin-left: 20px;
	}
	.cuotiben{
	    display: flex;
	    height: 60%;
	    width: 100%;
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
