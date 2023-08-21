<template>
    <div class="power-sell">
        <div class="title-wrapper">
            <div class="title-content">
                <div class="title flex">
                    <div class="title-inside flex">
                        <div class="power-remain-title">
                            可交易电量
                        </div>
                        <div class="power-remain">
                            3,000,000 •KWH
                        </div>
                    </div>
                    <div class="title-bottom-wrapper">
                        <!-- 底部波浪 -->
                        <div class="title-bottom">
                            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                            <defs>
                                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                            </defs>
                            <g class="parallax">
                                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                            </g>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="main-display-wrapper">
            <div class="fast-sell-wrapper display-grid">
                <div class="fast-sell-content grid-content">
                    <div class="fast-sell-title grid-title">快速出售</div>
                    <div class="info-content">
                        <div class="current-power current-content">当前余量： <span>3,000,000</span></div>
                        <div class="fast-sell-content inside-content">
                            <!-- <div class="fast-sell-input inside-input"><input type="text" placeholder="（•KWH）"></div> -->
                            <div class="fast-sell-btn"><button @click="quickSell">出售</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="day-info-wrapper display-grid">
                <div class="day-info-content grid-content">
                    <div class="day-info-title grid-title">今日待办</div>
                    <div class="info-content">
                        <div class="current-price current-content">待售项目： <span>25</span></div>
                        <div class="current-price current-content">已售项目： <span>67</span></div>
                    </div>
                </div>
            </div>
            <div class="cumulated-trade-wrapper display-grid">
                <div class="cumulated-trade-content grid-content">
                    <div class="cumulated-trade-title grid-title">
                        累计交易量
                    </div>
                    <div class="info-content">
                        <div class="info">123,456,000</div>
                    </div>
                </div>
            </div>
            <div class="cumulated-income-wrapper display-grid">
                <div class="cumulated-income-content grid-content">
                    <div class="cumulated-income-title grid-title">
                        累计收益
                    </div>
                    <div class="info-content">
                        <div class="info">987,654,000</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'power-sell',
    data() {
        return {
            
        }
    },
    methods: {
        async quickSell() {
            //以下函数在pop-sell-form-settings.js与pop-sell-form.vue中调用
          this.$popSellForm().popCreateSellForm()
          await this.$bus.$on('popConfirmSell', sellInfo => {
              this.$store.dispatch('powerSell', sellInfo)
          })
        },
        
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
$font-color: #696969;
button {
    border: none;
    color: $font-color;
}
input {
    color: $font-color;
    outline: none;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
    width: 100%;
    height: calc(40vh);
    position: relative;
    background-color: $theme-color;
    .title-inside {
        height: 60%;
        width: 60%;
        background-image: linear-gradient(#fff 60%, lighten($theme-color, 30) 95%, transparent);
        border-radius: 2rem;
        position: absolute;
        flex-direction: column;
        z-index: 0;
        .power-remain-title {
            color: $font-color;
        }
        .power-remain {
            font-weight: 1000;
            font-size: 2rem;
            text-shadow: 1px 5px 3px gray;
        }
    }
    .title-bottom-wrapper {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}

.title-bottom {
  position:relative;
  text-align:center;
  background: transparent; //设置背景透明
  color:#fff;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  padding-bottom:-7px; //浏览器间隙
  min-height:100px;
  max-height:150px;
  z-index: 1;
}

.main-display-wrapper {
    margin-top: 7%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .display-grid {
        width: 40%;
        margin-bottom: 5%;
        height: 8rem;
        padding: 1rem;
        // background-color: #fff;
        background-image: linear-gradient(45deg, #fff,  #fff);
        border-radius: 1rem;
        border-bottom: 0.4rem solid $theme-color;
        box-shadow: -6px 3px 5px $theme-color;
        .grid-content {
            height: 100%;
            width: 100%;
            .grid-title {
                color: $font-color;
                padding: 0.2rem;
                height: 20%;
                &::before {
                    display: block;
                    margin: -20px 0 9px -16px;
                    width: 70%;
                    height: 15px;
                    content: '';
                    border-top-left-radius: 2rem;
                    // border-bottom-left-radius: 2rem;
                    background-image: linear-gradient(90deg, $theme-color, #fff);
                }
            }
            .info-content {
                display: flex;
                justify-content: space-around;
                height: 80%;
                align-items: center;
                .info {
                    color: orange;
                    font-weight: bold;
                    font-size: 1.5rem;
                }
            }
        }
    }
}
.info-content {
    .inside-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 20%;
        .inside-input {
            display: flex;
            justify-content: center;
            input{
                padding: 0.4rem;
                width: 70%;
                border-radius: 2rem;
                border: 1px solid $font-color;
                transition: 0.2s ease;
                &:focus {
                    border: 3px solid $font-color;
                    border-left: 2px solid $font-color;
                    border-top: 1px solid $font-color;
                }
            }
        }
        button {
            background-color: $theme-color;
            color: #fff;
            font-weight: 1000;
            font-size: 1rem;
            margin: 0 4px;
            padding: 0.6rem 0.6rem;
            border-radius: 0.6rem;
            transition: 0.3s ease;
            &:hover {
                background-color: $theme-color-dark;
            }
        }
    }
}
.current-content {
    color: $font-color; 
    span{
        color: orange;
        font-size: 1.1rem;
        font-weight: bold;
    }
}
/* 波浪动画 */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}



</style>