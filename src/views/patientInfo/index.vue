<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" inline style="width: 100%">
      <!-- <img src="@/assets/查看病历.jpg" alt=""> -->
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.userName" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.userSexName" style="width: 300px" disabled>
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄(岁)">
        <el-input v-model="form.userAge" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.userPhone" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.userId" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="就诊医疗机构">
        <el-input v-model="form.visitMedOrg" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="就诊科室">
        <el-input v-model="form.visitDept" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="肾病分期">
        <el-input v-model="form.illStage" style="width: 300px" readonly />
      </el-form-item>
      <el-form-item label="头像" style="width: 420px; height: 100px">
        <el-avatar :src="form.userPhoto" style="width: 100px; height: 100px" />
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="体征记录" name="symbolRecord">
        <el-table
          :data="recordList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="检查时间" align="center">
            <template slot-scope="scope">
              {{ dateFormat('YYYY-mm-dd', scope.row.recordTime) }}
            </template>
          </el-table-column>
          <el-table-column label="收缩压" align="center">
            <template slot-scope="scope">
              {{ scope.row.sBloodPressure }}
            </template>
          </el-table-column>
          <el-table-column label="舒张压" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dBloodPressure }}</span>
            </template>
          </el-table-column>
          <el-table-column label="血糖" align="center">
            <template slot-scope="scope">
              {{ scope.row.bloodSugar }}
            </template>
          </el-table-column>
          <el-table-column label="尿量" align="center">
            <template slot-scope="scope">
              {{ scope.row.urine }}
            </template>
          </el-table-column>
          <el-table-column label="尿蛋白" align="center">
            <template slot-scope="scope">
              {{ scope.row.proteinuria }}
            </template>
          </el-table-column>
          <el-table-column label="体重" align="center">
            <template slot-scope="scope">
              {{ scope.row.weight }}
            </template>
          </el-table-column>
          <el-table-column label="饮食情况" align="center">
            <template slot-scope="scope">
              {{ scope.row.diet }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="病历记录" name="pictureRecord">

        <el-table
          :data="recordPictureList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          height="300"
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="记录时间" align="center">
            <template slot-scope="scope">
              {{ dateFormat('YYYY-mm-dd', scope.row.recordTime) }}
            </template>
          </el-table-column>
          <el-table-column label="查看病历" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 40px"
                :src="url"
                :preview-src-list="srcList"
                @click="preview(scope.row.groupNo)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      v-if="disabled"
      background
      style="margin-top: 20px"
      :current-page="currPage"
      :page-size="pageSize"
      :page-sizes="[1,2,3]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrPage"
      @size-change="handlePageSize"
    />
    <div style="width: 100%; display: flex; justify-content: center; margin-top: 100px">
      <el-button type="primary" @click="toBindPatient">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getPatientInformationById, getUserRecordDTOList, getUserRecordPictureDTOList, getPatientRecordPictureDTOByGroupNo } from '@/api/table'
export default {
  data() {
    return {
      recordPictureList: [],
      recordList: [],
      form: {
      },
      activeName: 'symbolRecord',
      url: 'http://img2.3png.com/59cf199270d052b007ae6980299f3db4ab5a.png',
      srcList: [],
      recordPicture: [],
      src: [],
      total: 100,
      currPage: 1,
      pageSize: 1,
      disabled: false
    }
  },
  mounted() {
    this.getPatientInformationById()
    this.getUserRecordPictureDTOList()
    this.getUserRecordDTOList()
  },
  methods: {
    // 当前页改变
    handleCurrPage(page) {
      this.currPage = page

      this.getUserRecordDTOList()
    },
    // 每页数改变
    handlePageSize(size) {
      this.pageSize = size
      this.getUserRecordDTOList()
    },
    toBindPatient() {
      this.$router.push({
        path: '/bindPatientList'
      })
    },
    // 日期的转换
    dateFormat(fmt, date) {
      let ret = ''
      date = new Date(date)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString() // 日
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    },
    // 获取患者信息接口
    getPatientInformationById() {
      const params = {
        userId: sessionStorage.getItem('userId')
      }
      getPatientInformationById(params).then(res => {
        this.form = res.data
      })
    },
    // 获得患者体征信息
    getUserRecordDTOList() {
      const params = {
        userId: sessionStorage.getItem('userId'),
        currentPage: this.currPage,
        pageSize: this.pageSize
      }
      getUserRecordDTOList(params).then(res => {
        this.recordList = res.resultList
        this.total = res.total
      })
    },
    // 获得患者病历信息
    getUserRecordPictureDTOList() {
      const params = {
        userId: sessionStorage.getItem('userId')
      }
      getUserRecordPictureDTOList(params).then(res => {
        this.recordPictureList = res.data
      })
    },
    // 点击获得某组病历图片
    preview(groupNo) {
      this.srcList = []
      const params = {
        patientId: sessionStorage.getItem('userId'),
        groupNo: groupNo
      }
      getPatientRecordPictureDTOByGroupNo(params).then(res => {
        this.recordPicture = res.data
        for (let i = 0; i < this.recordPicture.length; i++) {
          this.srcList.push(this.recordPicture[i].photoAddress)
        }
        console.log(this.srcList)
      })
    },
    changeTab(val) {
      if (val.name === 'symbolRecord') {
        this.disabled = true
      } else {
        this.disabled = false
      }
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
.el-pagination {
  position: absolute;
  right: 20px;
}
</style>

