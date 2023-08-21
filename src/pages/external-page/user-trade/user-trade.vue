<template>
  <div class="user-trade">
    <div class="user-sidebar-wrapper clearfix">
      <aside class="user-sidebar">
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
          <div class="windmill">
            <div class="tower">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              width="60%" viewBox="0 0 108 73" enable-background="new 0 0 108 73" xml:space="preserve">
                <ellipse opacity="0.05" cx="54" cy="68.333" rx="53.666" ry="4.5"/>
                <rect x="47.603" y="33.157" fill="#F2444D" width="17.62" height="26.43"/>
                <polygon fill="#DDDAD0" points="56.412,0.914 68.844,15.786 81.274,30.659 56.412,30.659 31.551,30.659 43.981,15.786 "/>
                <polygon fill="#F2444D" points="76.587,59.587 65.135,59.587 65.135,33.157 76.587,37.563 "/>
                <polygon fill="#F2444D" points="36.238,59.587 47.691,59.587 47.691,33.157 36.238,37.563 "/>
                <polygon opacity="0.6" fill="#BEC4B4" points="76.676,59.587 65.223,59.587 65.223,33.157 76.676,37.563 "/>
                <polygon opacity="0.6" fill="#BEC4B4" points="36.15,59.587 47.603,59.587 47.603,33.157 36.15,37.563 "/>
                <polygon fill="#F2444D" points="81.961,37.532 67.521,37.532 67.521,24.202 81.961,29.756 "/>
                <rect x="45.304" y="24.202" fill="#F2444D" width="22.217" height="13.33"/>
                <path fill="#F2444D" d="M28.221,70.158l2.343-9.6c0.105-1.019,0.975-1.853,1.932-1.853h47.833c0.956,0,1.826,0.834,1.932,1.853
                  l2.343,9.6H28.221z"/>
                <polygon fill="#F2444D" points="30.864,37.532 45.304,37.532 45.304,24.202 30.864,29.756 "/>
                <polygon opacity="0.6" fill="#BEC4B4" points="81.961,37.18 67.521,37.18 67.521,23.849 81.961,29.404 "/>
                <polygon opacity="0.6" fill="#BEC4B4" points="30.864,37.18 45.304,37.18 45.304,23.849 30.864,29.404 "/>
                <path opacity="0.6" fill="#BEC4B4" d="M81.961,37.122c0,0.729-11.439,0.44-25.549,0.44s-25.548,0.289-25.548-0.44
                  S42.303,35.8,56.412,35.8S81.961,36.393,81.961,37.122z"/>
                <path opacity="0.8" fill="#191717" d="M53.28,70.012v-6.561c0-1.729,1.38-3.131,3.083-3.131l0,0c1.703,0,3.084,1.402,3.084,3.131
                  v6.561H53.28z"/>
                <circle fill="#FFFFFF" cx="55.923" cy="30.691" r="2.643"/>
              </svg>
            </div>
            <div class="blades">
              <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              width="50%" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
                <g>
                  <g>
                    <g>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="63.361" y1="8.281" x2="35.328" y2="36.314"/>
                      
                        <rect x="45.723" y="3.454" transform="matrix(0.7071 0.7071 -0.7071 0.7071 28.7982 -31.7865)" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" width="14.097" height="30.835"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="55.885" y1="6.412" x2="65.23" y2="15.757"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="52.77" y1="9.526" x2="62.115" y2="18.871"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="49.656" y1="12.642" x2="59" y2="21.986"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="46.541" y1="15.757" x2="55.885" y2="25.1"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="43.426" y1="18.871" x2="52.77" y2="28.215"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="40.311" y1="21.986" x2="49.656" y2="31.33"/>
                    </g>
                    <g>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="7.294" y1="64.341" x2="35.328" y2="36.314"/>
                      <polygon fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="23.803,37.871 33.771,47.833 11.967,69.637 2,59.669 			
                        "/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="14.771" y1="66.211" x2="5.426" y2="56.865"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="17.885" y1="63.096" x2="8.541" y2="53.751"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="21" y1="59.98" x2="11.656" y2="50.637"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="24.114" y1="56.865" x2="14.771" y2="47.521"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="27.229" y1="53.751" x2="17.885" y2="44.407"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="30.345" y1="50.637" x2="21" y2="41.297"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="64.607" y1="63.718" x2="36.574" y2="35.691"/>
                      <polygon fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="38.131,47.21 48.1,37.248 69.902,59.047 59.934,69.014 			
                        "/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="66.477" y1="56.242" x2="57.131" y2="65.588"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="63.361" y1="53.128" x2="54.016" y2="62.473"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="60.246" y1="50.014" x2="50.902" y2="59.358"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="57.131" y1="46.898" x2="47.787" y2="56.242"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="54.016" y1="43.784" x2="44.672" y2="53.128"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="50.902" y1="40.674" x2="41.559" y2="50.014"/>
                    </g>
                    <g>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="8.541" y1="7.658" x2="36.574" y2="35.691"/>
                      
                        <rect x="12.083" y="2.831" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.2999 18.8725)" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" width="14.097" height="30.834"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="6.672" y1="15.135" x2="16.017" y2="5.789"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="9.787" y1="18.248" x2="19.131" y2="8.903"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="12.901" y1="21.363" x2="22.246" y2="12.02"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="16.017" y1="24.478" x2="25.361" y2="15.135"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="19.131" y1="27.593" x2="28.475" y2="18.248"/>
                      <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="22.246" y1="30.707" x2="31.59" y2="21.363"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        
      </aside>
    </div>
    <div class="main-display" v-if="loginStatus">
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
  name: "user-trade",
  data() {
    return {
        isActive: 0,
        include: [], //缓存的页面路由
        menuList: [
            { name: "购买电力", pathName: "power-buy" },
            { name: "出售电力", pathName: "power-sell" },
            { name: "买卖明细", pathName: "trade-check" },
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
// 侧边栏底部装饰
.bar-bottom {
  position: absolute;
  width: 100%;
  bottom: 10%;
  .windmill {
    text-align: center;
    position: relative;
    .tower {
      display: inline-block;
    }
    .blades {
      position: absolute;
      width: 100%;
      top: -20%;
      animation: spin-clockwise 1.25s linear infinite;
    }
  }
}
//风车动画
@keyframes spin-clockwise {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.user-trade {
  position: relative;
  background-color: #f7f7f7;
  z-index: 0;
}

.user-sidebar-wrapper {
  position: fixed;
  display: flex; 
  height: 100%;
}

.user-sidebar {
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