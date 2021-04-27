<template>
  <div class="app-container">
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" >
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.userSexName }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ scope.row.userAge }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.userPhone }}
        </template>
      </el-table-column>
      <el-table-column label="就诊医疗机构" align="center">
        <template slot-scope="scope">
          {{ scope.row.visitMedOrg }}
        </template>
      </el-table-column>
      <el-table-column label="就诊科室" align="center">
        <template slot-scope="scope">
          {{ scope.row.visitDept }}
        </template>
      </el-table-column>
      <el-table-column label="肾病分期" align="center">
        <template slot-scope="scope">
          {{ scope.row.illStage }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
          <div style="display: flex;">
            <el-button type="primary" @click="pass(scope.row.userId)">同意</el-button>
            <el-button type="danger" @click="reject(scope.row.userId)">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getApplyingPatientList,processPatientApplying } from '@/api/table'

export default {
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: 'success',
    //     draft: 'gray',
    //     deleted: 'danger'
    //   }
    //   return statusMap[status]
    // }
  },
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    //获取申请患者列表
    fetchData() {
      this.listLoading = true
      getApplyingPatientList().then(response => {
         this.list = response.data
      })
    },
    //通过或拒绝请求函数
    processPatientApplying(userId,result){
      let params = {
        userId: userId,
        result: result
      }
      processPatientApplying(params).then(res => {
        this.fetchData()
      })
    },
    //通过申请
    pass(userId){
      let result = 'Y'
      this.processPatientApplying(userId, result)
      
    },
    //拒绝申请
    reject(userId){
      let result = 'N'
      this.processPatientApplying(userId, result)
    },
  }
}
</script>
