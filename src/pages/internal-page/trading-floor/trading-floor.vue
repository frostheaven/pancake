<template>
    <div class="trading-floor">
        <div class="title">
            交易大厅
            <br>
            <span>
                在这里规划您的交易~
            </span>
        </div>
        <ul class="cards">
          <li class="cards__item wow animate__animated animate__zoomIn">
              <div class="card power-user" @click="pathCheck('power-buy')">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--power-user"></div>
                </div>
                <div class="card__content">
                    <div class="card__title">购买电力</div>
                    <p class="card__text">根据您的需求，为您匹配最适合的购买项目</p>
                </div>
              </div>
          </li>
          <li class="cards__item wow animate__animated animate__zoomIn">
              <div class="card power-seller" @click="pathCheck('power-sell')">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--power-seller"></div>
                </div>   
                <div class="card__content">
                    <div class="card__title">出售电力</div>
                    <p class="card__text">合理设置您的出售价格，这将有助于您顺利交易</p>
                </div>
              </div>
          </li>
          <li class="cards__item wow animate__animated animate__zoomIn">
              <div class="card contract" @click="pathCheck('trade-check')">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--contract"></div>
                </div>
                <div class="card__content">
                    <div class="card__title">合约查验</div>
                    <p class="card__text">在这里查看您的历史合约，您可以自由拒绝或接受新合约</p>
                </div>
              </div>
          </li>
          <li class="cards__item wow animate__animated animate__zoomIn" v-if="adminUser">
              <div class="card admin" @click="pathCheck('admin-page')">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--admin"></div>
                </div>   
                <div class="card__content">
                    <div class="card__title">市场管理</div>
                    <p class="card__text">审核举报信息，维护市场交易秩序</p>
                </div>
              </div>
          </li>
      </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'trading-floor',
    data() {
        return {
            
        }
    },
    computed: {
      ...mapState({
            adminUser: state => state.userPrivilege.adminUser,
            loginStatus: state => state.userPrivilege.loginStatus
        }),
    },
    methods: {
        pathCheck(pathName) {
          if(this.loginStatus)this.toPath(pathName)
          else this.$pop().popMsgOnlyConfirm('请在登录后查看！')
        },
        toPath(pathName) {
          let routeData = this.$router.resolve({
            name: pathName
          })
          window.open(routeData.href, '_blank')
        },
    },
    mounted() {
      
    },
}
</script>

<style lang="scss" scoped>
.trading-floor {
    color: #696969;
    font-family: 'Roboto','Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    width: 100%;
}

.title {
  display: inline-block;
  width: 100%;
  margin-top: -10px;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  span {
    border-left: $theme-color solid 0.8rem;
    padding-left: 0.5rem;
    font-size: 0.8rem;
    font-weight: 300;
    margin-left: 2rem;
  }
}

/* card-style for the test*/ 
$title-font-color: #696969;

*,
*::before,
*::after { 
  box-sizing: border-box;
}
 
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards__item {
  display: flex;
  padding: 1rem;
  @media(min-width: 40rem) {
    width: 50%;
  }
  @media(min-width: 56rem) {
    width: 33%;
  }
  //设置卡片高度
  height: 25rem;
}

.card {
  background-color: #fff;
  border-radius: 2rem;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  transition: 0.3s ease;
  &:hover {
    cursor: pointer;
  }
}
.power-user:hover {
    background-color: rgba(112, 230, 224, 0.5);
}
.power-seller:hover {
    background-color: rgba(235, 235, 133, 0.5);
}
.contract:hover {
    background-color: rgba(245, 157, 157, 0.5);
}
.admin:hover {
    background-color: rgba(116, 116, 116, 0.5);
}

.card__content {
  display: flex;
  // flex: 1 1 auto;
  flex-direction: column;
  height: 15rem;
  padding: 1rem;
  position: relative;
}

.card__image {
  // filter: contrast(70%);
  // //filter: saturate(180%);
  overflow: hidden;
  position: relative;
  // transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);;
  &::after {
    content: "";
	  display: block;
    padding-top: 100%;
  }
  // @media(min-width: 40rem) {
  //   &::after {
  //     padding-top: 66.6%;
  //   }
  // }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .image__box{
    height: 80%;
    width: 80%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
}

.card__image--power-user {
  background-image: url('@/assets/image/trading-icon/power-user.png');
}

.card__image--power-seller {
  background-image: url('@/assets/image/trading-icon/power-seller.png');
}

.card__image--contract {
  background-image: url('@/assets/image/trading-icon/contract.png');
}
.card__image--admin {
  background-image: url('@/assets/image/trading-icon/admin.png');
}

.card__title {
  color: $title-font-color;
  font-size: 1.25rem;
  font-weight: bolder;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.card__text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

</style>