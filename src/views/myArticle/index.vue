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
        <el-table-column label="文章标题" align="center">
            <template slot-scope="scope">
              {{ scope.row.articleTitle }}
            </template>
          </el-table-column>
        <el-table-column label="发布时间" align="center" width='300'>
          <template slot-scope="scope">
            {{ dateFormat('YYYY-mm-dd', scope.row.publishTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  width='400'>
          <template slot-scope="scope">
            <el-button type='primary' @click='getMyArticleByArticleId(scope.row.articleNum)'>查看</el-button>
            <el-button type='danger' @click='deleteArticle(scope.row.articleNum)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { getMyArticleList, getMyArticleByArticleId, deleteMyArticleByArticleId} from '@/api/user'
import { Message } from 'element-ui'
export default {
  data(){
    return {
      articleList: []
    }
  },
  mounted(){
    this.getMyArticleList()
  },
  methods: {
    //日期的转换
    dateFormat(fmt, date) {
      let ret = ''
      date = new Date(date)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': date.getMonth().toString(), // 月
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
      getMyArticleList().then(response => {
        this.articleList = response.data
      })
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