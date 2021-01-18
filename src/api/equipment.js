import request from '@/utils/request'

// 获取列表树
export function queryDevDeviceInfo(obj) {
    return request({
        url: '/api-developer/dev-device/queryDevDeviceInfo',
        method: 'post',
        params: obj
    })
}

// 获取设备
export function queryDeviceInfoList(obj) {
    return request({
        url: '/api-developer/dev-device/queryDeviceInfoList',
        method: 'post',
        params: obj
    })
}
// 数据添加
export function addDevDeviceInfo(obj) {
    return request({
        url: '/api-developer/dev-device/addDevDeviceInfo',
        method: 'post',
        data: obj
    })
}

// 删除数据
export function deleteDeviceRelationInfo(obj) {
    return request({
        url: '/api-developer/dev-device/deleteDeviceRelationInfo',
        method: 'post',
        params: obj
    })
}

// 获取数据类型
export function queryDeviceTypeInfo(obj) {
    return request({
        url: '/api-developer/dev-device/queryDeviceTypeInfo',
        method: 'post',
        params: obj

    })
}

// 修改信息
export function updateDeviceRelationInfo(obj) {
    return request({
        url: '/api-developer/dev-device/updateDeviceRelationInfo',
        method: 'post',
        params: obj

    })
}

// params: query

