<template>
	<view class="input_view">
		<view class="input_title">
			请选择撰写第
			<van-stepper class="jishuqi" integer :value=" 1 " min="1" :max="question_num" @change="onChange" />
			小题的题解
		</view>
		
		<view class="input_class_view">
			<textarea class="input_class" @input="radioGroupChange" focus placeholder="请输入题解" />	
		</view>

		<button class="tijiao"  @tap="TijiaoClick" >
			提交题解
		</button>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				content:'',
				id:0,
				sub_que_id:[],
				index:'',
				recookie : '',
				questionid: 1,
				question_num: 0,
			}
		},
		methods: {
			  onChange(event) {
//			    console.log(event.detail);
				this.questionid = event.detail;
				console.log(this.questionid)
			  },
			radioGroupChange(e) {
				this.index=e.detail.value
			},
			TijiaoClick(e){
				if(this.index == '')
				{
					uni.showToast({
						title:"题解不能为空",
						icon:'error',
						duration:850,
					})
				}
				else{
					uni.showModal({
						content:"确认提交题解",
						confirmText:"确定",
						cancelText:"取消",
						success:function(res){
							if(res.confirm){
								console.log(this.index);
								console.log(this.sub_que_id[this.questionid - 1]["id"] * 1)
								uni.request({
									url: 'http://122.9.32.180/api/user/solution' ,
									data: {
										id: this.sub_que_id[this.questionid - 1]["id"] * 1,
										solution :this.index,
									},
									method: 'POST',
									header: {
										Cookie: this.recookie,
									},
									success:(res)=>{
										console.log(res)
										if(res.data["ret"] == 3)
										{
											this.content = res.data["msg"]
											
											uni.showModal({
												title:"你的题解存在以下问题",
												content:this.content,
												showCancel:false,
												confirmText:"以后注意",
											})
										}
									},
									fail:(res)=>{
										console.log(res)
									},
								})
								uni.navigateBack({
									delta:'1'
								})
							}
						}.bind(this)
					})
				}
				
			},
		},
		onLoad:function(options){
			console.log(options)
//			this.id = options.id,
			this.sub_que_id.length = 0
			this.sub_que_id = JSON.parse(decodeURIComponent(options.xiaotiid))
			this.question_num = this.sub_que_id.length
			this.recookie = uni.getStorageSync('Cookie');
			console.log(this.id)
		},
	}
</script>

<style>
	.input_class{
		background-color: #EBEBEB;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		margin-top: 10px;
		margin: 0 auto;
		width: 90%;
		border-radius: 5px;
	}
	.input_view{
		position: relative;
		justify-content: center;
		border-radius: 5px;
	}
	.input_title{
		text-align: center;
		border-radius: 5px;
		font-weight: bold;
		display: block;
	}
	.tijiao{
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 20px;
		background-color: #EBEBEB;
		border-radius: 5px;
	}
	.input_class_view{
		flex-direction: row;
		align-items: center;
	}
	.jishuqi{
		flex-direction: row;
		align-items: center;
		background-color: #007AFF;
	}
</style>
