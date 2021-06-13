import request from '@/utils/request'

export function getApplyingPatientList() {
  return request({
    url: '/chp/doctor/patientService/getApplyingPatientList',
    method: 'get'
  })
}
export function getMyBindingPatientList(params) {
  return request({
    url: '/chp/doctor/patientService/getMyBindingPatientList',
    method: 'get',
    params
  })
}

export function processPatientApplying(params) {
  return request({
    url: '/chp/doctor/patientService/processPatientApplying',
    method: 'get',
    params
  })
}

export function getUserListByFilter(params) {
  return request({
    url: '/chp/doctor/patientService/getUserListByFilter',
    method: 'get',
    params
  })
}

export function getPatientInformationById(params) {
  return request({
    url: '/chp/doctor/patientService/getPatientInformationById',
    method: 'get',
    params
  })
}

export function getUserRecordDTOList(params) {
  return request({
    url: '/chp/doctor/patientService/getUserRecordDTOList',
    method: 'get',
    params
  })
}

export function getUserRecordPictureDTOList(params) {
  return request({
    url: '/chp/doctor/patientService/getUserRecordPictureDTOList',
    method: 'get',
    params
  })
}

export function getPatientRecordPictureDTOByGroupNo(params) {
  return request({
    url: '/chp/doctor/patientService/getPatientRecordPictureDTOByGroupNo',
    method: 'get',
    params
  })
}
export function getNoticeList(params) {
  return request({
    url: '/chp/doctor/notice/getNoticeList',
    method: 'get',
    params
  })
}
export function getMyBindingPatientInfoList() {
  return request({
    url: 'chp/doctor/patientService/getMyBindingPatientInfoList',
    method: 'get'
  })
}
