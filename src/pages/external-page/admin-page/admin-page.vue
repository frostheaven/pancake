<template>
  <div class="admin-page">
    <div class="admin-sidebar-wrapper clearfix">
      <aside class="admin-sidebar">
        <!-- <div class="bar-title">
          <div class="logo-content">
            <div class="logo"><img src="@/assets/logo/logo-transparent.png"></div>
            <div class="name">电力交易平台</div>
          </div>
        </div> -->
        <nav class="main-nav">
          <ul class="link-wrapper">
            <li v-for="(item,index) in menuList" :key="index" :class="{'active': isActive == index}" @click="handleClick(index)">
                <router-link :to="{ name: item.pathName }"> 
                    {{item.name}} 
                </router-link>
            </li>
          </ul>
        </nav>
        <div class="bar-bottom">
          
        </div>
        
      </aside>
    </div>
    <div class="main-display" v-if="adminUser && loginStatus">
        <!-- 页面缓存显示 -->
      <keep-alive :include="include">
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "admin-page",
  data() {
    return {
        isActive: 0,
        include: [], //缓存的页面路由
        menuList: [
            { name: "举报处理", pathName: "report-handle" },
            { name: "注册审核", pathName: "register-approval"},
        ], 
    }
  },
  watch: {
    $route(to, from) {
      this.getUrl()  //根据路由变化改变侧边栏高亮
      if(to.meta.keepAlive) { //路由缓存数组处理
        !this.include.includes(to.name) && this.include.push(to.name)
      }
    }
  },
  computed: {
    ...mapState({
      adminUser: state => state.userPrivilege.adminUser,
      loginStatus: state => state.userPrivilege.loginStatus
    })
  },
  methods: {
    handleClick(index) {
      this.isActive = index
    },
    getUrl() {
      let pathName = this.$route.name;  // 当前路径名称
      let index = this.menuList.findIndex(item => item.pathName === pathName);  // 查找当前路由下的下标
      this.isActive = index;
    }
  },
  created() {
    this.getUrl()
  },
};
</script>

<style lang="scss" scoped>

$sidebarColor: $theme-color;
$font-color: #fff;

* { box-sizing: border-box; }

body { font-family: 'Open Sans', sans-serif; }

a {
  text-decoration: none; 
}


.admin-page {
  position: relative;
  background-color: #f7f7f7;
  z-index: 0;
}

.admin-sidebar-wrapper {
  position: fixed;
  display: flex; 
  height: 100%;
}

.admin-sidebar {
  width: 250px;
  min-height: calc(100vh);
  background: $sidebarColor;
  order: 1;
  flex-flow: column;
  color: #fff;
  position: relative;

  .bar-title {
    width: 100%;
    height: 6rem;
    .logo-content {
      width: 100%;
      height: 100%;
      display: flex;
      .logo {
        width: 4rem;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 5%;
        img{
          height: 4rem;
        }
      }
      .name {
        cursor: default;
        width: calc(100% - 4rem);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        letter-spacing: 0.3rem;
      }
    }
  }
  .main-nav {
    padding-top: 15%;
    width: 100%;
    height: 100%;
    > ul {
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      > li {
        cursor: pointer;
        height: 15%;
        width: 100%;
        display: flex;
        align-items: center;
        transition: background-color .3s ease;
        &.active, &:hover {
          background: lighten($sidebarColor,15%);
        }
        > a {
          padding: 20px 30px;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          color: $font-color;
          font-weight: bold;
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,.3);
        }
      }
    }
  }
  
}
.main-display {
    width: 100%;
    padding-left: 250px;
    min-height: calc(100vh);
}
</style>