import request from '@/utils/request'

// 创建应用组
export function createGroup(data) {
  return request({
    url: '/api-auth/devusers/saveGroup',
    method: 'post',
    data
  })
}

// 删除应用组
export function deleteGroup(groupId) {
  return request({
    url: `/api-auth/devusers/group/delete/${groupId}`,
    method: 'post'
  })
}

// 修改应用组
export function editGroup(data) {
  return request({
    url: '/api-auth/devusers/updateGroup',
    method: 'post',
    data
  })
}

// 应用组列表
export function groupList(params) {
  return request({
    url: '/api-auth/devusers/groups',
    method: 'get',
    params
  })
}

// 应用列表
export function clientList(params) {
  return request({
    url: '/api-auth/devusers/clients',
    method: 'get',
    params
  })
}

// 创建应用
export function createClient(id, data) {
  return request({
    url: `/api-auth/devusers/client/saveOrUpdate?groupId=${id}`,
    method: 'post',
    data
  })
}

// 删除应用
export function deleteClient(id) {
  return request({
    url: `/api-auth/devusers/client/delete/${id}`,
    method: 'post'
  })
}

// 修改应用
export function editClient(data) {
  return request({
    url: '/api-auth/devusers/client/saveOrUpdate',
    method: 'post',
    data
  })
}
