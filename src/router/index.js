import Vue from 'vue'
import VueRouter from 'vue-router'
import popUp from '@/common/pop-up-settings/pop-up-settings'
import store from '@/store/index'

// 中途跳转报错解决 重写跳转函数 使用catch处理错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

//引入home内页面路由文件
import homeInside from '@/router/home-inside/index'
//引入user-trade内页面路由文件
import userTradeInside from '@/router/user-trade-inside/index'
//引入admin-page内页面路由文件
import adminInside from '@/router/admin-inside/index'

const routes = [
    {
        path: '/',
        name: 'default',
        redirect: '/get-start'
    },
    {
        path: '/get-start',
        name: 'get-start',
        component: () => import('@/pages/get-start/get-start.vue'),
        meta: {
            keepAlive: false, requireAuth: false
        }
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/homepage',
        component: () => import('@/pages/internal-page/home.vue'),
        children: [...homeInside]
    },
    {   
        path: '/user-trade',
        name: 'user-trade',
        redirect: '/user-trade/power-buy',
        component: () => import('@/pages/external-page/user-trade/user-trade.vue'),
        children: [...userTradeInside],
        meta: {
            keepAlive: false, requireAuth: true
        }

    },
    {
        path: '/login-and-register',
        name: 'login-and-register',
        component: () => import('@/pages/external-page/login-and-register/login-and-register.vue'),
        meta: {
            keepAlive: false, requireAuth: false
        }
    },
    {
        path: '/admin-page',
        name: 'admin-page',
        redirect: '/admin-page/report-handle',
        component: () => import('@/pages/external-page/admin-page/admin-page.vue'),
        children: [...adminInside],
        meta: {
            keepAlive: false, requireAuth: true, requireAdmin: true
        }
    },
    {
        path: '*',
        redirect: '/404',
        meta: {
            keepAlive: false, requireAuth: false
        }
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {

    if(to.meta.requireAuth){
        let token = localStorage.getItem('token')
        if(token === null || token === '' || !store.state.userPrivilege.loginStatus){
            popUp.install().popMsgOnlyConfirm('请在登录后查看！') //trading-floor.vue中特殊，已经提前判断
            next('/login-and-register')
        }else if(to.meta.requireAdmin && !store.state.userPrivilege.adminUser){
            popUp.install().popMsgOnlyConfirm('请以管理员身份登录后查看！')
            next(false)
        }else {
            next()
        }
    }else next()

})
router.afterEach((to, from, next) => {
    // next()
    document.body.scrollTop = 0
})
  
export default router
