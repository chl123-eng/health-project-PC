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
    <el-pagination
      background
      style="margin-top: 20px"
      @current-change="handleCurrPage"
      @size-change="handlePageSize"
      :current-page="currPage"
      :page-size="pageSize"
      :page-sizes="[5,10,15]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
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
      listLoading: true,
      total: 100,
      currPage: 1,
      pageSize: 5
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
      //当前页改变
    handleCurrPage(page){
      this.currPage = page
      this.fetchData()
    },
    //每页数改变
    handlePageSize(size){
      this.pageSize = size
      this.fetchData()
    },
    //获取申请患者列表
    fetchData() {
      this.listLoading = true
      const params = {
        currentPage: this.currPage,
        pageSize: this.pageSize
      }
      getApplyingPatientList(params).then(response => {
        this.list = response.resultList
        this.total = response.total
        if(response.returnCode == 500){
          this.$message({
            message: response.returnMessage
          })
        }
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
<style lang="scss" scoped>
.el-pagination {
  position: absolute;
  right: 20px;
}
</style>
