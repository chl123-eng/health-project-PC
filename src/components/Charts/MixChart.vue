<template>
  <div style="display:flex">
    <div id="uriaProtein" :class="className" :style="{height:'calc(70vh)',width:'calc(40%)',marginLeft: '100px',marginTop: '20px'}" />
    <div id="bloodPressure" :class="className" :style="{height:'calc(70vh)',width:'calc(40%)',marginLeft: '100px',marginTop: '20px'}" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { Logger } from 'runjs/lib/common'

export default {
  mixins: [resize],
  props: {
    proteinuriaData: {
      type: Object,
      default: {}
    },
    bloodPressureData: {
      type: Object,
      default: {}
    },
    daterange: {
      type: Array,
      default: ''
    },
    patientId: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      UriaProteinChart: null,
      BloodPressureChart: null
    }
  },
  mounted() {
    this.initUriaProteinChart()
    this.initBloodPressureChart()
  },
  watch:{
    proteinuriaData(){
      if(this.proteinuriaData.realValueList != null){
        this.initUriaProteinChart()
      }
    },
    bloodPressureData(){
      if(this. bloodPressureData.realValueList != null){
        this.initBloodPressureChart()
      }
    }
  },
  beforeDestroy() {
    if (!this.UriaProteinChart) {
      return
    }
    this.UriaProteinChart.dispose()
    this.UriaProteinChart = null
  },
  methods: {
    //日期的转换
      dateFormat(fmt, date) {
        let ret = ''
        date = new Date(date)
        const opt = {
          'Y+': date.getFullYear().toString(), // 年
          'm+': (date.getMonth()+1).toString(), // 月
          'd+': date.getDate().toString() // 日
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(
              ret[1],
              ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
            )
          }
        }
        return fmt
      },
    //对象转换为数组
    arrayFormat(objList,valueName){
      
      const result = []
      for(let i = 0; i < objList.length; i++){
        const data = []
        data[0] = this.dateFormat('YYYY-mm-dd',objList[i].time)
        data[1] = objList[i][valueName]
        result.push(data)
      }
      return result
    },
    initUriaProteinChart() {
      this.UriaProteinChart = echarts.init(document.getElementById('uriaProtein'))
      const heightStandardValueList = this.proteinuriaData.heightStandardValueList
      const proteinuriaRealValueList = this.proteinuriaData.realValueList

      const heightStandardValue = this.arrayFormat(heightStandardValueList,'value')
      const proteinuriaRealValue = this.arrayFormat(proteinuriaRealValueList,'value')
      
      this.UriaProteinChart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '尿蛋白',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
        },
        grid: {
          left: '15%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['最高标准值150',  '尿蛋白值']
        },
        calculable: true,
        xAxis: [{
          type: 'time',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          }
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value} mg'
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
        {
          name: '最高标准值150',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: false
              }
            }
          },
          data: heightStandardValue
        },

        {
          name: '尿蛋白值',
          type: 'line',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top'
              }
            }
          },
          data: proteinuriaRealValue
          }
        ]
      })
    },
    initBloodPressureChart(){
      this.BloodPressureChart = echarts.init(document.getElementById('bloodPressure'))

      const diastolicBloodPressureDTOList = this.bloodPressureData.diastolicBloodPressureDTOList
      const systolicBloodPressureDTOList = this.bloodPressureData.systolicBloodPressureDTOList
      const realValueList = this.bloodPressureData.realValueList

      //舒张压
      const diastolicBloodPressureHeightValue = this.arrayFormat(diastolicBloodPressureDTOList,'heightValue')
      const diastolicBloodPressureLowValue = this.arrayFormat(diastolicBloodPressureDTOList,'lowValue')
      const diastolicBloodPressureRealValue = this.arrayFormat(realValueList,'heightValue')
      console.log(diastolicBloodPressureHeightValue,'舒张压最高');
      console.log(diastolicBloodPressureLowValue,'舒张压最低');
      console.log(diastolicBloodPressureRealValue,'舒张压');
      
      
      //收缩压
      const systolicBloodPressureDTOListHeightValue = this.arrayFormat(systolicBloodPressureDTOList,'heightValue')
      const systolicBloodPressureDTOListLowValue = this.arrayFormat(systolicBloodPressureDTOList,'lowValue')
      const systolicBloodPressureDTOListRealValue = this.arrayFormat(realValueList,'lowValue')
      console.log(systolicBloodPressureDTOListHeightValue,'收缩压最高');
      console.log(systolicBloodPressureDTOListLowValue,'收缩压最低');
      console.log(systolicBloodPressureDTOListRealValue,'收缩压');
      this.BloodPressureChart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '血压',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
        },
        grid: {
          left: '15%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['舒张压最低值60', '舒张压最高值90', '舒张压值','收缩压最低值90', '收缩压最高值140', '收缩压值']
        },
        calculable: true,
        xAxis: [{
          type: 'time',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          }
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value} mg'
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
        {
          name: '舒张压最低值60',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: false
              }
            }
          },
          data: diastolicBloodPressureLowValue 
        },

        {
          name: '舒张压最高值90',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              label: {
                show: false,
                formatter(p) {
                  return ''
                }
              }
            }
          },
          data: diastolicBloodPressureHeightValue
        },
        {
          name: '舒张压值',
          type: 'line',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top'
              }
            }
          },
          data: diastolicBloodPressureRealValue
        },
         {
          name: '收缩压最低值90',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(0,144,128,1)',
              label: {
                show: false
              }
            }
          },
          data: systolicBloodPressureDTOListLowValue
        },

        {
          name: '收缩压最高值140',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(180,191,183,1)',
              label: {
                show: false,
                formatter(p) {
                  return ''
                }
              }
            }
          },
          data: systolicBloodPressureDTOListHeightValue
        },
        {
          name: '收缩压值',
          type: 'line',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(100,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top'
              }
            }
          },
          data: systolicBloodPressureDTOListRealValue
        }
        ]
      })
      
    }
  }
}
</script>
