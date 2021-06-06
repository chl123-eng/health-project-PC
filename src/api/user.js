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
export function resetPassword(params) {
  return request({
    url: '/chp/doctor/account/resetPassword',
    method: 'get',
    params
  })
}
export function register(data) {
  return request({
    url: '/chp/doctor/account/doctorRegister',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
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

export function publishArticle(data) {
  return request({
    url: 'chp/doctor/article/publishArticle',
    method: 'post',
    data
  })
}

export function getMyArticleList(params) {
  return request({
    url: 'chp/doctor/article/getMyArticleList',
    method: 'get',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: 'chp/doctor/article/updateArticle',
    method: 'post',
    data
  })
}

export function deleteMyArticleByArticleId(params) {
  return request({
    url: 'chp/doctor/article/deleteMyArticleByArticleId',
    method: 'delete',
    params
  })
}

export function getMyArticleByArticleId(params) {
  return request({
    url: 'chp/doctor/article/getMyArticleByArticleId',
    method: 'get',
    params
  })
}

export function getProteinuria(data) {
  return request({
    url: 'chp/doctor/analysis/getProteinuria',
    method: 'post',
    data
  })
}

export function getBloodPressure(data) {
  return request({
    url: 'chp/doctor/analysis/getBloodPressure',
    method: 'post',
    data
  })
}
