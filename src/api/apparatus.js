import request from '@/utils/request'

// 创建应用组
export function listByModelId(obj) {
  return request({
    url: '/api-device/point-device/listByModelId',
    method: 'post',
    params: obj
  })
}

export function save(obj) {
  return request({
    url: '/api-device/point-device/save',
    method: 'post',
    params: obj
  })
}

export function deleteById(obj) {
  return request({
    url: '/api-device/point-device/deleteById',
    method: 'post',
    params: obj
  })
}
