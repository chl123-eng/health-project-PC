<template>
  <div class="chart-container">
    <div style="display: flex">
      <div class="left">
        <ul class="patients">
          <li v-for="(item,index) in patientList" :key="index" :class="{ activeTag : key === index }" @click="chosePatient(index,item.userId)">{{ item.userName }}</li>

        </ul>
      </div>
      <div class="right">
        <el-form inline style="margin-left: 100px;margin-top: 20px">
          <el-form-item label="选择日期">
            <el-date-picker
              v-model="daterange"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <chart :patient-id="patientId" :daterange="daterange" :proteinuria-data="proteinuriaData" :blood-pressure-data="bloodPressureData" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import { getMyBindingPatientInfoList } from '@/api/table'
import { getProteinuria, getBloodPressure } from '@/api/user'

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      patientList: [],
      key: '',
      daterange: [],
      patientId: '',
      proteinuriaData: {},
      bloodPressureData: {}
    }
  },
  mounted() {
    this.getMyBindingPatientInfoList()
  },
  methods: {
    // 获取绑定列表
    getMyBindingPatientInfoList() {
      this.listLoading = true
      getMyBindingPatientInfoList().then(res => {
        if (res.code === 500) {
          this.$message({
            message: res.msg
          })
        }
        this.patientList = res.data
        console.log(res.data)
      })
    },
    chosePatient(i, id) {
      this.key = i
      this.patientId = id
    },
    search() {
      const beginTime = this.daterange[0]
      const endTime = this.daterange[1]
      const data = {
        beginTime: beginTime,
        endTime: endTime,
        userId: this.patientId
      }
      getProteinuria(data).then(response => {
        this.proteinuriaData = response.data
      })
      getBloodPressure(data).then(response => {
        this.bloodPressureData = response.data
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.left{
  width: 200px;
  max-height: calc(100vh - 44px);
  border-right: 1px #1890ff solid;
}
.patients{
  height:100%;
  overflow: auto;
}
.right{
  width: calc(100vw - 200px);
  min-height: calc(100vh - 100px);
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
  line-height: 50px;
  border-bottom: 1px solid #999;
  font-size: 20px;
  text-align: center;
}
.activeTag {
  background-color: rgb(132, 190, 236);
  cursor: pointer;
  color: #fff;
}
li:hover {
  cursor: pointer;
}
</style>

