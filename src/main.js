import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/styles/init.scss'
import VueAMap from 'vue-amap';
import App from './App'
import store from './store'
import router from './router'
import echarts from 'echarts'
import '@/icons' // icon
import '@/permission' // permission control
import VueCron from 'vue-cron'
import 'jquery'
import * as d3 from "d3";

// 在vue原型上绑定d3

Vue.prototype.$d3 = d3;

window.d3 = d3;   //暂时设置为全局变量
Vue.use(VueCron);
Vue.use(VueAMap);
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.config.productionTip = false

AMap.plugin(["AMap.MouseTool"], function () {
  mouseTool = new AMap.MouseTool(map);
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
