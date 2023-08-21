<template>
    <div class="help">
      <div class="title">
        帮 助
        <br>
        <span>选择您需要的帮助类型~</span>
      </div>
      <ul class="cards">
          <li class="cards__item wow animate__animated animate__flipInY">
              <div class="card">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--trade"></div>
                </div>
                <div class="card__content">
                    <div class="card__title">业务咨询</div>
                    <p class="card__text">包括您在交易中遇到的各种问题</p>
                    <button class="btn btn--block card__btn">进入</button>
                </div>
              </div>
          </li>
          <li class="cards__item wow animate__animated animate__flipInY">
              <div class="card">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--safety"></div>
                </div>   
                <div class="card__content">
                    <div class="card__title">账户安全</div>
                    <p class="card__text">查询您的账户信息，修改密码等</p>
                    <button class="btn btn--block card__btn">进入</button>
                </div>
              </div>
          </li>
          <li class="cards__item wow animate__animated animate__flipInY">
              <div class="card">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--user-feedback"></div>
                </div>
                <div class="card__content">
                    <div class="card__title">用户反馈</div>
                    <p class="card__text">将您遇到的问题反馈给我们</p>
                    <button class="btn btn--block card__btn">进入</button>
                </div>
              </div>
          </li>
          <li class="cards__item wow animate__animated animate__flipInY">
              <div class="card">
                <!-- 图片展示 -->
                <div class="card__image">
                  <div class="image__box card__image--manual"></div>
                </div>
                <div class="card__content">
                    <div class="card__title">人工客服</div>
                    <p class="card__text">还是无法解决问题？联系我们</p>
                    <button class="btn btn--block card__btn">进入</button>
                </div>
              </div>
          </li>
      </ul>
    </div>
</template>

<script>

export default {
    name: 'help',
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>

html {
  background-color: #f0f0f0;
}

.help {
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

.btn {
  background-color: transparent;
  border: 1px solid $theme-color;
  // border-radius: 1rem;
  color: $theme-color;
  padding: 0.5rem;
  text-transform: lowercase;
  transition: 0.3s ease;
  &:hover{
    background-color: $theme-color;
    color: #fff;
  }

  position: relative;
  bottom: 0%;
}

.btn--block {
  display: block;
  width: 100%;
}
 
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  .cards__item {
    display: flex;
    padding: 1rem;
    @media(min-width: 40rem) {
      width: 50%;
    }
    @media(min-width: 56rem) {
      width: 25%;
    }
    height: 25rem;
    .card {
      width: 100%;
      background-color: #fff;
      border-radius: 0.25rem;
      box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      // &:hover {
      //   .card__image {
      //     filter: contrast(100%);
      //   }
      // }
    }
  }
}

.card__content {
  // flex: 1 1 auto;
  height: 12rem;
  padding: 1rem;
  position: relative;
  .card__title {
    color: $title-font-color;
    font-size: 1.25rem;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .card__text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }
  .card__btn {
    position: relative;
    bottom: 0%;
    &:active {
      background-color: $theme-color !important;
      color: #fff !important;
    }
  }
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

.card__image--trade {
  background-image: url('@/assets/image/help-icon/trade.png');
}

.card__image--safety {
  background-image: url('@/assets/image/help-icon/safety.png');
}

.card__image--user-feedback {
  background-image: url('@/assets/image/help-icon/user-feedback.png');
}

.card__image--manual {
  background-image: url('@/assets/image/help-icon/manual.png');
}


</style>