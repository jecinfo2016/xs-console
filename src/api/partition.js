import request from '@/utils/request'

// 获取列表树
export function getDmaTree(data) {
    return request({
        url: '/api-developer/ndmainfo/getDmaTree',
        method: 'post',
        data
    })
}

// 移动数据
export function move(data) {
    return request({
        url: '/api-developer/ndmainfo/move',
        method: 'post',
        data
    })
}

// 删除数据
export function deleteDmaInfoById(obj) {
    return request({
        url: '/api-developer/ndmainfo/deleteDmaInfoById/'+obj,
        method: 'post',
    })
}

// 保存数据
export function addsave(data) {
    return request({
        url: '/api-developer/ndmainfo/save',
        method: 'post',
        data
    })
}
