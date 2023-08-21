import Vue from 'vue'
import App from './App.vue'

//引入vue-router
import router from '@/router/index'

// 引入vuex
import store from '@/store/index'

//引入boot-strap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//引入font-awesome
import '@fortawesome/fontawesome-free/css/all.css'

//后端地址注册
import axios from '@/common/axios/axios'
Vue.prototype.$http = axios

//全局弹窗组件注册
import popUp from '@/common/pop-up-settings/pop-up-settings'
Vue.prototype.$pop = popUp.install
//交易协商弹窗组件注册
import popTrade from '@/common/pop-up-settings/pop-trade-settings'
Vue.prototype.$popTrade = popTrade.install
//上传购电项目弹窗组件注册
import popSellForm from '@/common/pop-up-settings/pop-sell-form-settings'
Vue.prototype.$popSellForm = popSellForm.install

//引入animate
import 'animate.css';
// 引入echarts
import echarts from '@/common/echarts/echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false //关闭生产提示

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线
  },
  render: h => h(App)
}).$mount('#app')
