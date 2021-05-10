<template>
  <div class="container">
    <el-form inline style="width: 100%;margin-left: 20px; margin-top: 10px" :model='article'>
      <el-form-item label="类型" style="margin-right: 50px">
        <el-select v-model="article.isDiet" placeholder="请选择" width="300">
          <el-option
            v-for="item in articelTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
          :on-remove="remove"
          :on-change="uploadFile"
          :file-list="articlePicture">
          <el-button size="small" type="primary" style="margin-top: -50px">选取</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <span class="tipTitle">正文</span>
      <div id="editor" style="width: 100%"></div>
      <div class="pubilsh" style="margin-bottom: 20px" v-show="show">
        <el-button type="primary" @click='publish' :disabled="disabled">发布</el-button>
        <el-button type="primary" @click="save" :disabled="saveDisabled">修改保存</el-button>
      </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import { getInfo,publishArticle,updateArticle } from '@/api/user'
import { parse } from 'path-to-regexp'

export default {
  data(){
    return {
      article: {
        articleNum: '',
      },
      show: false,
      disabled: false,
      saveDisabled: true,
      articlePicture: [],
      articelTypes: [{
        value: 'N',
        label: '科普文章'
      },{
        value: 'Y',
        label: '饮食推荐'
      }]
    }
  },
  mounted(){
    this.getInfo()
    this.checkArticle()
  },
  beforeRouteLeave (to, from, next){
    sessionStorage.removeItem('article')
    next()
  },
  methods: {
    uploadFile(file, fileList){
      this.article.articlePictureFile = file.raw
    },
    //获取个人信息
    getInfo(){
      getInfo().then(res => {
        if(res.data.checkState == 'CHECKED'){
          this.show = true
        }else{
          this.show = false
        }
      })
    },
    publish(){
      const form = new FormData();
      form.append('isDiet', this.article.isDiet)
      form.append('articlePictureFile', this.article.articlePictureFile)
      form.append('articleTitle', this.article.articleTitle)
      form.append('publisherName', this.article.publisherName)
      form.append('articleText', this.article.articleText)
      publishArticle(form).then(res => {
        if(res.code == 0){
          this.$message({
            type: 'success',
            message: '发布成功'
          })
          this.article.articleText = ''

        }
      })
    },
    save(){
      const form = new FormData();
      form.append('isDiet', this.article.isDiet)
      form.append('articleNum',this.article.articleNum)
      form.append('articleTitle', this.article.articleTitle)
      form.append('publisherName', this.article.publisherName)
      form.append('articleText', this.article.articleText)
      if(this.articlePicture.length !== 0){
        form.append('articlePicture', this.articlePicture[0].url)
      }else{
        form.append('articlePictureFile', this.article.articlePictureFile)
      }
      updateArticle(form).then(res => {
        console.log(form);
        
        if(res.code == 0){
          this.$message({
            type: 'success',
            message: '修改保存成功'
          })
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
      this.article.articleNum = JSON.stringify(sessionStorage.getItem('article')).articleNum
      if(JSON.parse(sessionStorage.getItem('article')) != null){
        let checkArticle = JSON.parse(sessionStorage.getItem('article'))
        this.article = checkArticle
        this.articlePicture.push({url: this.article.articlePicture})
        editor.txt.html(this.article.articleText);
      }
      if(JSON.parse(sessionStorage.getItem('article')).isAvailable == 'PUBLISHING'){
        this.disabled = true
        this.saveDisabled = true
      }else{
        this.disabled = true
        this.saveDisabled = false
      }
    },
    //移除图片
    remove(file,fileList){
      this.articlePicture = fileList
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
