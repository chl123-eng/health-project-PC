import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/chp/doctor/account/login',
    method: 'get',
    params
  })
}

export function getInfo() {
  return request({
    url: '/chp/doctor/account/getInformation',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/chp/doctor/account/doctorRegister',
    method: 'post',
    data
  })
}

export function bindingInformation(data) {
  return request({
    url: 'chp/doctor/account/bindingInformation',
    method: 'post',
    data
  })
}
