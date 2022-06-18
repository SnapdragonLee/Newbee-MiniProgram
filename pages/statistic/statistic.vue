<template>
  <view>
    <uni-section title="题型占比" type="line" padding></uni-section>
    <view class="charts-box">
      <qiun-data-charts type="pie" :opts="opts" :chartData="total_chartData" 
      :canvas2d="true"
      canvasId="eBypDWbjnJPECNrkTRCkFLPouIBlNuj"/>
    </view>
    <uni-section title="单选正确率" type="line" padding></uni-section>
    <view class="charts-box">
      <qiun-data-charts type="pie" :opts="opts" :chartData="choice_chartData" 
      :canvas2d="true"
      canvasId="eBypDWbjEnJPECNrkTRkFLPouIBlNuj"/>
    </view>
    <uni-section title="完型正确率" type="line" padding></uni-section>
    <view class="charts-box">
      <qiun-data-charts type="pie" :opts="opts" :chartData="cloze_chartData" 
      :canvas2d="true"
      canvasId="eBypDWbjEnJPCNrkTRCkFLPouIBlNuj"/>
    </view>
    <uni-section title="阅读正确率" type="line" padding></uni-section>
    <view class="charts-box">
      <qiun-data-charts type="pie" :opts="opts" :chartData="reading_chartData"
      :canvas2d="true"
      canvasId="eBypDWbjEnJPECNrkTRCkFLPouIBNuj"/>
    </view>
    
  </view>
</template>

<script>
  import utils from "../../utils/utils.js"
  import {
    APIS
  } from "../../utils/api.js"
  const apis = APIS
  const app = getApp()
  var recookie = uni.getStorageSync('Cookie')
  export default {
    data() {
      return {
        chartData: {},
        total_chartData: {},
        choice_chartData: {},
        cloze_chartData: {},
        reading_chartData: {},
        //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
        opts: {
          color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
          padding: [5, 5, 5, 5],
          extra: {
            pie: {
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 15,
              border: true,
              borderWidth: 3,
              borderColor: "#FFFFFF"
            }
          }
        }
      };
    },
    onLoad() {
      console.log('heres stat')
      new Promise((resolve, reject)=> {
        recookie = uni.getStorageSync('Cookie')
        resolve(recookie)
      }).then(res =>{
        console.log(res)
        setTimeout(()=>{
          this.getServerData();
        },500)
      })
    },
    methods: {
      getServerData() {
        //模拟从服务器获取数据时的延时
        new Promise((resolve, reject) => {
            uni.request({
              url: app.globalData.domain + apis.get_sta.url,
              method: "GET",
              header: {
                Cookie: recookie
              },
              data: {},
              success: (res) => {
                resolve(res)
              }
            })
          }).then(res => {
            console.log(res)
            setTimeout(() => {
              this.total_chartData = {
                series: [{
                  data: [{
                      "name": "单选",
                      "value": res.data.choice_num
                    },
                    {
                      "name": "完型",
                      "value": res.data.cloze_num
                    },
                    {
                      "name": "单选",
                      "value": res.data.reading_num
                    }
                  ]
                }]
              }
              this.choice_chartData = {
                series: [{
                  data: [{
                      "name": "正确",
                      "value": res.data.choice_right
                    },
                    {
                      "name": "错误",
                      "value": res.data.choice_num - res.data.choice_right
                    }
                  ]
                }]
              }
              this.cloze_chartData = {
                series: [{
                  data: [{
                      "name": "正确",
                      "value": res.data.cloze_right
                    },
                    {
                      "name": "错误",
                      "value": res.data.cloze_num - res.data.cloze_right
                    }
                  ]
                }]
              }
              this.reading_chartData = {
                series: [{
                  data: [{
                      "name": "正确",
                      "value": res.data.reading_right
                    },
                    {
                      "name": "错误",
                      "value": res.data.reading_num - res.data.reading_right
                    }
                  ]
                }]
              }
              
              /*this.total_chartData = JSON.parse(JSON.stringify(totalchartData));
              this.choice_chartData = JSON.parse(JSON.stringify(choicechartData));
              this.cloze_chartData = JSON.parse(JSON.stringify(clozechartData));
              this.reading_chartData = JSON.parse(JSON.stringify(readingchartData));*/
            },0)
          })
      },
    }
  };
</script>

<style scoped>
  .container-box {
    display: flex;
    justify-content: center;
    align-items: centers;
    height: 300px;
  }

  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>
