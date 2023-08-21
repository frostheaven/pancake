<template>
    <div class="LARI-main">
        <div class="section">
            <div class="container">
                <div class="row full-height justify-content-center">
                    <div class="col-12 text-center align-self-center">
                        <div class="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 class="mb-0 pb-3"><span>登录 </span><span>注册</span></h6>
                            <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                            <label for="reg-log"></label>
                            <div class="card-3d-wrap mx-auto">
                                <div class="card-3d-wrapper">
                                  <!-- 用户登录卡片 -->
                                    <div class="card-front">
                                        <div class="center-wrap">
                                            <div class="section text-center">
                                                <h4 class="mb-4 pb-3">用户登录</h4>
                                                <div class="form-group">
                                                    <input name="login-account" id="login-account"
                                                    class="form-style" placeholder="账 号" autocomplete="off"
                                                    v-model="loginInfo.account"  @keyup.enter="loginCheck">
                                                    <i class="input-icon uil uil-at"></i>
                                                </div>	
                                                <div class="form-group mt-2">
                                                    <input type="password" name="login-pass" id="login-pass" 
                                                    class="form-style" placeholder="密 码"  autocomplete="off"
                                                    v-model="loginInfo.pass" @keyup.enter="loginCheck">
                                                    <i class="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <!-- 记住密码 -->
                                                <div class="rem-box">
                                                  <input type="checkbox" v-model="rememberPassBox">
                                                  <span>记住密码</span>
                                                </div>
                                                <button class="btn mt-4" type="button" @click="loginCheck">登 录</button>
                                                <p class="mb-0 mt-4 text-center"><a class="link">忘记密码？</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 用户注册卡片 -->
                                    <div class="card-back">
                                        <div class="center-wrap">
                                            <div class="section text-center">
                                                <h4 class="mb-4 pb-3">
                                                  {{ !registerInfo.identity?'电力用户注册':'发电企业注册' }}&nbsp;&nbsp;
                                                  <span @click="changeRegisterIdentity" style="font-size: 0.7rem; cursor: pointer;">
                                                    <i class="fa fa-exchange"></i>
                                                    切换
                                                  </span>
                                                </h4>
                                                <div class="form-group">
                                                    <input type="text" name="register-name" id="register-name" 
                                                    class="form-style" placeholder="用户名" autocomplete="off"
                                                    v-model="registerInfo.name">
                                                    <i class="input-icon uil uil-user"></i>
                                                </div>	
                                                <div class="form-group mt-2">
                                                    <input type="email" name="register-email" id="register-email"
                                                    class="form-style" placeholder="邮 箱" autocomplete="off"
                                                    v-model="registerInfo.email">
                                                    <i class="input-icon uil uil-at"></i>
                                                </div>	
                                                <div class="form-group mt-2">
                                                    <input type="password" name="register-pass" id="register-pass" 
                                                    class="form-style" placeholder="密 码" autocomplete="off"
                                                    v-model="registerInfo.pass">
                                                    <i class="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button class="btn mt-4" @click="registerCheck">注 册</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'LARI-main',
    data() {
      return {
        remPass: false, //是否记住密码        
      }
    },
    computed: {
      rememberPassBox: {
        get(){
          return this.rememberCheck
        },
        set(newVal) {
          this.$store.commit('updateRemember',newVal)
        }
      },
      ...mapState({
        loginInfo: state => state.loginAndRegister.loginInfo,
        registerInfo: state => state.loginAndRegister.registerInfo,
        rememberCheck: state => state.loginAndRegister.rememberCheck
      })
    },
    methods: {
      ...mapMutations(['changeRegisterIdentity']),
      ...mapActions(['loginInit', 'loginCheck', 'registerCheck'])
      
    },
    mounted() {
      this.loginInit()
    },
}
</script>

<style lang="scss" scoped>

// @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');
$transition-color: yellow;

.LARI-main{
	font-family: 'Poppins', sans-serif;
	font-weight: 300;
	font-size: 15px;
	line-height: 1.7;
  height: 100%;
	// color: #c4c3ca;
	// background-color: #23024f;
  overflow: hidden;
	// overflow-x: hidden;
}
a {
	cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
	text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: $theme-color-lighter;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
  cursor: default;
}
h6 span{
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.full-height{
  min-height: calc(100vh - 58px);
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: $theme-color-lighter;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: yellow;
  background-color: $theme-color;
  font-family: 'unicons';
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}
.rem-box {
  position: absolute;
  display: flex;
  margin-top: 2.3rem;
  right: 2rem;
  input {
    position: relative!important;;
    left: 0!important;
    margin-right: 0.3rem;
  }
  span {
    font-weight: 500;
    font-size: 10px;
    line-height: 1.7;
    color: #a1a0a0;
    cursor:default;
  }
}

.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 30px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;    
  top: 0;
  left: 0;  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out; 
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  /* background-color: #8226fc; */
  background-image: linear-gradient(135deg, $theme-color-light 1%,$theme-color 20%, $theme-color-dark);
  background-position: bottom center;
  background-repeat: no-repeat;
  position: absolute;
  border-radius: 10px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
  // transform: rotateY(0deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}

.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}

.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 80%;
  font-weight: bolder;
  border-radius: 4px;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 1px;
  outline: none;
  color: rgba(0, 0, 0, 0.5);
  background-color: #d9d8dd;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: $theme-color-lighter;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder  {
  color: #fff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #fff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #fff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #fff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.btn{  
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: $theme-color-lighter;
  color: $theme-color;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn:active,
.btn:focus{  
  background-color: $transition-color;
  color: $theme-color;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{  
  background-color: $transition-color;
  color: $theme-color-dark;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.mb-4 {
  color: #fff;
}
</style>