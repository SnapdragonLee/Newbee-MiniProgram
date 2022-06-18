<template>

	<list :id="parentListId" class="page" :bounce="false" isSwiperList="true">
	<view id="head" class="header">
		<text class="header-title"> {{question}}</text>
	</view>

	<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in question_text.slice(0, question_num)" :key="question_text.index"  >
			<label class="title">{{(index+1)}}.{{question_text[index].question_title}}</label>
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index2) in question_text[index].sub_que" :key="sub_que.index"  >
				<view>
					<button 
					:class = "(question_text[index].sub_que[index2].istrue == 2) ? 'true_class':(question_text[index].sub_que[index2].istrue == 1) ? 'false_class':'none_class'"
					disabled="false" >
						{{question_text[index].sub_que[index2].que_title}}
					</button>
				</view>
			</label>
	</label>


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
			recookie : '',
			question_type :'',
			type:'',
			id: 0,
			question: '',
			answer:[],
			question_num: 0,
			question_text:[],
/*			question_text: [{
				question_title:"1.1",
				my_ans:'A',
				true_ans:'B',
				sub_que:[{
					que_title:"A.1",
				},
				{
					que_title:"B.1",
				},
				{
					que_title:"C.1",
				},
				{
					que_title:"D.1",
				}]
			},
			{
				question_title:"2.2",
				my_ans:'C',
				true_ans:'D',
				sub_que:[{
					que_title:"A.2",
				},
				{
					que_title:"B.2",
				},
				{
					que_title:"C.2",
				},
				{
					que_title:"D.2",
				}]
			},
			{
				question_title:"3.3",
				my_ans:'B',
				true_ans:'C',
				sub_que:[{
					que_title:"A.3",
				},
				{
					que_title:"B.3",
				},
				{
					que_title:"C.3",
				},
				{
					que_title:"D.3",
				}]
			},
			{
				question_title:"4.4",
				my_ans:'D',
				true_ans:'D',
				sub_que:[{
					que_title:"A.4",
				},
				{
					que_title:"B.4",
				},
				{
					que_title:"C.4",
				},
				{
					que_title:"D.4",
				}]
			}],*/
		};
	},
		methods: {

	},
	onLoad:function(options){
		this.id = options.id,
		this.recookie = uni.getStorageSync('Cookie');
		this.question_type = uni.getStorageSync('nav_type')
		if(this.question_type == 'cloze_question')
		{
			this.type = 'cloze_question';
		}
		else if(this.question_type == 'choice_question')
		{
			this.type = 'choice_question';
		}
		else if(this.question_type == 'reading_question')
		{
			this.type = 'reading_question';
		}
		console.log(this.id)
		uni.request({
			url: 'http://122.9.32.180/api/user/detail?id=' + this.id ,
			method: 'GET',
			header: {
				Cookie: this.recookie,
			},
			success:(res)=>{
				console.log(res)
//				this.question = res.data["text"]
				this.question_num = res.data["sub_que_num"]
				if(this.type == "choice_question")
				{
					this.question = res.data["sub_que"]["0"]["stem"]
				}
				else
				{
					this.question = res.data["text"]
				}
				var i=0;
				for(i=0;i<this.question_num;i++)
				{
					this.question_text.push({
						question_title:"",
						my_ans:'',
						true_ans:'',
						sub_que:[{
							istrue:0,
							que_title:"",
						},
						{
							istrue:0,
							que_title:"",
						},
						{
							istrue:0,
							que_title:"",
						},
						{
							istrue:0,
							que_title:"",
						}]
					})
				}
				if(this.type == 'choice_question')
				{
					this.question_text[0].true_ans = res.data["sub_que"]["0"]["answer"]
					this.question_text[0].my_ans = res.data["sub_que"]["0"]["option"]
					var j=0;
					for(j=0;j<4;j++)
					{
						this.question_text[0].sub_que[j].que_title = res.data["sub_que"]["0"]["options"][j]
					}
					var a=0,b='A',c=0;
					a = this.question_text[0].true_ans.charCodeAt() - b.charCodeAt();
					c = this.question_text[0].my_ans.charCodeAt() - b.charCodeAt();
					console.log(a+' '+c)
					this.question_text[0].sub_que[a].istrue = 2
					if(this.question_text[0].true_ans != this.question_text[0].my_ans)
					{
						console.log('wrong')
						this.question_text[0].sub_que[c].istrue = 1
					}
				}
				else
				{
					var j=0,k=0;
					for(j=0;j<this.question_num;j++)
					{
						this.question_text[j].question_title = res.data["sub_que"][j]["stem"]
						if(this.question_text[j].question_title == null)
						{
							this.question_text[j].question_title = ''
						}
						for(k=0;k<4;k++)
						{
							this.question_text[j].sub_que[k].que_title = res.data["sub_que"][j]["options"][k]
						}
						this.question_text[j].true_ans = res.data["sub_que"][j]["answer"]
						this.question_text[j].my_ans = res.data["sub_que"][j]["option"]
						var a=0,b='A',c=0;
						a = this.question_text[j].true_ans.charCodeAt() - b.charCodeAt();
						c = this.question_text[j].my_ans.charCodeAt() - b.charCodeAt();
						console.log(a+' '+c)
						this.question_text[j].sub_que[a].istrue = 2
						if(this.question_text[j].true_ans != this.question_text[j].my_ans)
						{
							console.log('wrong')
							this.question_text[j].sub_que[c].istrue = 1
						}
					}
				}
			},
			fail:(res)=>{
				console.log(res)
			},
		})
	},
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
/*	button[disabled] {
		color: #fff !important;
	}*/

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
	.notclick{
		margin-left: 20px;
		margin-right: 20px;
		background-color: #ffffff;
		border-radius: 5px;
	}
	.yesclick{
		margin-left: 20px;
		margin-right: 20px;
		background-color: #55ff7f;
		border-radius: 5px;
	}
	.cuotiben{
        display: flex;
        height: 60%;
        width: 100%;
        align-items: center;
        justify-content: center;
	}
	.false_class{
		margin-left: 20px;
		margin-right: 20px;
		background-color: #ff0004 !important;
		border-radius: 5px;
	}
	.true_class{
		margin-left: 20px;
		margin-right: 20px;
		background-color: #00cb00 !important;
		border-radius: 5px;
	}
	.none_class{
		margin-left: 20px;
		margin-right: 20px;
		background-color: #d9d9d9 !important;
		border-radius: 5px;
	}
</style>
