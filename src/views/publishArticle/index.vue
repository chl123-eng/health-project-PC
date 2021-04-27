<template>
  <div class="container">
    <el-form inline style="margin-left: 20px; margin-top: 10px">
      <el-form-item label="题目" style="margin-right: 50px">
        <el-input v-model="article.articleTitle" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="作者" style="margin-right: 50px">
        <el-input v-model="article.publisher" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action=""
          :auto-upload="false"
          list-type="picture">
          <el-button size="small" type="primary" style="margin-top: -50px">选取</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <span class="tipTitle">正文</span>
    <div id="editor">
    </div>
    <div class="pubilsh">
      <el-button type="primary" @click='click'>发布</el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  data(){
    return {
      article: {},
      editorData: ''
    }
  },
  mounted(){
    const editor = new E('#editor')
    editor.config.height = 450
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
    }
    editor.create()
  },
  methods: {
    click(){
     console.log(this.editorData);
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
