import request from '@/utils/request'

// 获取列表树
// export function pageList(obj) {
//     return request({
//         url: '/api-developer/api/job/pageList',
//         method: 'get',
//         params: obj
//     })
// }

export function pageList(obj) {
    return request({
        url: '/api-device/DeviceLog/pageList',
        method: 'get',
        params: obj
    })
}
// 状态

export function stop(obj) {
    return request({
        url: '/api-developer/api/job/stop',
        method: 'post',
        params: obj
    })
}