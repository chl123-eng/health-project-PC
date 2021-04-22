<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" inline style="width: 100%">
      <el-form-item label="姓名">
        <el-input v-model="form.doctorName" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.doctorSexName" style="width: 300px">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄(岁)">
        <el-input v-model="form.doctorAge" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.doctorPhone" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.doctorId" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.doctorTitle" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="所属科室">
        <el-input v-model="form.doctorDept" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.doctorTitle" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="简介" style="width: 100%">
        <el-input v-model="form.doctorIntroduce"  type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" style="width: 1160px"/>
      </el-form-item>
      <el-form-item label="头像" style="width: 420px; height: 100px">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="width: 100px; height: 100px"></el-avatar>
      </el-form-item>
      <el-form-item label="医师职业资格证">
       <el-image
        style="width: 100px; height: 100px"
        src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'></el-image>
        </el-form-item>
      <el-form-item style="position: absolute; left: 50%; margin-left: -108px; margin-top: 150px">
        <el-button type="primary" @click="onSubmit">申请医师资格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
      },
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
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

