<template>
    <div class="sidebar">
        <!-- 搜索框 -->
        <div class="search-bar">
            <div class="search-wrapper">
                <input  type="search" placeholder="搜索..." 
                @keyup.enter="goSearching"
                v-model="searchInfo">
            </div>
        </div>

        <button class="btn btn-style hover-slide-right" @click="toHome">
            <span>信息披露</span>
        </button>
        <button class="btn btn-style hover-slide-right" @click="toTrading">
            <span>交易大厅</span>
        </button>
        <button class="btn btn-style hover-slide-right" @click="toSearch">
            <span>搜索发现</span>
        </button>
        <button class="btn btn-style hover-slide-right" @click="toHelp">
            <span>帮助</span>
        </button>
    </div>
</template>

<script>

export default{
    name: 'sidebar',
    data() {
        return {
            toggleIndex: 0,
            searchInfo: "",
        }
    },
    methods: {

        toHome(){
            this.$router.push({
                name: 'home'
            })
        },
        toTrading(){
            this.$router.push({
                name: 'trading-floor'
            })
        },
        toSearch(){
          this.$router.push({
            name: 'search-discover'
          })
        },
        toHelp(){
          this.$router.push({
            name: 'help'
          })
        },
        async goSearching(){
          if(this.searchInfo == ''){
            alert('亲，您还没有输入任何内容~')
          }else {
            await this.$router.push({
              name: 'search-discover',
            })
            this.$bus.$emit('update-search', this.searchInfo) //由于search-discover页有缓存，因此需要通知更新
            this.searchInfo = ""
          }
        }
    },
}
</script>

<style lang="scss" scoped>

.sidebar {
    font-family: 'Roboto', sans-serif;
    height: 90%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    // background-color: #fff ;
    border-radius: 4rem;
}
/* search-style */
 .search-wrapper input {
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    top: 0; left: 0;
    width: 100%;
    padding: 10px 10px;

    border: none;
    background: transparent;
    outline: none;

    transition: 0.3s;
 }
.search-wrapper input:focus {
    border-radius: 4rem;
    border-bottom: 3px solid grey;
}

// btn-style-variables
$font-changed-color: #fff;
$border-radius: 30px;

* {
  box-sizing: border-box;
  margin: 0; padding: 0;
}
:active, :hover, :focus {
  outline: 0!important;
  outline-offset: 0;
}
::before,
::after {
  position: absolute;
  content: "";
}
/* 按钮样式 */
.btn {
  position: relative;
  display: inline-block;
  width: auto; height: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0px 25px 15px;
  min-width: 150px;
  display: flex;
  justify-content: center;
}
  .btn span {         
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    top: 0; left: 0;
    width: 100%;
    padding: 15px 20px;
    transition: 0.3s;
  }

/*--- btn-style ---*/
.btn-style::before {
  background-color: $theme-color;
  transition: 0.3s ease-out;
}
.btn-style span {
  color: $theme-color;
  border: 2px solid $theme-color;
  border-radius: $border-radius;
  transition: 0.2s;
}  
.btn-style span:hover {
  color: $font-changed-color;
  transition: 0.2s 0.1s;
}

/* hover-slide-right */
.btn.hover-slide-right::before{
  top: 0; bottom: 0; left: 0; 
  height: 100%; width: 0%;
  border-radius: $border-radius;
}
.btn.hover-slide-right:hover::before {
  width: 100%;
}


</style>