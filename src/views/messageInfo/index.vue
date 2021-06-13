<template>
  <div class="app-container">
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告标题" width="300">
        <template slot-scope="scope">
          {{ scope.row.noticeTitle }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告时间" width="200">
        <template slot-scope="scope">
          {{ dateFormat('YYYY-mm-dd',scope.row.noticeTime) }}
        </template>
      </el-table-column>
      <el-table-column label="公告内容" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.noticeText" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top: 20px"
      :current-page="currPage"
      :page-size="pageSize"
      :page-sizes="[5,10,15]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrPage"
      @size-change="handlePageSize"
    />
    <el-button type="primary" class="btn" @click="toHome">返回首页</el-button>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/table'

export default {
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
    this.getNoticeList()
  },
  methods: {
    // 日期的转换
    dateFormat(fmt, date) {
      let ret = ''
      date = new Date(date)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString() // 日
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    },
    // 当前页改变
    handleCurrPage(page) {
      this.currPage = page
      this.getNoticeList()
    },
    // 每页数改变
    handlePageSize(size) {
      this.pageSize = size
      this.getNoticeList()
    },
    // 获取公告列表
    getNoticeList() {
      this.listLoading = true
      const params = {
        currentPage: this.currPage,
        pageSize: this.pageSize
      }
      getNoticeList(params).then(response => {
        if (response.returnCode === 500) {
          this.$message({
            message: response.returnMessage
          })
        }
        this.list = response.resultList
        this.total = response.total
      })
    },
    // 返回首页
    toHome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  position: absolute;
  right: 20px;
  padding-bottom: 10px;
}
.btn{
  position: absolute;
  left: calc(50vw - 50px);
  margin-top: 100px;
}
</style>
