<template>
    <div class="login-and-register">
        <!-- <div class="top-menu-self">
            <div class="title">登录 / 注册</div>
        </div> -->
        <div class="main-wrapper">
            <LARIMain/>
        </div>
        <div class="footer-wrapper">
            <LARIFooter/>
        </div>
    </div>
</template>

<script>
import LARIMain from '@/components/login-and-register-items/LARI-main.vue'
import LARIFooter from '@/components/login-and-register-items/LARI-footer.vue'

export default {
    name: 'login-and-register',
    data() {
        return {
            
        }
    },
    components: { LARIMain, LARIFooter },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
    .top-menu-self {
        width: 100%;
        height: 58px;
        overflow: hidden;
        background: $theme-color;

        display: flex;
        align-items: center;
        padding-left: 20px;
    }
    .title {
        color: #fff;
        font-weight: bolder;
        letter-spacing: 1px;
    }
    .main-wrapper {
        height: calc(90vh - 58px);
        width: 100%;
    }
    .footer-wrapper {
        width: 100%;
        // height: calc(20vh);
        overflow: hidden;
    }
</style>