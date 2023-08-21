import axios from 'axios'
import Vue from 'vue'
import Loading from '@/components/loading/loading.vue'
import popUp from '@/common/pop-up-settings/pop-up-settings.js'
import router from '@/router/index.js'
import qs from 'qs'

const instance = axios.create({
    baseURL: '/api'
})

//loading过渡动画设置
let loadingInstance = null
    
instance.interceptors.request.use(config => {
    //Loading组件加载
    if(!loadingInstance) {
        const loadingComponent = Vue.extend(Loading)
        loadingInstance = new loadingComponent({
            el: document.createElement('div')
        })
        if(document.querySelector('.home-display')){
            let homeDisplay = document.querySelector('.home-display')
            homeDisplay.appendChild(loadingInstance.$el)
        }else
            document.body.appendChild(loadingInstance.$el)
    }
    // 获取本地token
    const token = localStorage.getItem('token')
    token?config.headers.token = token : null; //后端token API name: 'token'

    return config
  }, error => {
    return Promise.reject(error)
  })

instance.interceptors.response.use(response => {
    //移除Loading组件
    if(loadingInstance){
        loadingInstance.$destroy()
        loadingInstance.$el.remove()
        loadingInstance = null
    }
    return response
  }, error => {
    //移除Loading组件
    if(loadingInstance){
        loadingInstance.$destroy()
        loadingInstance.$el.remove()
        loadingInstance = null
    }
    //如果缺少token或token无效，则需要（重新）登录
    if(error.response && error.response.data.status == '1') {
      popUp.install().popMsg("用户身份过期，请重新登录！")
      router.push({
        name: 'login-and-register'
      })
    }
    return Promise.reject(error)
  })
  

export default instance