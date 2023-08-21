<template>
    <div class="start-screen">
      <!-- 背景、按钮、标题 -->
      <div class="first-part" style="height: calc(100vh);">
        <!-- 标题大字 -->
        <div class="font-box-wrapper">
          <div class="font-box">
            <div class="font-item font-item-1 wow animate__animated animate__fadeInLeft">智幕</div>
            <div class="font-item font-item-2 wow animate__animated animate__fadeInLeft">电力</div>
            <div class="font-item font-item-3 wow animate__animated animate__fadeInLeft">交易</div>
          </div>
        </div>
          <!-- 开始按钮 -->
          <div class='v-align' @click="getStart">
              <div class='hero-btn'>
                  <button class='btn' style="display:flex; align-items: center; justify-content: center;">
                      进 入 
                      <i class="fas fa-arrow-right"></i>
                  </button>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
                  <span class='particles-circle'></span>
              </div>
          </div>
      </div>
      <!-- 贝塞尔曲线 -->
      <div class="custom-shape-divider-bottom-1677745206">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
          </svg>
      </div>
      <!-- 第二部分 -->
      <div class="second-part">
        <div class="image-wrapper wow animate__animated animate__bounceInUp">
          <img src="@/assets/image/start-page-material/handshake.jpg" 
          style="width: 60%; margin: 10% 0 0 10%;
          background-repeat: no-repeat; background-size: cover;"
          >
        </div>
        <div class="font-wrapper wow animate__animated animate__bounceInUp">
          <h2>本月累计交易量已突破</h2>
          <h1><strong style="color: orange;">300,000</strong>笔</h1>
        </div>
      </div>
      <!-- 第三部分 -->
      <div class="third-part">
        <div class="brand section-padding wow animate__animated animate__zoomIn">
          <h2>单日交易峰值达到</h2><br>
          <h1><strong style="color: purple;">9,000,000,000</strong> KWH</h1>
        </div>
        <div class="image-wrapper wow animate__animated animate__bounceInUp">
            <img src="@/assets/image/start-page-material/computer.jpg" 
            style="width: 60%; margin: 10% 0 0 10%;
            background-repeat: no-repeat; background-size: cover;"
            >
        </div>
      </div>
      <!-- 第四部分 -->
      <div class="fourth-part">
        <div class="card-wrapper wow animate__animated animate__fadeInUp">
          <!-- 卡片 -->
          <div class="card" @click="enterLoginAndRegister">
            <div class="face face1">
              <div class="content">
                <img src="@/assets/image/start-page-material/paper-plane.png">
                <h3>加入我们</h3>
              </div>
            </div>
            <div class="face face2">
              <div class="content">
                <p>从这里启航，规划您的交易计划。</p>
              </div>
            </div>
          </div>
          <div class="card" @click="enterTradingFloor">
            <div class="face face1">
              <div class="content">
                <img src="@/assets/image/start-page-material/clap.png">
                <h3>交易撮合</h3>
              </div>
            </div>
            <div class="face face2">
              <div class="content">
                <p>您将平等地拥有议价的权利<br/>从这里进入市场。</p>
              </div>
            </div>
          </div>
          <div class="card" @click="getStart">
            <div class="face face1">
              <div class="content">
                <img src="@/assets/image/start-page-material/chart-icon.png">
                <h3>市场公开</h3>
              </div>
            </div>
            <div class="face face2">
              <div class="content">
                <p>我们提供最新、最完整的市场信息，在这里寻找您感兴趣的内容。</p>
              </div>
            </div>
          </div>
          <div class="card" @click="enterSearchDiscover">
            <div class="face face1">
              <div class="content">
                <img src="@/assets/image/start-page-material/formore.png">
                <h3>了解更多</h3>
              </div>
            </div>
            <div class="face face2">
              <div class="content">
                <p>自由地探索本站，如果您有任何问题，请及时联系我们。</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <!-- 第五部分(脚注) -->
      <div class="fifth-part">
        <div class="info-wrapper">
          <span>欢迎您使用智幕电力交易平台</span>
          <p>©版权所有：智幕电力交易有限公司</p>
        </div>
      </div>
    </div>
</template>

<script>
// 引入wowjs
import { WOW } from 'wowjs'
// 引入按钮样式文件
import '@/pages/get-start/start-btn.scss'

export default {
    name: 'get-start',
    data() {
        return {
            
        }
    },
    methods: {
        //判断某个类是否存在
        hasClass(element, value) {
            var cls = value || '';
            //\s 匹配任何空白字符，包括空格、制表符、换页符等等
            if (cls.replace(/\s/g, '').length == 0) {
                return false;   //当没有参数返回时，返回false
            }
            return new RegExp(' ' + cls + ' ').test(' ' + element.className + ' ');
        },
        removeClass(element, value) {
            if (this.hasClass(element, value)) {
                //\t 匹配一个制表符；\r 匹配一个回车符；\n 匹配一个换行符
                var newClass = ' ' + element.className.replace(/\t\r\n/g, '') + ' ';
                while (newClass.indexOf(' '+ value + ' ') > -1) {
                    newClass = newClass.replace(' ' + value + ' ', ' ');
                }
                element.className = newClass.replace(/^\s+|\s+$/g,'');
            }
        
        },
        //该方法在hasClass()函数已存在的基础上，添加类
        addClass(element, value) {
            if (!this.hasClass(element, value)) {
                element.className = element.className == '' ? value : element.className + ' ' + value;
            }
        },
        getStart(){
          //两个方案择其一
            // 方案一：按钮动画
            // let btnWrapper = document.getElementsByClassName('v-align')[0]
            // if(!this.hasClass(btnWrapper.parentElement, 'active')){
            //     btnWrapper.parentElement["animation-play-state"] = "pause"
            //     this.addClass(btnWrapper.parentElement,"active")
            //     setTimeout(() => {
            //         this.removeClass(btnWrapper.parentElement, "active")
            //         this.enterHome()
            //     }, 2000);
            // }
        
            //方案二：模块滑动动画
            let screenMove = document.getElementsByClassName('start-screen')[0]
            this.addClass(screenMove, 'start-screen-move')
            setTimeout(() => {
              this.enterHome()
            }, 800);
        },
        enterHome() {
          this.$router.replace({
            path: 'home'
          })
        },
        enterTradingFloor() {
          this.$router.push({
            name: 'trading-floor'
          })
        },
        enterSearchDiscover() {
          this.$router.push({
            name: 'search-discover'
          })
        },
        enterLoginAndRegister() {
          this.$router.push({
            name: 'login-and-register'
          })
        }
    },
    created(){
      this.$bus.$emit('requireMenuScroll')
    },
    mounted() {
      this.$nextTick(() => {
        const wow = new WOW({
          boxClass: 'wow', //default
          animateClass: 'animated', //default
          offset: 150, //default
          mobile: true, //default
          live: false, //live为true会报错
          // callback: function(box){
          //   console.log("WOW: animation <" + box.tagName.toLowerCase() + ">")
          // }
        })
        wow.init()
      })
      
    },
    beforeDestroy(){
      this.$bus.$emit('closeMenuScroll')
      this.$bus.$off(['requireMenuScroll','closeMenuScroll'])
    }
}
</script>

<style lang="scss" scoped>

h1, h2, div {
  background-color: transparent;
}
.start-screen {
  margin-top: -58px;
}

// 插图样式
.image-wrapper {
  max-width: 50%;  
  visibility: visible;
  display: flex;
  justify-content: center;
}
.image-wrapper img {
  border: solid transparent 1rem;
  border-radius: 3rem;
  overflow: hidden;
}
//方案一，模块滑动动画
.start-screen-move {
  animation: slide-left 1s ease;
}
@keyframes slide-left {
  from{
    transform: translate(0%, 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}

/* 标题大字 */
.font-box-wrapper {
  position: relative;
  top: 22%;
  left: 5%;
  width: 50%;

  font-weight: bolder;
  font-size: calc(10vh);
  font-style: italic;
  font-family: "Microsoft Yahei", sans-serif;
  color: #f1f1f1;
  letter-spacing: 20px;
}
.font-box {
  width: 100%;
  height: 100%;
  .font-item-1 {
    position: relative;
    left: 5%;
  }
  .font-item-2 {
    position: relative;
    left: 18%;
  }
  .font-item-3 {
    position: relative;
    left: 30%;
  }
}

/* 按钮样式于scripts中引入 */
/* start背景 */
.first-part {
  background: url('@/assets/image/start-bg/start-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

/* 贝塞尔曲线css */
.custom-shape-divider-bottom-1677745206 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1677745206 svg {
    position: relative;
    display: block;
    width: calc(168% + 1.3px);
    height: 189px;
}

.custom-shape-divider-bottom-1677745206 .shape-fill {
    fill: #f1f1f1;
}

/* 第二部分 */
.second-part {
  background: #f1f1f1;
  height: calc(60vh);
  width: 100%;
  .image-wrapper {
    float: left;
  }
}

.font-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* 第三部分 */
.third-part {
  height: calc(60vh);
  display: flex;
  justify-content: center;
  align-items: center;
  .image-wrapper {
    float: right;
  }
}
.third-part h2 {
  letter-spacing: 0.2rem;
  font-weight: bolder;
}
/* 第四部分 */
.fourth-part {
  height: calc(70vh);
  background: #f1f1f1;
}
.card-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}

.card-wrapper .card{
    position: relative;
    cursor: pointer;
    border: none;
}

.card-wrapper .card .face{
    width: 300px;
    height: 200px;
    transition: 0.5s;
}

.card-wrapper .card .face.face1{
    position: relative;
    background: $theme-color-lighter;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
}

.card-wrapper .card:hover .face.face1{
    background: $theme-color-light;
    transform: translateY(0);
}

.card-wrapper .card .face.face1 .content{
    // opacity: 0.2;
    transition: 0.5s;
}

.card-wrapper .card:hover .face.face1 .content{
    opacity: 1;
}

.card-wrapper .card .face.face1 .content img{
    max-width: 100px;
}

.card-wrapper .card .face.face1 .content h3{
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
}

.card-wrapper .card .face.face2{
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
}

.card-wrapper .card:hover .face.face2{
    transform: translateY(0);
}

.card-wrapper .card .face.face2 .content p{
    margin: 0;
    padding: 0;
    font-weight: 1000;
}

.card-wrapper .card .face.face2 .content a:hover{
    background: #333;
    color: #fff;
}

/* 第五部分 */
.fifth-part {
  background: linear-gradient(45deg, $theme-color, $theme-color-light);
  height: calc(30vh);
}
.info-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  font-weight: 1000;
  font-size: 2rem;
  color: #f7f7f7;
}
.info-wrapper p {
  color: #fff;
  font-size: 1rem;
  margin-top: 2rem;
}

</style>