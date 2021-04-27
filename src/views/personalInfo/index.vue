<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" inline style="width: 100%">
      <el-form-item label="姓名">
        <el-input v-model="form.doctorName" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="性别" >
        <el-radio-group v-model="form.doctorSexName" style="width: 300px" :disabled="disabled">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄(岁)">
        <el-input v-model="form.doctorAge" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.doctorPhone" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="form.doctorId" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.doctorTitle" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="所属科室">
        <el-input v-model="form.doctorDept" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.doctorTitle" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="简介" style="width: 100%">
        <el-input v-model="form.doctorIntroduce"  type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" style="width: 1160px" :disabled="disabled"/>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          action=""
          :auto-upload="false"
          style="width: 300px"
          class="upload-demo"
          list-type="picture"
          :http-request="uploadFile">
          <el-button size="small" type="primary" :disabled="disabled">选取头像</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="医师职业资格证">
        <el-upload
          action=""
          :auto-upload="false"
          class="upload-demo"
          list-type="picture"
          :http-request="uploadFile">
          <el-button size="small" type="primary" :disabled="disabled">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="position: absolute; left: 50%; margin-left: -108px; margin-top: 150px">
        <el-button type="primary" :disabled="disabled" @click="bindingInformation">完善信息</el-button>
        <el-button @click="toHome">返回首页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo,bindingInformation } from '@/api/user'
import { param2Obj } from '../../utils'
export default {
  data() {
    return {
      form: {
      },
      disabled: false
    }
  },
  mounted(){
    //this.form = JSON.parse(sessionStorage.getItem('doctorInfo'))
    this.getInfo()
  },
  methods: {
    //获取个人信息
    getInfo(){
      getInfo().then(res => {
        this.form = res.data
        if(this.form.checkState == "CHECKED"){
          this.disabled = true
        }
      })
    },
    //上传头像及证书
    uploadFile(f){
      let formData = new FormData()
      formData.append('file',f.file)
      console.log(formData)
    },
    //完善信息
    bindingInformation(){
      this.uploadFile()
      // bindingInformation(this.form).then(response => {
      //   console.log(response)
      // })
    },
    toHome(){
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.app-container{
  margin-top: 20px;
}
.line{
  text-align: center;
}
</style>

