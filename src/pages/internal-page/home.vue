<template>
  <div class="home">
    <div class="sidebar-wrapper">
      <SideBar />
    </div>
    <div class="home-display-wrapper">
      <div class="home-display">
        <!-- 页面缓存显示 -->
        <keep-alive :include="include">
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/page-frame/sidebar.vue'

export default {
    name: 'home',
    components: { SideBar },
    data() {
        return {
            include: []
        }
    },
    watch: {
      $route(to, from) {
        // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
        if (to.meta.keepAlive) {
          !this.include.includes(to.name) && this.include.push(to.name);
        }
      }
    },
    mounted() {
      
    }
}
</script>


<style lang="scss" scoped>
  .home {
    display: flex;
    width: 100%;
    z-index: 0;
    background-color: lighten($theme-color, 30);//#f7f7f7
  }
  .sidebar-wrapper {
    height: calc(100vh - 58px);
    width: 20%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0.5px rgb(201, 201, 201) dashed;
  }
  .home-display-wrapper {
    width: 80%;
    margin-top: calc(5vh);
    margin-left: 20%;
    min-height: calc(100vh - 58px);
    padding-right: 17px;
    overflow-y: scroll;

    display: flex;
    justify-content: center;
  }
  .home-display {
    position: relative;
    height: 100%;
    width: 100%;
    // background-color: #fff;
    border-radius: 4rem;
    padding: 5% 5% 5% 5%;
  }

</style>
