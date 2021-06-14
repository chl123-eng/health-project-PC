import request from '@/utils/request'
export function getMessageList() {
  return request({
    url: '/chp/message/getMessageList',
    method: 'get'
  })
}
