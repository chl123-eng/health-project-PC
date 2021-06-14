<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" inline style="width: 100%">
      <el-form-item label="审核状态" prop="checkState">
        <el-input v-model="checkState" style="width: 300px" readonly />
        <!-- {{filterStatus(scope.row.checkState)}} -->
      </el-form-item>
      <el-form-item label="未通过理由" style="width: 100%">
        <el-input v-model="form.nocheckReason" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width: 1160px" readonly />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.doctorName" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.doctorSexName" style="width: 300px" :disabled="disabled">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄(岁)">
        <el-input v-model="form.doctorAge" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.doctorPhone" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="form.doctorId" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="职称">
        <el-select v-model="form.doctorTitle" placeholder="请选择" :disabled="disabled">
          <el-option
            v-for="item in doctorTitles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属科室">
        <el-input v-model="form.doctorDept" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.doctorProvince" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="所属医疗机构">
        <el-input v-model="form.doctorOrganization" style="width: 300px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="简介" style="width: 100%">
        <el-input v-model="form.doctorIntroduce" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width: 1160px" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          action=""
          :auto-upload="false"
          style="width: 300px"
          class="upload-demo"
          list-type="picture"
          :limit="1"
          :on-change="uploadAvatar"
          :file-list="avatarPicture"
        >
          <el-button size="small" type="primary" :disabled="disabled">选取头像</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="医师职业资格证">
        <el-upload
          action=""
          :auto-upload="false"
          class="upload-demo"
          list-type="picture"
          :on-change="uploadCertification"
          :limit="1"
          :file-list="certification"
        >
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
import { getInfo, bindingInformation } from '@/api/user'
export default {
  data() {
    return {
      form: {},
      doctorTitles: [{
        value: '主任医师',
        label: '主任医师'
      }, {
        value: '副主任医师',
        label: '副主任医师'
      }, {
        value: '主治医师',
        label: '主治医师'
      }, {
        value: '住院医师',
        label: '住院医师'
      }],
      disabled: false,
      checkState: '',
      avatarPicture: [],
      certification: []
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    // 上传头像
    uploadAvatar(file) {
      this.form.doctorPhotoFile = file.raw
    },
    // 上传证书
    uploadCertification(file) {
      this.form.certificationFile = file.raw
    },
    // 获取个人信息
    getInfo() {
      getInfo().then(res => {
        this.form = res.data
        this.avatarPicture = []
        this.certification = []
        this.avatarPicture.push({ url: this.form.doctorPhoto })

        if (this.form.certification !== null) {
          this.certification.push({ url: this.form.certification })
        } else {
          this.certification = []
        }

        if (this.form.checkState === 'CHECKED') {
          this.disabled = true
          this.checkState = '审核通过'
        } else if (this.form.checkState === 'UNCHECKED') {
          this.checkState = '未审核'
        } else if (this.form.checkState === 'NO_CHECKED') {
          this.checkState = '审核不通过'
        } else {
          this.checkState = '未认证'
        }
      })
    },
    // 完善信息
    bindingInformation() {
      this.form.doctorSex = this.form.doctorSexName === '男' ? '1' : '0'
      const doctorForm = new FormData()
      doctorForm.append('doctorName', this.form.doctorName)
      doctorForm.append('doctorSexName', this.form.doctorSexName)
      doctorForm.append('doctorSex', this.form.doctorSex)
      doctorForm.append('doctorAge', this.form.doctorAge)
      doctorForm.append('doctorPhone', this.form.doctorPhone)
      doctorForm.append('doctorId', this.form.doctorId)
      doctorForm.append('doctorTitle', this.form.doctorTitle)
      doctorForm.append('doctorOrganization', this.form.doctorOrganization)
      doctorForm.append('doctorDept', this.form.doctorDept)
      doctorForm.append('doctorProvince', this.form.doctorProvince)
      doctorForm.append('doctorIntroduce', this.form.doctorIntroduce)
      if (this.form.doctorPhotoFile !== null) {
        doctorForm.append('doctorPhotoFile', this.form.doctorPhotoFile)
      }
      // else{
      //   doctorForm.append('doctorPhotoFile', JSON.parse(sessionStorage.getItem('avatarPicture')))
      // }
      if (this.form.certificationFile !== null) {
        doctorForm.append('certificationFile', this.form.certificationFile)
      }
      // else{
      //   doctorForm.append('certificationFile',JSON.parse(sessionStorage.getItem('certification')))
      // }
      bindingInformation(doctorForm).then(response => {
        if (response.code === '0') {
          this.$message(response.msg)
          sessionStorage.setItem('doctorInfo', response.data)
        }
        this.getInfo()
      })
    },
    toHome() {
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

