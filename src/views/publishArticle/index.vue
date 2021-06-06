<template>
  <div class="container">
    <el-form ref="article" inline style="width: 100%;margin-left: 20px; margin-top: 10px" :model="article" :rules="formRules">
      <el-form-item label="类型" style="margin-right: 50px" prop="isDiet">
        <el-select v-model="article.isDiet" placeholder="请选择" width="300">
          <el-option
            v-for="item in articelTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable
          />
        </el-select>
      </el-form-item>
      <el-form-item label="题目" style="margin-right: 50px" prop="articleTitle">
        <el-input v-model="article.articleTitle" style="width: 300px" clearable />
      </el-form-item>
      <el-form-item label="作者" style="margin-right: 50px" prop="publisherName">
        <el-input v-model="article.publisherName" style="width: 300px" clearable />
      </el-form-item>
      <el-form-item label="图片" prop="articlePicture" :rules="{ required: this.article.articlePictureFile == '' ? true : false, message: '请添加图片' }">
        <el-upload
          style="width: 80px"
          action="#"
          :auto-upload="false"
          list-type="picture"
          :limit="1"
          :on-remove="remove"
          :on-change="uploadFile"
          :file-list="articlePicture"
        >
          <el-button size="small" type="primary" style="margin-top: -50px">选取</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item prop="articleText" :rules="{ required: this.article.articleText == '' ? true : false, message: '请输入内容' }">
        <span class="tipTitle">正文</span>
        <el-input v-model="articleText" class="hide" clearable />
        <div id="editor" style="width: 1420px" />
      </el-form-item>
    </el-form>
    <div v-show="show" class="pubilsh" style="margin-bottom: 20px">
      <el-button type="primary" :disabled="disabled" @click="publish(&quot;article&quot;)">发布</el-button>
      <el-button type="primary" :disabled="saveDisabled" @click="save">修改保存</el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { getInfo, publishArticle, updateArticle } from '@/api/user'

export default {
  data() {
    return {
      article: {
        articleNum: '',
        isDiet: '',
        articleTitle: '',
        publisherName: '',
        articlePicture: '',
        articleText: '',
        articlePictureFile: ''
      },
      articleText: '',
      show: false,
      disabled: false,
      saveDisabled: true,
      articlePicture: [],
      articelTypes: [{
        value: 'N',
        label: '科普文章'
      }, {
        value: 'Y',
        label: '饮食推荐'
      }],
      formRules: {
        isDiet: [
          { required: true, message: '请输入文章类型', trigger: 'change' }
        ],
        articleTitle: [
          { required: true, message: '请输入文章题目', trigger: 'blur' }
        ],
        publisherName: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        articlePicture: [
          { required: true, message: '请添加图片' }
        ],
        articleText: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getInfo()
    this.checkArticle()
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem('article')
    next()
  },
  methods: {
    uploadFile(file, fileList) {
      this.article.articlePictureFile = file.raw
      if (this.article.articlePictureFile !== '') {
        this.$refs['article'].clearValidate('articlePicture')
      } else {
        this.$refs['article'].validateField('articlePicture')
      }
    },
    // 获取个人信息
    getInfo() {
      getInfo().then(res => {
        if (res.data.checkState === 'CHECKED') {
          this.show = true
        } else {
          this.show = false
        }
      })
    },
    publish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = new FormData()
          form.append('isDiet', this.article.isDiet)
          form.append('articlePictureFile', this.article.articlePictureFile)
          form.append('articleTitle', this.article.articleTitle)
          form.append('publisherName', this.article.publisherName)
          form.append('articleText', this.article.articleText)

          publishArticle(form).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '发布成功'
              })
            } else {
              this.$message.error({
                message: '发布失败'
              })
            }
          })
        }
      })
    },
    save() {
      const form = new FormData()
      form.append('isDiet', this.article.isDiet)
      form.append('articleNum', this.article.articleNum)
      form.append('articleTitle', this.article.articleTitle)
      form.append('publisherName', this.article.publisherName)
      form.append('articleText', this.article.articleText)
      if (this.articlePicture.length !== 0) {
        form.append('articlePicture', this.articlePicture[0].url)
      } else {
        form.append('articlePictureFile', this.article.articlePictureFile)
      }
      updateArticle(form).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '修改保存成功'
          })
        }
      })
    },
    // 查看文章
    checkArticle() {
      const editor = new E('#editor')
      editor.config.height = 450
      editor.config.onchange = (newHtml) => {
        this.article.articleText = newHtml
      }
      editor.create()
      this.article.articleNum = JSON.stringify(sessionStorage.getItem('article')).articleNum
      if (JSON.parse(sessionStorage.getItem('article')) !== null) {
        const checkArticle = JSON.parse(sessionStorage.getItem('article'))
        this.article = checkArticle
        console.log(this.article)
        this.articlePicture.push({ url: this.article.articlePicture })
        editor.txt.html(this.article.articleText)
      }
      if (JSON.parse(sessionStorage.getItem('article')).isAvailable === 'PUBLISHING') {
        this.disabled = true
        this.saveDisabled = true
      } else {
        this.disabled = true
        this.saveDisabled = false
      }
    },
    // 移除图片
    remove(file, fileList) {
      this.articlePicture = fileList
      this.article.articlePictureFile = ''
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
.hide.el-input {
  height: 0;
  width: 0;
  position: absolute;
  overflow: hidden;
}

</style>
