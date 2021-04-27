<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item label="患者姓名">
        <el-input v-model="searchStr" style="width: 300px" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <div style="display: flex;">
            <el-button type="primary" @click="toPatientInfo(scope.row.userId)">查看详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMyBindingPatientList, getUserListByFilter } from '@/api/table'

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
      searchStr: '',
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    //点击详情
    toPatientInfo(userId){
      sessionStorage.setItem('userId',userId)
      this.$router.push({path: '/patientInfo'})
    },
    //获取绑定列表
    fetchData() {
      this.listLoading = true
      getMyBindingPatientList().then(response => {
        this.list = response.data
      })
    },
    //根据姓名查询
    search(){
      getUserListByFilter({
        searchStr: this.searchStr
      }).then(res => {
        if(res.code == 0){
          this.$message({
            type: 'success',
            message: '查询成功'
          })
          this.list = res.data
        }
      })
    }
  }
}
</script>
