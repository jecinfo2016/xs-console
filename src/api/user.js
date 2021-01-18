import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/api-auth/oauth/devuser/token',
    method: 'post',
    params
  })
}

export function register(data) {
  return request({
    url: '/api-auth/devusers/save',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api-auth/devusers/getSelf',
    method: 'post'
  })
}

export function logout(params) {
  return request({
    url: '/api-auth/oauth/remove/token',
    method: 'post',
    params
  })
}
