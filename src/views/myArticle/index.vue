<template>
  <div>
    <el-table
        :data="articleList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="margin-top: 10px;"
      >
        <el-table-column align="center" label="序号" width='200'>
          <template slot-scope="scope">
            {{ scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="文章标题" align="center" width='300'>
            <template slot-scope="scope">
              {{ scope.row.articleTitle }}
            </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" width='100'>
          <template slot-scope="scope">
            {{ dateFormat('YYYY-mm-dd', scope.row.publishTime) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ filter(scope.row.isAvailable) }}
            </template>
        </el-table-column>
        <el-table-column label="原因" align="center"  width='500'>
            <template slot-scope="scope">
              {{ scope.row.reason }}
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  width='200'>
          <template slot-scope="scope">
            <el-button type='primary' @click='getMyArticleByArticleId(scope.row.articleNum)'>查看</el-button>
            <el-button type='danger' @click='deleteArticle(scope.row.articleNum)'>删除</el-button>
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
import { getMyArticleList, getMyArticleByArticleId, deleteMyArticleByArticleId} from '@/api/user'
import { Message } from 'element-ui'
export default {
  data(){
    return {
      articleList: [],
      total: 100,
      currPage: 1,
      pageSize: 5
    }
  },
  mounted(){
    this.getMyArticleList()
  },
  methods: {
    //当前页改变
    handleCurrPage(page){
      this.currPage = page
      this.getMyArticleList()
    },
    //每页数改变
    handlePageSize(size){
      this.pageSize = size
      this.getMyArticleList()
    },
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

    //获取我的文章列表
    getMyArticleList(){
      const params = {
        currentPage: this.currPage,
        pageSize: this.pageSize
      }
      getMyArticleList(params).then(response => {
        if(response.returnCode == 500){
          this.$message({
            message: response.returnMessage
          })
        }
        this.articleList = response.resultList
        this.total = response.total
      })
    },
    //审核状态筛选
    filter(status){
      if(status == 'UNCHECKED'){
        return '待审核'
      }else if(status == 'CHECKOUT'){
        return '审核不通过'
      }else if(status == 'UNPUBLISH'){
        return '管理员撤销'
      }else {
        return '审核通过'
      }
    },
    //删除文章
    deleteArticle(articleNum){
      let params = {articleNum: articleNum}
      deleteMyArticleByArticleId(params).then(response => {
        if(response.code == 0){
          this.$message({
            type:'success',
            message: '删除成功'
          })
          this.getMyArticleList()
        }
      })
    },
    //查看文章
    getMyArticleByArticleId(articleNum){
      this.isCheck = true
      let params = {articleNum: articleNum}
      getMyArticleByArticleId(params).then(response => {
        sessionStorage.setItem('article', JSON.stringify(response.data))
        this.$router.push({
          path: '/publishArticle'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  position: absolute;
  right: 20px;
}
</style>