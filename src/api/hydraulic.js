import request from '@/utils/request'

// 获取水利列表
export function findWaterModelInfo(obj) {
    return request({
        url: '/api-developer/epnaet-water/findWaterModelInfo',
        method: 'post',
        params: obj
    })
}

// 获取水利列表
export function uploadEnactFile(obj) {
    return request({
        url: '/api-developer/epnaet-water/uploadEnactFile',
        method: 'post',
        params: obj
    })
}

// 新增数据
export function translateEnactInfo(obj) {
    return request({
        url: '/api-developer/epnaet-water/translateEnactInfo',
        method: 'post',
        data: obj,
        headers: {
            "Content-Type": "application/json",
        },
    })
}

// 删除数据
export function deleteBasciWaterInfo(obj) {
    return request({
        url: '/api-developer/epnaet-water/deleteBasciWaterInfo',
        method: 'post',
        params: obj,
    })
}

export function findGuidesInfo(obj) {
    return request({
        url: '/api-developer/epnaet-water/findGuidesInfo',
        method: 'post',
        params: obj,
    })
}


// params: query

