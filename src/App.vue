<template>
  <div id="app" class="clearfix" v-if="isRouterAlive">
    <TopMenu :key="randomKey" />
    <div class="app-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
// 引入顶部导航栏
import TopMenu from '@/components/page-frame/top-menu.vue';

export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    // 在切换路由时，实时保证TopMenu刷新
    randomKey (){
      return this.$route.path + Math.random();
    }
  },
  components: {
    TopMenu,
  },
  methods: {
    reload() { //当store发生变化时，刷新页面
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'margin: 0')
  },
  mounted() {
    window.addEventListener("storage",StorageEvent => {
      // console.log("storeEvent", StorageEvent)
      if(StorageEvent.key === "store"){
        // location.reload() //当vuex中状态改变，则更新页面
      }
    })
  },

}
</script>

<style>
  #app {
    min-height: calc(100vh);
    width: 100%;
  }
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
  .app-body {
    margin-top: 58px;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
  
</style>