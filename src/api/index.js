import request from '@/utils/request'

//登录页 图片验证码
export function loginImage(data) {
  return request({
    url: `/login/code/image`,
    method: 'get',
    data
  })
}

//登录页  提交按钮
export function login(data) {
  return request({
    url: `/login/oauth/token?grant_type=password`,
    method: 'post',
    data
  })
}

//总览 管道画线接口B方案
export function getPipelineMapPlanB(data) {
  return request({
    url: `/api/water/overview/getPipelineMapPlanB`,
    method: 'post',
    data
  })
}

//总览 管网设施
export function getPipeNetworkCount(data) {
  return request({
    url: `/api/water/overview/getPipeNetworkCount`,
    method: 'post',
    data
  })
}

//总览 获取管线总长度、桥管总数、沉管总数
export function getPipeLineCount(data) {
  return request({
    url: `/api/water/overview/getPipeLineCount`,
    method: 'post',
    data
  })
}

//总览 获取管线材质报表数据
export function getPipeLineMaterial(data) {
  return request({
    url: `/api/water/overview/getPipeLineMaterial`,
    method: 'post',
    data
  })
}

//总览 获取管龄报表数据
export function getPipeLineAge(data) {
  return request({
    url: `/api/water/overview/getPipeLineAge`,
    method: 'post',
    data
  })
}

//总览 获取管道口径报表数据
export function getPipeLineCaliber(data) {
  return request({
    url: `/api/water/overview/getPipeLineCaliber`,
    method: 'post',
    data
  })
}

//总览 获取设备经纬度
export function getPressPoint(data) {
  return request({
    url: `/api/water/overview/getPressPoint`,
    method: 'post',
    data
  })
}

//总览 获取漏损告警经纬度
export function getLeakageAddress(data) {
  return request({
    url: `/api/water/overview/getLeakageAddress`,
    method: 'post',
    data
  })
}

//总览 忽略漏损告警
export function ignoreLeakage(data) {
  return request({
    url: `/api/water/overview/ignoreLeakage`,
    method: 'post',
    data
  })
}

//总览 忽略设备告警
export function ignoreDevice(data) {
  return request({
    url: `/api/water/overview/ignoreDevice`,
    method: 'post',
    data
  })
}

//总览 设备历史检测数据
export function getDeviceDatas(data) {
  return request({
    url: `/api/water/overview/getDeviceData`,
    method: 'post',
    data
  })
}

//总览 获取设备经纬度
export function getPipelineMap(data) {
  return request({
    url: `/api/water/overview/getPipelineMap`,
    method: 'post',
    data
  })
}

//总览 产销差下拉
export function getNrwSelect(data) {
  return request({
    url: `/api/water/overview/getNrwSelect`,
    method: 'post',
    data
  })
}

//总览 产销差报表查值
export function getNrw(data) {
  return request({
    url: `/api/water/overview/getNrw`,
    method: 'post',
    data
  })
}

//总览 管线压力报表数据
export function getPressure(data) {
  return request({
    url: `/api/water/overview/getPressure`,
    method: 'post',
    data
  })
}

//总览 管线压力报表数据2
export function getPressuretwo(data) {
  return request({
    url: `/api/water/overview/getPress`,
    method: 'post',
    data
  })
}


//总览  夜间最小流量


export function getNightMinFlow(data) {
  return request({
    url: `/api/water/overview/getNightMinFlow`,
    method: 'post',
    data
  })
}

//总览 漏损率排名
export function getLeakRanking(data) {
  return request({
    url: `/api/water/overview/getLeakRanking`,
    method: 'post',
    data
  })
}



//总览 漏损量
export function getLeakageVolume(data) {
  return request({
    url: `/api/water/overview/getLeakageVolume`,
    method: 'post',
    data
  })
}

//总览 供售水量报表数据
export function getSaleAndSupply(data) {
  return request({
    url: `/api/water/overview/getSaleAndSupply`,
    method: 'post',
    data
  })
}

//总览 大用户下拉列表
export function getUserRankSelect(data) {
  return request({
    url: `/api/water/overview/getUserRankSelect`,
    method: 'post',
    data
  })
}

//总览 大用户下拉列表
export function getUserRanking(data) {
  return request({
    url: `/api/water/overview/getUserRanking`,
    method: 'post',
    data
  })
}

//总览 实时作业数据
export function getWorkCount(data) {
  return request({
    url: `/api/water/overview/getWorkCount`,
    method: 'post',
    data
  })
}

//总览 实时作业数据二
export function getTaskMap(data) {
  return request({
    url: `/api/water/overview/getTaskMap`,
    method: 'post',
    data
  })
}




//泵房管理 应急物资
export function Supplies(data) {
  return request({
    url: `/api/water/pumpHouse/getEmergencySupplies`,
    method: 'post',
    data
  })
}

//泵房管理 水泵数据
export function getPumpData(data) {
  return request({
    url: `/api/water/pumpHouse/getPumpData`,
    method: 'post',
    data
  })
}

//泵房管理 泵房数据
export function getPumpStatusData(data) {
  return request({
    url: `/api/water/pumpHouse/getPumpStatusData`,
    method: 'post',
    data
  })
}

//泵房管理 设备告警
export function getWarningData(data) {
  return request({
    url: `/api/water/pumpHouse/getWarningData`,
    method: 'post',
    data
  })
}

//水源地 实时天气数据
export function getWeatherData(data) {
  return request({
    url: `/api/water/water/getWeatherData`,
    method: 'post',
    data
  })
}

// 水源地 水质预测数据
export function getwaterQualityData(data) {
  return request({
    url: `/api/water/water/getwaterQualityData`,
    method: 'post',
    data
  })
}

//水源地 水质数据对比
export function getWaterQuality(data) {
  return request({
    url: `/api/water/water/getWaterQuality`,
    method: 'post',
    data
  })
}

//水源地 水源水质状况
export function getWaterQualityStatus(data) {
  return request({
    url: `/api/water/water/getWaterQualityStatus`,
    method: 'post',
    data
  })
}

//水源地 巡视统计
export function getCountPatrol(data) {
  return request({
    url: `/api/water/water/getCountPatrol`,
    method: 'post',
    data
  })
}




//漏损总览
export function getPipelineLeakControl(data) {
  return request({
    url: `/api/water/leakage/pipelineLeakControl`,
    method: 'post',
    data
  })
}




//漏损控制 报表类型下拉框
export function getChartDataSelect(data) {
  return request({
    url: `/api/water/leakage/getChartDataSelect`,
    method: 'post',
    data
  })
}

//漏损控制 下拉框数据
export function getChartData(data) {
  return request({
    url: `/api/water/leakage/getChartData`,
    method: 'post',
    data
  })
}

//漏损控制 table
export function pipelineLeakControl(data) {
  return request({
    url: `/api/water/leakage/pipelineLeakControl`,
    method: 'post',
    data
  })
}

//漏损控制 漏损分析 流量分析
export function analysisFlow(data) {
  return request({
    url: `/api/water/leakage/analysisFlow`,
    method: 'post',
    data
  })
}

//漏损控制 漏损分析 用水分析
export function analysisWater(data) {
  return request({
    url: `/api/water/leakage/analysisWater`,
    method: 'post',
    data
  })
}

//漏损控制 漏损分析 压力分析
export function analysisPress(data) {
  return request({
    url: `/api/water/leakage/analysisPress`,
    method: 'post',
    data
  })
}

//漏损控制 漏损分析 供水分析
export function analysisWaterSupply(data) {
  return request({
    url: `/api/water/leakage/analysisWaterSupply`,
    method: 'post',
    data
  })
}

//漏损控制 漏损记录
export function recordList(data) {
  return request({
    url: `/api/water/leakage/recordList`,
    method: 'post',
    data
  })
}

//漏损控制 漏损记录详情
export function recordDetail(data) {
  return request({
    url: `/api/water/leakage/recordDetail`,
    method: 'post',
    data
  })
}

//工单模块 工单列表
export function workOrderList(data) {
  return request({
    url: `/api/water/job/workOrderList`,
    method: 'post',
    data
  })
}

//工单模块 发起工单 管线下拉框
export function getPipeLineSelect(data) {
  return request({
    url: `/api/water/job/getPipeLineSelect`,
    method: 'post',
    data
  })
}

//工单模块 发起工单 指派人下拉框
export function getUserList(data) {
  return request({
    url: `/api/water/job/getUserList`,
    method: 'post',
    data
  })
}

//工单模块 发起工单提交
export function workOrder(data) {
  return request({
    url: `/api/water/job/workOrder`,
    method: 'post',
    data
  })
}

//工单模块 发起工单提交
export function getDeviceWarning(data) {
  return request({
    url: `/api/water/job/getDeviceWarning`,
    method: 'post',
    data
  })
}

//工单模块 工单详情基本信息
export function workOrderMessage(data) {
  return request({
    url: `/api/water/job/workOrderMessage`,
    method: 'post',
    data
  })
}

//工单模块 工单详情处理记录
export function workOrderDetailList(data) {
  return request({
    url: `/api/water/job/workOrderDetailList`,
    method: 'post',
    data
  })
}

//工单模块 工单详情照片提交
export function upload(data) {
  return request({
    url: `/file/api/upload`,
    method: 'post',
    data
  })
}

//工单模块 提交处理记录
export function addWorkDetail(data) {
  return request({
    url: `/api/water/job/addWorkDetail`,
    method: 'post',
    data
  })
}

//设备管理 设备总数和设备在线率
export function getDeviceCountAndOnline(data) {
  return request({
    url: `/api/water/device/getDeviceCountAndOnline`,
    method: 'post',
    data
  })
}

//设备管理 设备搜索显示列表
export function getDeviceList(data) {
  return request({
    url: `/api/water/device/getDeviceList`,
    method: 'post',
    data
  })
}

//设备管理 获取所有设备
export function getAllDeviceList(data) {
  return request({
    url: `/api/water/device/getAllDeviceList`,
    method: 'post',
    data
  })
}

//设备管理 设备添加
export function addDevice(data) {
  return request({
    url: `/api/water/device/addDevice`,
    method: 'post',
    data
  })
}

//设备管理 设备删除
export function deleteDevice(data) {
  return request({
    url: `/api/water/device/deleteDevice`,
    method: 'post',
    data
  })
}

//设备管理 设备详情基本信息
export function getDeviceDetail(data) {
  return request({
    url: `/api/water/device/getDeviceDetail`,
    method: 'post',
    data
  })
}

//设备管理 设备详情基本信息
export function getDeviceRepairRecord(data) {
  return request({
    url: `/api/water/device/getDeviceRepairRecord`,
    method: 'post',
    data
  })
}

//设备管理 设备详情基本信息
export function updateDevice(data) {
  return request({
    url: `/api/water/device/updateDevice`,
    method: 'post',
    data
  })
}

//设备管理 设备数据查看
export function getDeviceData(data) {
  return request({
    url: `/api/water/device/getDeviceData`,
    method: 'post',
    data
  })
}

//设备管理 故障设备列表
export function getFaultDeviceList(data) {
  return request({
    url: `/api/water/device/getFaultDeviceList`,
    method: 'post',
    data
  })
}

//设备管理 dma列表
export function getDeviceDmalist() {
  return request({
    url:`/api/water/device/dma/list`,
    method: 'post',
  })
}


//告警管理 告警统计
export function alarmCount(data) {
  return request({
    url: `/api/water/alarm/alarmCount`,
    method: 'post',
    data
  })
}

//告警管理 漏损报警列表
export function leakageRecord(data) {
  return request({
    url: `/api/water/alarm/leakageRecord`,
    method: 'post',
    data
  })
}

//告警管理 设备报警列表
export function alarmRecord(data) {
  return request({
    url: `/api/water/alarm/alarmRecord`,
    method: 'post',
    data
  })
}

//告警管理 忽略接口
export function alarmDelete(data) {
  return request({
    url: `/api/water/alarm/alarmDelete`,
    method: 'post',
    data
  })
}


//用户管理 用户信息页面
export function userData(data) {
  return request({
    url: `/wudi/user/data`,
    method: 'post',
    data
  })
}

//用户管理 重置密码
export function resetPassword(data) {
  return request({
    url: `/wudi/user/resetPassword`,
    method: 'post',
    data
  })
}

//用户管理 删除
export function deletes(data) {
  return request({
    url: `/wudi/user/delete`,
    method: 'post',
    data
  })
}

//用户管理 角色列表
export function getRoleList(data) {
  return request({
    url: `/wudi/user/getRoleList`,
    method: 'post',
    data
  })
}

//用户管理 职务列表
export function getJobList(data) {
  return request({
    url: `/wudi/user/getJobList`,
    method: 'post',
    data
  })
}

//用户管理 新增用户
export function add(data) {
  return request({
    url: `/wudi/user/add`,
    method: 'post',
    data
  })
}

//用户管理 修改密码
export function changePassword(data) {
  return request({
    url: `/wudi/user/changePassword`,
    method: 'post',
    data
  })
}

//个人中心
export function detail(data) {
  return request({
    url: `/wudi/user/detail`,
    method: 'post',
    data
  })
}

//权限管理 列表
export function getRoleLists(data) {
  return request({
    url: `/wudi/role/getRoleList`,
    method: 'post',
    data
  })
}

//权限管理 删除
export function roledeletes(data) {
  return request({
    url: `/wudi/role/delete`,
    method: 'post',
    data
  })
}

//权限管理 查看 模块表
export function modules(data) {
  return request({
    url: `/wudi/role/modules`,
    method: 'post',
    data
  })
}

//权限管理 获取 具体权限
export function getRoleAuth(data) {
  return request({
    url: `/wudi/role/getRoleAuth`,
    method: 'post',
    data
  })
}

//权限管理 获取 所有权限
export function allAuth(data) {
  return request({
    url: `/wudi/role/allAuth`,
    method: 'post',
    data
  })
}

//权限管理 获取 所有权限
export function adds(data) {
  return request({
    url: `/wudi/role/add`,
    method: 'post',
    data
  })
}

// 未处理报警总数
export function countOfAlarm(data) {
  return request({
    url: `/api/water/alarm/countOfAlarm`,
    method: 'post',
    data
  })
}
// 工单列表
export function jobList(data) {
  return request({
    url: `/api/water/job/jobList`,
    method: 'post',
    data
  })
}
//DMA小区列表
export function dmaList() {
  return request({
    url:`/dma/getDmaAll`,
    method: 'post'
  })
}

//DMA小区列表上移
export function moveUp(data) {
  return request({
    url:`/dma/moveUp`,
    method: 'post',
    data
  })
}

//DMA小区列表下移
export function moveDown(data) {
  return request({
    url:`/dma/moveDown`,
    method: 'post',
    data
  })
}

//DMA小区列表删除
export function delDma(data) {
  return request({
    url:`/dma/delete`,
    method: 'post',
    data
  })
}

//DMA小区列表新增
export function addDma(data) {
  return request({
    url:`/dma/add`,
    method: 'post',
    data
  })
}

//DMA小区列表编辑
export function updateDma(data) {
  return request({
    url:`/dma/update`,
    method: 'post',
    data
  })
}

//DMA小区列表详情
export function dmaDetails(data) {
  return request({
    url:`/dma/getOne`,
    method: 'post',
    data
  })
}

//阈值列表
export function thresholdList(data) {
  return request({
    url:`/dma/threshold/listByType`,
    method: 'post',
    data
  })
}

//阈值编辑
export function thresholdEdit(data) {
  return request({
    url:`/dma/threshold/update`,
    method: 'post',
    data
  })
}

//阈值列表DMA
export function thresholdListByDma(data) {
  return request({
    url:`/dma/threshold/listByDmaId`,
    method: 'post',
    data
  })
}

//阈值时间段查询
export function thresholdTimePick() {
  return request({
    url:`/dma/threshold/time/get`,
    method: 'post',
  })
}

//阈值时间段修改
export function thresholdTimeEdit(data) {
  return request({
    url:`/dma/threshold/time/update`,
    method: 'post',
    data
  })
}

//阈值 dma列表
export function getDmalist() {
  return request({
    url:`/dma/threshold/dma/list`,
    method: 'post',
  })
}

//fx67ll/线上地址需要多加一个dma/产销差排行榜
export function getDmaShitlist(data) {
  return request({
    url:`/dma/nrw/rankingList`,
    method: 'post',
	data
  })
}

//免费损耗水量 dma树型列表
export function freeDmalist() {
  return request({
    url:`/dma/leakage/dma/list`,
    method: 'post',
  })
}


//免费损耗水量 类型列表
export function freeTypelist() {
  return request({
    url:`/dma/leakage/type/list`,
    method: 'post',
  })
}

//免费损耗水量 查询列表
export function freelist(data) {
  return request({
    url:`/dma/leakage/free/list`,
    method: 'post',
    data
  })
}

//免费损耗水量 新增
export function addFree(data) {
  return request({
    url:`/dma/leakage/free/add`,
    method: 'post',
    data
  })
}


//免费损耗水量 删除
export function delFree(data) {
  return request({
    url:`/dma/leakage/free/delete`,
    method: 'post',
    data
  })
}

//免费损耗水量 修改
export function updateFree(data) {
  return request({
    url:`/dma/leakage/free/update`,
    method: 'post',
    data
  })
}

//漏损量计算 列表
export function ullagelist(data) {
  return request({
    url:`/dma/leakage/calc/list`,
    method: 'post',
    data
  })
}

//产销差分析 列表
export function prodSalesList(data) {
  return request({
    url:`/dma/nrw/analysis`,
    method:'post',
    data
  })
}

//产销差 echarts图表
export function lKchartData(data) {
  return request({
    url:`/dma/nrw/leakChart`,
    method:'post',
    data
  })
}

//分区漏损 查询列表
export function zoneLKList(data) {
  return request ({
    url:`/dma/leakage/zone/record`,
    method:'post',
    data
  })
}

//分区漏损 图表数据
export function zoneLKChart(data) {
  return request ({
    url:`/dma/leakage/zone/chart`,
    method:'post',
    data
  })
}

//数据字典 type列表
export function dictTypeList(data) {
  return request({
    url:`/api/water/sys/dict/type/list`,
    method:'post',
    data
  })
}

//数据字典 列表
export function dictList(data) {
  return request({
    url:`/api/water/sys/dict/list`,
    method:'post',
    data
  })
}

//数据字典 新增
export function addDict(data) {
  return request({
    url:`/api/water/sys/dict/add`,
    method:'post',
    data
  })
}

//数据字典  修改
export function updateDict(data) {
  return request({
    url:`/api/water/sys/dict/update`,
    method:'post',
    data
  })
}

//数据字典 删除
export function delDict(data) {
  return request({
    url:`/api/water/sys/dict/delete`,
    method:'post',
    data
  })
}

//总览-DMA分区树
export function HomeTreeData() {
  return request({
    url: `/overview/dma/list`,
    method: 'post'
  })
}

//总览-日均管网压力图表
export function pipeChart(data) {
  return request({
    url: `/overview/chart/press`,
    method: 'post',
    data
  })
}

//总览-夜间最小流量图表
export function minFlowChart(data) {
  return request({
    url: `/overview/chart/flow`,
    method: 'post',
    data
  })
}

//总览-大用户图表
export function largeUserChart(data) {
  return request({
    url: `/overview/chart/flow`,
    method: 'post',
    data
  })
}

//总览-产销差率图表
export function nrwChart(data) {
  return request({
    url: `/overview/chart/nrw`,
    method: 'post',
    data
  })
}

//总览-供售水量图表
export function saleChart(data) {
  return request({
    url: `/overview/chart/sale`,
    method: 'post',
    data
  })
}

//总览-漏损量排名图表
export function leakageChart(data) {
  return request({
    url: `/overview/chart/leak`,
    method: 'post',
    data
  })
}

//总览-大用户图表
export function UserChart(data) {
  return request({
    url: `/overview/chart/water`,
    method: 'post',
    data
  })
}

//总览-DMA分区显示
export function overViewDMAData() {
  return request({
    url:`/overview/dma/map`,
    method:'post'
  })
}

//总览-DMA分区提示
export function overViewDMATips(data) {
  return request({
    url:`/overview/chart/tips`,
    method:'post',
    data
  })
}

//最小夜间流量-图表
export function getMinListP(data) {
  return request({
    url:`/dma/minFlow/chart`,
    method:'POST',
    data
  })
}

//最小夜间流量-树形菜单
export function getMinListT() {
  return request({
    url:`/dma/minFlow/dma/list`,
    method:'POST'
  })
}


//DMA阈值颜色联动
export function getColorConfig() {
  return request({
    url:`/dma/nrw/thresholdList`,
    method:'POST'
  })
}

//总览 告警列表
export function getAlarmList() {
  return request({
    url:`/overview/alarm/list`,
    method:'get'
  })
}

//总览  告警忽略
export function ignoreAlarm(data) {
  return request({
    url:`/overview/alarm/ignore`,
    method:'POST',
    data
  })
}

//总览 Dma小区获取行政编码
export function dmaAreaList() {
  return request({
    url:`/dma/dmaAreas`,
    method:'get'
  })
}

//总览 Dma小区获取二级区域
export function dmaSecond() {
  return request({
    url:`/dma/dmaSecond`,
    method:'get'
  })
}

//dma小区  行政编码列表
export function areaList() {
  return request({
    url:`/dma/areaList`,
    method:'get'
  })
}

//dma分区 漏损曲线对比
export function getUllageCurve(data) {
  return request({
    url:`/dma/leakage/compare`,
    method:'POST',
    data
  })
}

//报表分析 设备树
export function getDeviceTree(data) {
  return request({
    url:`/report/dataReport/getDevices`,
    method:'post',
    data
  })
}

//报表分析 设备数据报表列表
export function getDataReport(data) {
  return request({
    url:`/report/dataReport/listMultiple`,
    method:'post',
    data
  })
}

//报表分析 设备数据报表列表
export function getDataAnalysis(data) {
  return request({
    url:`/report/dataAnalysis/listMultiple`,
    method:'post',
    data
  })
}

//报表分析 设备数据曲线
export function getDataCurve(data) {
  return request({
    url: `/report/dataCurve/chart`,
    method:'post',
    data
  })
}

//DMA拓扑图 树
export function getTopologyTree(){
  return request({
    url:`/report/topology/dma`,
    method:'post'
  })
}

//DMA拓扑图 
export function getTopologyData(data) {
  return request({
    url:`/report/topology/chart`,
    method:'post',
    data
  })
}

//设备自定义参数 设备类型
export function deviceType() {
  return request({
    url:`/api/water/deviceParam/type/list`,
    method:'get'
  })
}

//设备自定义参数 设备参数列表
export function deviceParamList(data) {
  return request({
    url:`/api/water/deviceParam/list`,
    method:'post',
    data
  })
}

//设备自定义参数 新增设备参数
export function addDeviceParam(data) {
  return request({
    url:`/api/water/deviceParam/add`,
    method:'post',
    data
  })
}

//设备自定义参数 编辑设备参数
export function editDeviceParam(data) {
  return request({
    url:`/api/water/deviceParam/edit`,
    method:'post',
    data
  })
}

//设备自定义参数 删除设备参数
export function delDeviceParam(data) {
  return request({
    url:`/api/water/deviceParam/delete`,
    method:'post',
    data
  })
}

//泵站管理 列表
export function pumpStationList(data) {
  return request({
    url:`/api/water/pumpStation/list`,
    method:'post',
    data
  })
}

//泵站管理 dma小区列表
export function pumpDmaList() {
  return request({
    url:`/api/water/pumpStation/dma/list`,
    method:'post'
  })
}

//泵站管理 水厂列表
export function waterWorksList() {
  return request({
    url:`/api/water/pumpStation/water/list`,
    method:'post'
  })
}

//泵站管理 新增泵站
export function addPumpStation(data) {
  return request({
    url:`/api/water/pumpStation/add`,
    method:'post',
    data
  })
}

//泵站管理 删除泵站
export function delPumpStation(data) {
  return request({
    url:`/api/water/pumpStation/delete`,
    method:'post',
    data
  })
}

//泵站管理 泵站详情
export function PumpStationDetail(data) {
  return request({
    url:`/api/water/pumpStation/detail`,
    method:'post',
    data
  })
}

//泵站管理 编辑泵站
export function editPumpStation(data) {
  return request({
    url:`/api/water/pumpStation/edit`,
    method:'post',
    data
  })
}

//泵站管理 取消关联
export function cancelAssociated (data){
  return request({
    url:`/api/water/pumpStation/cancelLink`,
    method:'post',
    data
  })
}

//泵站管理 新增设备 设备类型
export function pumpDeviceType (){
  return request({
    url:`/api/water/pumpDevice/type/list`,
    method:'get'
  })
}

//泵站管理 新增设备 泵站列表
export function pumpDeviceStations() {
  return request({
    url:`/api/water/pumpDevice/station/list`,
    method:'get'
  })
}

//泵站管理 新增设备 设备参数列表
export function pumpDeviceParams(data) {
  return request({
    url:`/api/water/pumpDevice/param/list`,
    method:'post',
    data
  })
}

//泵站管理 新增设备 新增
export function addPumpdevice(data) {
  return request({
    url:'/api/water/pumpDevice/add',
    method:'post',
    data
  })
}

//泵站管理 设备详情
export function pumpDeviceDetails(data) {
  return request({
    url:'/api/water/pumpDevice/detail',
    method:'post',
    data
  })
}

//泵站管理 编辑设备
export function editPumpDevice(data) {
  return request({
    url:'/api/water/pumpDevice/edit',
    method:'post',
    data
  })
}

//泵站管理 检修记录
export function repairList(data) {
  return request({
    url:'/api/water/pumpDevice/repair/list',
    method:'post',
    data
  })
}

//泵站管理 管线地图
export function pumpPipe(){
  return request({
    url:'/api/water/pumpStation/pipe/map',
    method:'get'
  })
}

//大屏 切换漏损状态
export function changeRepair(data) {
  return request({
      url:'/api/water/overview/job/repair',
      method:'post',
      data
  })
}

//大屏 切换漏损状态
export function restRepair(data) {
  return request({
      url:'/api/water/overview/job/reset',
      method:'post',
      data
  })
}