<template>
  <div class="container">
    <el-form inline style="width: 100%;margin-left: 20px; margin-top: 10px" :model='article'>
      <el-form-item label="题目" style="margin-right: 50px">
        <el-input v-model="article.articleTitle" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="作者" style="margin-right: 50px">
        <el-input v-model="article.publisherName" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="#"
          :auto-upload="false"
          list-type="picture"
          :limit="1"
          :on-change="uploadFile"
          :file-list="articlePicture">
          <el-button size="small" type="primary" style="margin-top: -50px">选取</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <span class="tipTitle">正文</span>
      <div id="editor" style="width: 100%"></div>
      <div class="pubilsh">
      <el-button type="primary" @click='publish'>发布</el-button>
    </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import { publishArticle } from '@/api/user'

export default {
  data(){
    return {
      article: {
        
      },
      articlePicture: []
    }
  },
  mounted(){
    this.checkArticle()
  },
  methods: {
    uploadFile(file, fileList){
      this.article.articlePictureFile = file.raw
    },
    publish(){
      console.log(this.articlePicture);
      
      const form = new FormData();
      if(this.articlePicture.length != 0){
        form.append('articlePicture', this.articlePicture[0].url)
        form.append('articleTitle', this.article.articleTitle)
        form.append('publisherName', this.article.publisherName)
        form.append('articleText', this.article.articleText)
      }
      else{
        form.append('articlePictureFile', this.article.articlePictureFile)
        form.append('articleTitle', this.article.articleTitle)
        form.append('publisherName', this.article.publisherName)
        form.append('articleText', this.article.articleText)
      }
      publishArticle(form).then(response => {
        if(response.code == 0){
          this.$message('发布成功')
          this.article.articleText = ''

        }
      })
    },
    //查看文章
    checkArticle(){
      const editor = new E('#editor')
      editor.config.height = 450
      editor.config.onchange = (newHtml) => {
        this.article.articleText = newHtml
      }
      editor.create()
      if(JSON.parse(sessionStorage.getItem('article')) != null){
        let checkArticle = JSON.parse(sessionStorage.getItem('article'))
        this.article = checkArticle
        this.articlePicture.push({url: this.article.articlePicture})
        editor.txt.html(this.article.articleText);
      }
      sessionStorage.removeItem('article')
    }
  }
}
</script>

<style lang="scss" scoped>
.pubilsh{
  width: 100%;
  display: flex;
  justify-content: center;
}
.tipTitle {
  font-size: 22px;
  font-weight: bold;
  display: block;
  width: fit-content;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-button {
  margin-top: 20px;
}
</style>
