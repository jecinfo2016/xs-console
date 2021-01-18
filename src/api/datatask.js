import request from '@/utils/request'

// 获取列表树
export function queryDeviceTaskList(obj) {
    return request({
        url: '/api-device/tsdbDevice/queryDeviceTaskList',
        method: 'post',
        params: obj
    })
}

// 获取设备类型
export function getEquipmentTsdbTypes() {
    return request({
        url: '/api-device/tsdbDevice/getEquipmentTsdbTypes',
        method: 'post'
    })
}

// 获取统计字段
export function getEquipmentTsdbTags(obj) {
    return request({
        url: '/api-device/tsdbDevice/getEquipmentTsdbTags',
        method: 'post',
        params: obj

    })
}

// 获取设备列表
export function getDeviceInfoList(obj) {
    return request({
        url: '/api-device/tsdbDevice/getDeviceInfoList',
        method: 'post',
        params: obj

    })
}
// 获取聚合方式
export function getAggregators(obj) {
    return request({
        url: '/api-device/tsdbDevice/getAggregators',
        method: 'post',
        params: obj

    })
}

// 数据添加
export function addDeviceTask(obj) {
    return request({
        url: '/api-device/tsdbDevice/addDeviceTask',
        method: 'post',
        data: obj,
        headers: {
            "Content-Type": "application/json",
        },
    })
}

// 删除数据
export function deleteTaskInfo(obj) {
    return request({
        url: '/api-device/tsdbDevice/deleteTaskInfo',
        method: 'post',
        params: obj
    })
}

// 查看数据
export function DeviceTaskList(obj) {
    return request({
        url: '/api-device/TaskOutput/deviceTaskList',
        method: 'post',
        params: obj
    })
}

// 数据修改
export function updateTaskInfo(obj) {
    return request({
        url: '/api-device/tsdbDevice/updateTaskInfo',
        method: 'post',
        data: obj,
        headers: {
            "Content-Type": "application/json",
        },
    })
}

// 状态修改
export function updateTaskFlag(obj) {
    return request({
        url: '/api-device/tsdbDevice/updateTaskFlag',
        method: 'post',
        params: obj
    })
}