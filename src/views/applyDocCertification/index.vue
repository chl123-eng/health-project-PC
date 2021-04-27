<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" inline style="width: 100%">
      <el-form-item label="姓名">
        <el-input v-model="form.doctorName" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.doctorSexName" style="width: 300px" :disabled="disabled">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄(岁)">
        <el-input v-model="form.doctorAge" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.doctorPhone" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.doctorId" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.doctorTitle" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="所属科室">
        <el-input v-model="form.doctorDept" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.doctorTitle" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px" readonly/>
      </el-form-item>
      <el-form-item label="简介" style="width: 100%">
        <el-input v-model="form.doctorIntroduce"  type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" style="width: 1160px" readonly/>
      </el-form-item>
      <el-form-item label="头像" style="width: 420px; height: 100px">
        <el-avatar :src="form.doctorPhoto" style="width: 100px; height: 100px"></el-avatar>
      </el-form-item>
      <el-form-item label="医师职业资格证">
       <el-image
        style="width: 100px; height: 100px"
        :src='form.certification'></el-image>
        </el-form-item>
      <el-form-item style="position: absolute; left: 50%; margin-left: -108px; margin-top: 150px">
        <el-button type="primary" @click="applyingReview" :disabled="disabled">申请医师资格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {applyingReview} from '@/api/user'
export default {
  data() {
    return {
      form: {
      },
      disabled: true
    }
  },
  mounted(){
    this.form = JSON.parse(sessionStorage.getItem('doctorInfo'))
    if(this.form.checkState == "CHECKED"){
      this.disabled = true
    }
  },
  methods: {
    applyingReview(){
      applyingReview().then(res => {
        if(res.code === 0){
          this.$message({
            type: 'success',
            message: '申请已发送'
          })
        }
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

