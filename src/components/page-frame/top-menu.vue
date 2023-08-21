<template>
    <div class="top-menu" ref="topMenu">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <!-- logo -->
                <img src="@/assets/logo/logo-transparent.png" alt="" width="30" height="30" class="navbar-logo">
                <div class="navbar-brand">智幕电力交易平台</div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item about-us">
                            <a class="nav-link active" aria-current="page" style="color: #fff">关于我们</a>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> -->
                        <li class="nav-item">
                            <a class="nav-link disabled" tabindex="-1" aria-disabled="true">
                                邮箱：<strong>privacyPreserving@electric.com</strong>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- 登录组件 -->
                <!-- 当前用户已登录，显示欢迎信息，与退出登录按钮 -->
                <div class="user-wel-cover"
                v-if="loginStatus && !($router.currentRoute.name === 'login-and-register')">
                    <div class="user-wel" v-if="adminUser">
                        欢迎，管理员 {{ userName }}
                    </div>
                    <div class="user-wel" v-if="!adminUser">
                        欢迎，用户 {{ userName }}
                    </div>
                    <button @click="checkLogOut" class="log-out-btn">退出</button>
                </div>

                <!-- 用户当前未登录，显示登录按钮 -->
                <div class="login-btn-cover"
                v-if="!loginStatus && !($router.currentRoute.name === 'login-and-register')">
                    <router-link to="/login-and-register" 
                    class="login-btn"
                    style="text-decoration: none; width: 100%; height: 100%;">
                    登录 | 注册
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            menuHeight: 0,
            ifShow: false,
            ifScroll: false,
            requireScroll: false //是否开启滚动隐藏
        }
    },
    computed: {
        ...mapState({
            adminUser: state => state.userPrivilege.adminUser,
            loginStatus: state => state.userPrivilege.loginStatus
        }),
        userName() {
            return this.$store.state.loginAndRegister.loginInfo.account
        },
    },
    methods: {
        ...mapActions(['logOut']),
        async checkLogOut(){
            this.$pop().popMsg('确认退出登录吗？')
            await this.$bus.$on('popConfirm', () => {
                this.logOut()
            })
        },
        async isScroll() {
            const top = document.documentElement.scrollTop
            if (top > 300 && this.requireScroll) {
                await this.addRemoveClass()
                this.ifScroll = true

            } else{
                await this.addEnterClass()
                this.ifScroll = false    
            }
        },
        addEnterClass() {
            if(this.ifScroll && this.requireScroll){
                 document.getElementsByClassName('top-menu')[0].classList.add('normal-slide-in')
                 setTimeout(() => {
                    document.getElementsByClassName('top-menu')[0].classList.remove('normal-slide-out')
                 }, 300);
            }
        },
        addRemoveClass(){
            if(!this.ifScroll && this.requireScroll){
                document.getElementsByClassName('top-menu')[0].classList.add('normal-slide-out')
                setTimeout(() => {
                    document.getElementsByClassName('top-menu')[0].classList.remove('normal-slide-in')
                }, 300);
            }
        }
        
    },
    mounted() {
        window.addEventListener('scroll', this.isScroll)
        this.$bus.$on('requireMenuScroll', () => {
            this.requireScroll = true
        })
        this.$bus.$on('closeMenuScroll', () => {
            this.requireScroll = false
        })
    },
    unmounted () {
        window.removeEventListener('scroll', this.isScroll)
    },
        
}
</script>



<style lang="scss" scoped>
.normal-slide-in {
    transform: translateY(0%);
    transition: 0.3s ease;
}
.normal-slide-out {
    transform: translateY(-100%);
    transition: 0.3s ease;
}

$font-color-default: #fff;
.top-menu{
    position: fixed;
    top: 0;
    width: 100%;
    /* 设置导航栏固定高度 */
    height: 58px; 
    z-index: 999;
}
.navbar {
    background-color: $theme-color;
    height: 100%;
}
.navbar-logo {
    margin-right: 20px;
}
.navbar-brand {
    font-weight: bold;
    letter-spacing: 2px;
    color: $font-color-default;
}
.navbar-brand:hover {
    cursor: pointer;
    color: $font-color-default;
}
.navbar-toggler {
    color: $font-color-default;
}
.nav-item .nav-link {
    color: $font-color-default;
    cursor: pointer;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}
.about-us {
    text-align: center;
    transition: 0.3s ease;
}
.user-wel-cover {
    height: 42px;
    min-width: 15rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .user-wel {
        color: #fff;
        font-weight: 600;
        cursor: default;
    }
    button {
        border: none;
        font-weight: 400;
        background-color: transparent;
        &:hover {
            text-decoration: underline;
            color: $theme-color-dark;
            font-weight: 600;
        }
    }
}
.login-btn-cover {
    box-sizing: border-box;
    background: $theme-color;
    width: 8rem;
    display: flex;
    justify-content: center;
    text-align: center;
    border: 4px solid $font-color-default;
    border-radius: 20px;
    transition-duration: 0.5s;
    &:hover {
        background: $theme-color-dark;
    }
    .login-btn {
        color: $font-color-default;
        padding: 5px 15px 5px 15px;
    }
}

</style>