import request from '@/utils/request'
import axios from 'axios'

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
    data,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function bindingInformation(data) {
  return request({
    url: 'chp/doctor/account/bindingInformation',
    method: 'post',
    data
  })
}

export function applyingReview() {
  return request({
    url: 'chp/doctor/account/applyingReview',
    method: 'get'
  })
}