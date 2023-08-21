<template>
    <div class="power-buy">
        <div class="title-wrapper">
            <div class="select-wrapper">
                <span class="select-search" 
                :class="{'active': searchMode === 0}" 
                @click="searchModeChange(0)">系统匹配</span>
                <span class="free-search" 
                :class="{'active': searchMode === 1}" 
                @click="searchModeChange(1)">自由搜索</span>
            </div>
            <div class="title-content">
                <div class="title">
                    <!-- 自由搜索 -->
                    <div class="search-wrapper wow animate__animated animate__pulse" v-if="searchMode">
                        <fieldset class="field-container">
                            <input type="text" placeholder="" class="field" />
                            <div class="icons-container">
                                <div class="icon-search"></div>
                                <div class="icon-close">
                                    <div class="x-up"></div>
                                    <div class="x-down"></div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <!-- 系统匹配 -->
                    <div class="select-wrapper-inside" v-if="!searchMode">
                        <div class="select-title-inside">
                          <span>预期交易量</span>
                        </div>
                        <div class="select-content select-quantity-content">
                            <div class="select-input select-quantity-input">
                                <input type="number" placeholder="（•KWH）" v-model="selectCount" @keyup.enter="selectSearch">
                            </div>
                        </div>
                        <div class="select-btn-content">
                            <button class="select-btn" @click="selectSearch">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-result-wrapper">
          <div class="accordion">
            <!-- 最优匹配 -->
            <div class="accordion-item">
              <h2 class="accordion-header" id="matchedItems-heading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#matchedItems-collapse" aria-expanded="true" aria-controls="matchedItems-collapse">
                  最优匹配
                  <span v-if="passedSelectCount">【预期：{{ passedSelectCount }} KWH】</span>
                </button>
              </h2>
              <div id="matchedItems-collapse" class="accordion-collapse collapse" aria-labelledby="matchedItems-heading"
              :class="{'show': selectedArr.length !== 0}">
              <!-- 排序 -->
                <div class="sort-content">
                  <div class="btn-group">
                    <button type="button" class="btn">排序</button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                      <span>{{ selectSortTypeName }}</span>
                    </button>
                    <ul class="dropdown-menu">
                      <!-- <li><a class="dropdown-item" @click="sortByTime(selectedArr, 0)">按上市时间</a></li>
                      <li><hr class="dropdown-divider"></li> -->
                      <li><a class="dropdown-item" @click="sortByPrice(selectedArr, 0)">按电价</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="sortByCount(selectedArr, 0)">按交易量</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="sortByName(selectedArr, 0)">按名称</a></li>
                    </ul>
                  </div>
                </div>
                <div class="accordion-body">
                  <ul class="matchedItems" v-if="selectedArr.length !== 0">
                    <template v-for="(item, index) in selectedArr">
                      <li class="matchedItems-every clearfix wow animate__animated animate__flipInX" 
                        v-if="index % 2 === 0"
                        :key="item.id">
                        <!-- 图标 -->
                        <div class="item-left-wrapper item-wrapper">
                          <div class="item-logo">
                            <img :src="item.image? 'http://124.222.159.78:8089'+item.image:require('@/assets/user-default/portrait-default.png')" class="img-fluid" alt="...">
                          </div>
                          <div class="check-btn btn-box">
                            <button @click="purchase(item)">立即购买</button>
                          </div>
                        </div>
                        
                        <div class="item-right-wrapper item-wrapper">
                          <div class="item-title">
                            <div class="item-name item-piece">
                              名称：<span>{{ item.projectName }}</span>
                            </div>
                          </div>
                          <div class="item-content">
                            <div class="item-price item-piece">
                              电价：<span>{{ item.price }}</span> 元/度
                            </div>
                            <div class="item-quantity item-piece">
                              可交易量：<span>{{ item.stock }}</span> •KWH
                            </div>
                            <div class="item-term item-piece">
                              交易周期：<span>{{ item.contractTerm }}</span>
                            </div>
                            <div class="item-already-sold item-piece">
                              已售：<span>{{item.sold}}</span> •KWH
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="matchedItems-every clearfix wow animate__animated animate__flipInX" 
                        v-if="index % 2 === 1"
                        :key="item.id">
                        <!-- 图标 -->
                        <div class="item-left-wrapper item-wrapper">
                          <div class="item-logo">
                            <img :src="item.image? 'http://124.222.159.78:8089' +item.image:require('@/assets/user-default/portrait-default.png')" class="img-fluid" alt="...">
                          </div>
                          <div class="check-btn btn-box">
                            <button @click="purchase(item)">立即购买</button>
                          </div>
                        </div>
                        
                        <div class="item-right-wrapper item-wrapper">
                          <div class="item-title">
                            <div class="item-name item-piece">
                              名称：<span>{{ item.projectName }}</span>
                            </div>
                            <!-- <div class="item-id item-piece">
                              ID：<span>{{ item.id }}</span>
                            </div> -->
                          </div>
                          <div class="item-content">
                            <div class="item-price item-piece">
                              电价：<span>{{ item.price }}</span> 元/度
                            </div>
                            <div class="item-quantity item-piece">
                              可交易量：<span>{{ item.stock }}</span> •KWH
                            </div>
                            <div class="item-term item-piece">
                              交易周期：<span>{{ item.contractTerm }}</span>
                            </div>
                            <div class="item-already-sold item-piece">
                              已售：<span>{{ item.sold }}</span> •KWH
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 所有项目 -->
            <div class="accordion-item">
              <h2 class="accordion-header" id="allItems-heading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#allItems-collapse" aria-expanded="false" aria-controls="allItems-collapse">
                  所有项目
                </button>
              </h2>
              <div id="allItems-collapse" class="accordion-collapse collapse show" aria-labelledby="allItems-heading">
                <!-- 排序 -->
                <div class="sort-content">
                  <div class="btn-group">
                    <button type="button" class="btn" @click="sortByTime(allProArr, 1)">排序</button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                      <span>{{ allSortTypeName }}</span>
                    </button>
                    <ul class="dropdown-menu">
                      <!-- <li><a class="dropdown-item" @click="sortByTime(allProArr, 1)">按上市时间</a></li>
                      <li><hr class="dropdown-divider"></li> -->
                      <li><a class="dropdown-item" @click="sortByPrice(allProArr, 1)">按电价</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="sortByCount(allProArr, 1)">按交易量</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="sortByName(allProArr, 1)">按名称</a></li>
                    </ul>
                  </div>
                </div>
                <div class="accordion-body">
                  <ul class="allItems">
                    <template v-for="(item, index) in allProArr">
                      <li class="allItems-every clearfix wow animate__animated animate__flipInX" 
                        v-if="index % 2 === 0"
                        :key="item.id">
                        <!-- 图标 -->
                        <div class="item-left-wrapper item-wrapper">
                          <div class="item-logo">
                            <img :src="item.image? 'http://124.222.159.78:8089'+item.image:require('@/assets/user-default/portrait-default.png')" class="img-fluid" alt="...">
                          </div>
                          <div class="check-btn btn-box">
                            <button @click="purchase(item)">立即购买</button>
                          </div>
                        </div>
                        
                        <div class="item-right-wrapper item-wrapper">
                          <div class="item-title">
                            <div class="item-name item-piece">
                              名称：<span>{{ item.projectName }}</span>
                            </div>
                            <!-- <div class="item-id item-piece">
                              ID：<span>{{ item.id }}</span>
                            </div> -->
                          </div>
                          <div class="item-content">
                            <div class="item-price item-piece">
                              电价：<span>{{ item.price }}</span> 元/度
                            </div>
                            <div class="item-quantity item-piece">
                              可交易量：<span>{{ item.stock }}</span> •KWH
                            </div>
                            <div class="item-term item-piece">
                              交易周期：<span>{{ item.contractTerm }}</span>
                            </div>
                            <div class="item-already-sold item-piece">
                              已售：<span>{{item.sold}}</span> •KWH
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="allItems-every clearfix wow animate__animated animate__flipInX" 
                        v-if="index % 2 === 1"
                        :key="item.id">
                        <!-- 图标 -->
                        <div class="item-left-wrapper item-wrapper">
                          <div class="item-logo">
                            <img :src="item.image? 'http://124.222.159.78:8089' +item.image:require('@/assets/user-default/portrait-default.png')" class="img-fluid" alt="...">
                          </div>
                          <div class="check-btn btn-box">
                            <button @click="purchase(item)">立即购买</button>
                          </div>
                        </div>
                        
                        <div class="item-right-wrapper item-wrapper">
                          <div class="item-title">
                            <div class="item-name item-piece">
                              名称：<span>{{ item.projectName }}</span>
                            </div>
                            <!-- <div class="item-id item-piece">
                              ID：<span>{{ item.id }}</span>
                            </div> -->
                          </div>
                          <div class="item-content">
                            <div class="item-price item-piece">
                              电价：<span>{{ item.price }}</span> 元/度
                            </div>
                            <div class="item-quantity item-piece">
                              可交易量：<span>{{ item.stock }}</span> •KWH
                            </div>
                            <div class="item-term item-piece">
                              交易周期：<span>{{ item.contractTerm }}</span>
                            </div>
                            <div class="item-already-sold item-piece">
                              已售：<span>{{ item.sold }}</span> •KWH
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'power-buy',
    data() {
        return {
            selectSortTypeName: '推荐',
            allSortTypeName: '默认',
            searchMode: 0, //0代表系统匹配，1为自由搜索
            selectCount: ''
        }
    },
    watch: {
      selectCount(newVal) {
        if(newVal < 0)this.selectCount = 0
        this.selectCount.replace(/^0+\./g,'0.').replace(/^[0]+/,'')
      },
    },
    computed: {
      ...mapState({
        allProArr: state => state.itemPurchaseAndSearch.allProArr,
        selectedArr: state => state.itemPurchaseAndSearch.selectedArr,
        passedSelectCount: state => state.itemPurchaseAndSearch.selectCount
      })
    },
    methods: {
        //排序
        sortByTime(arr, arrType) {
          if(arrType)this.allSortTypeName = '按上市时间'
          else this.selectSortTypeName = '按上市时间'
          arr.reverse()
        },
        sortByPrice(arr, arrType) {
          arr.sort((a, b) => {return a.price - b.price})
          if(arrType)this.allSortTypeName = '按电价'
          else this.selectSortTypeName = '按电价'
        },
        sortByCount(arr, arrType) {
          arr.sort((a, b) => {return a.stock - b.stock})
          if(arrType)this.allSortTypeName = '按交易量'
          else this.selectSortTypeName = '按交易量'
        },
        sortByName(arr, arrType) {
          arr.sort((a, b) => {return a.projectName.charCodeAt()<b.projectName.charCodeAt()?1:-1})
          if(arrType)this.allSortTypeName = '按名称'
          else this.selectSortTypeName = '按名称'
        },
        searchModeChange(index){
            this.searchMode = index
        },
        selectSearch(){
            if(this.selectCount !== '') {
              this.$store.dispatch('getSelectedItems', this.selectCount)
            }
        },
        // 购买
        async purchase(item) {
          //以下函数在pop-trade-settings.js与pop-trade.vue中调用
          this.$popTrade(item).popCreateTrade()
          await this.$bus.$on('popConfirmPurchase', applyInfo => {
              this.$store.dispatch('checkPrivKeyToPurchase', applyInfo)
          })
        }
    },
    async mounted() {
      await this.$store.dispatch('getAllItems')
    },
}
</script>

<style lang="scss" scoped>
//全局
$title-width: 60%;
$font-color: #696969;
$shadow-color: $theme-color;
$light-color: lighten($theme-color, 5); //lighten(color, degree);darken() the same
// 自由搜索样式设置
// @import url(https://fonts.googleapis.com/css?family=Montserrat);
$snappy:  cubic-bezier(0.694,  0.048, 0.335, 1.000);
$select-theme-color: #696969;

button {
  border: none;
  color: $font-color;
}
input {
  color: $font-color;
  outline: none;
}
input[type=number] {
  -moz-appearance:textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
.power-buy {
    min-height: calc(100vh);
    width: 100%;
    color: $font-color;
    font-family: 'Roboto','Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
}
.title-wrapper {
    width: 100%;
    position: relative;
    height: calc(20vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border-bottom: 0.5px dashed $theme-color;
    .select-wrapper {
       width: $title-width;
       span{
        font-weight: 300;
        font-size: 1.2rem;
        padding: 6px 40px;
        color: $font-color;
        transition: 0.8s ease;
        cursor: pointer;
       }
       span:nth-child(1) {
        background-color: #fff;
        // border: 1px solid $theme-color;
        border-radius: 2rem;
        z-index: 2;
        position:relative;
       }
       span:nth-child(2) {
        margin-left: 5%;
        background-color: transparent;
        // border: 1px solid $theme-color;
        border-radius: 2rem;
        z-index: 1;
       }
       span:hover, span.active {
        color: #fff;
        background-color: $shadow-color;
       }
    }
}
.title-content {
    height: 55%;
    width: $title-width;
    // border: 1px solid $theme-color;
    .title {
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        position: relative;
        // 灯光效果
        &::after {
          content: '';
          display: block;
          width: calc(100vw);
          position: absolute;
          top: 0;
          z-index: -1;
          height: calc(23vh);
          background-image: conic-gradient(from 90deg at 50% 50%, #fff, $light-color), conic-gradient(from 270deg at 50% 50%, $light-color, #fff);
          -webkit-mask-image: radial-gradient(100% 50% at center center, black, transparent);
          background-position-x: 0%, 100%;
          background-position-y: 0%, 0%;
          background-size: 50% 100%, 50% 100%;
          transform: rotate(180deg) translate3d(0, 0, 0);
          transform-origin: center center;
          background-repeat: no-repeat;
        }
    }
}
// 系统匹配
.select-wrapper-inside {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    position: relative;
    height: 100%;
    // overflow: hidden;
    
    .select-title-inside {
        font-weight: 800;
        font-size: 1rem;
        position: absolute;
        padding: 1.3rem 1rem;
        bottom: 0;
        left: 12%;
        height: 45%;
        width: 22%;
        border: 0.5px solid $theme-color;
        border-radius: 2rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
        background-image: linear-gradient(360deg, #fff, lighten($light-color, 20));
        box-shadow: -10px -8px 10px $shadow-color;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        cursor: default;
        &::after  {
          content: '';
          width: 40px;
          height: 40px;
          position: absolute;
          right: -15%;
          border-left: 3px solid $theme-color;
          // border-top: 2px solid $theme-color;
          border-radius: 2rem;
          // transform: rotate(-45deg);
          background-image: linear-gradient(360deg, #fff, lighten($light-color, 23));
          // box-shadow: -2px 0px 4px $shadow-color;
        }
    }
    .select-content {
        width: 60%;
        overflow: hidden;
        .select-input {
          height: 100%;
          input {
            padding: 1.3rem 1rem;
            font-size: 1rem;
            width: 25%;
            height: 45%;
            position: absolute;
            bottom: 0;
            left: 30%;
            border: 0.5px solid $theme-color;
            border-left: none;
            border-radius: 2rem;
            background-image: linear-gradient(360deg, #fff, lighten($light-color, 23));
            box-shadow: 0px -8px 10px $shadow-color;
            text-align: center;
          }
        }
    }
    
    .select-btn-content{
        height: 100%;
        width: 20%;
        position: relative;
        .select-btn {
            position: absolute;
            bottom: 0;
            width: 80%;
            padding: 0.6rem 1rem;
            border-radius: 1.2rem;
            border: 0.5px solid $theme-color;
            background-image: linear-gradient(360deg, #fff, lighten($light-color, 23));
            box-shadow: -10px -8px 10px $shadow-color;
            transition: 0.2s ease;
            &:hover {
              background-image: linear-gradient(360deg, #fff, lighten($light-color, 30));
            }
            &:active {
              box-shadow: -5px -2px 5px $shadow-color;
              transform: translate(-5% ,-5%);
            }
        }
    }
}

// 自由搜索
$corner-radius: 1rem; //搜索框border-radius
::selection {
  background: $select-theme-color;
  color: white;
  text-shadow: none;
}

::-webkit-selection{
  background: $select-theme-color;
  color: white;
  text-shadow: none;
}
.search-wrapper {
  position: absolute;
  bottom: 2%;
  box-shadow: -10px -8px 10px $shadow-color;
  border-radius: $corner-radius;
}
.field-container {
  position: relative;
  padding: 0;
  margin: 0;
  border: 0.5px solid $theme-color;
  width: 330px;
  height: 40px;
  border-radius: $corner-radius;
  input {
    border-radius: $corner-radius;
  }
}

.icons-container {
  position: absolute;
  top: 2px;
  right: 0px;
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.icon-close {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 75%;
  height: 75%;
  opacity: 0;
  cursor: pointer;
  transform: translateX(-200%);
  border-radius: 50%;
  transition: opacity 0.25s ease, transform 0.43s $snappy;
  &:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: 2px solid transparent;
    border-top-color: $select-theme-color;
    border-left-color: $select-theme-color;
    border-bottom-color: $select-theme-color;
    transition: opacity 0.2s ease;
  }
  .x-up {
    position: relative;
    width: 100%;
    height: 50%;
    &:before {
      content: "";
      position: absolute;
      bottom: 2px;
      left: 3px;
      width: 50%;
      height: 2px;
      background-color: $select-theme-color;
      transform: rotate(45deg);
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 0px;
      width: 50%;
      height: 2px;
      background-color: $select-theme-color;
      transform: rotate(-45deg);
    }
  }
  .x-down {
    position: relative;
    width: 100%;
    height: 50%;
    &:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 4px;
      width: 50%;
      height: 2px;
      background-color: $select-theme-color;
      transform: rotate(-45deg);
    }
    &:after {
      content: "";
      position: absolute;
      top: 5px;
      right: 1px;
      width: 50%;
      height: 2px;
      background-color: $select-theme-color;
      transform: rotate(45deg);
    }
  }
  .is-type & {
    &:before {
      opacity: 1;
    }
    .x-up {
      &:after {
        animation-delay: 0.3s;
      }
    }
    .x-down {
      &:before {
        animation-delay: 0.2s;
      }
      &:after {
        animation-delay: 0.1s;
      }
    }
  }
}

.icon-search {
  position: relative;
  top: 5px;
  left: 8px;
  width: 50%;
  height: 50%;
  opacity: 1;
  border-radius: 50%;
  border: 3px solid mix($select-theme-color, white, 35%);
  transition: opacity 0.25s ease, transform 0.43s $snappy;
  &:after {
    content: "";
    position: absolute;
    bottom: -9px;
    right: -2px;
    width: 4px;
    border-radius: 3px;
    transform: rotate(-45deg);
    height: 10px;
    background-color: mix($select-theme-color, white, 35%);
  }
}

.field {
  border: 0;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  background: white;
  border-radius: $corner-radius;
  transition: all 0.4s ease;
  &:focus {
    outline: none;
    + .icons-container {
      .icon-close {
        opacity: 1;
        transform: translateX(0);
      }
      .icon-search {
        opacity: 0;
        transform: translateX(200%);
      }
    }
  }
}

// 搜索结果
.search-result-wrapper {
  margin-top: 4%;
  display: flex;
  justify-content: center;
  .accordion {
    width: 90%;
    background-color: transparent;
    .accordion-item {
      border: none;
      background-color: transparent;
      h2 {
        border: none;
        .accordion-button {
          background-color: transparent;
        }
      }
    }
    .accordion-collapse {
      .sort-content {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);
      }
      .accordion-body{
        ul{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          width: 100%;
          li {
            list-style: none;
            padding: 2rem 1rem;
            width: 45%;
            // border-bottom-left-radius: 2rem;
            // border-bottom-right-radius: 2rem;
            border-radius: 2rem;
            border-bottom: 0.5rem solid $theme-color;
            // background-image: linear-gradient(360deg, lighten($theme-color, 39), #fff 97%);
            background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255, 0.5)), url('@/assets/image/user-trade/power-buy/card-bg.jpg');
            box-shadow: -2px 2px 6px $shadow-color;
            display: flex;
            align-items: center;
            margin:1% 2%;
            .item-left-wrapper {
              height: 14rem;
              width: 12rem;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .item-logo {
                height: 12rem;
                width: 12rem;
                padding: 0.5rem;
                text-align: center;
                img{
                  object-fit: cover;
                  width: 80%;
                  border-radius: 999px;
                }
              }
              .btn-box {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                button {
                  background-color: $theme-color;
                  color: #fff;
                  font-weight: 700;
                  padding: 0.6rem 0.8rem;
                  border-radius: 0.8rem;
                  transition: 0.3s ease;
                  &:hover {
                    background-color: $theme-color-dark;
                  }
                }
              }
              
            }
            .item-right-wrapper {
              .item-title {
                .item-piece{
                  font-weight: 600;
                  color: $font-color;
                  padding: 0.1rem 0;
                  span {
                    
                    color: darken($theme-color, 25);
                    font-weight: 800;
                    font-size: 1rem;
                    letter-spacing: 0.1rem;
                  }
                }
              }
              .item-content {
                .item-piece {
                  padding: 0.5rem 0;
                  font-weight: 600;
                  color: $font-color;
                  span {
                    color: orange;
                    font-weight: 1000;
                    font-size: 1.3rem;
                  }
                }
                .item-term, .item-already-sold {
                  span {
                    color: $font-color;
                    font-size: 1rem;
                  }
                }
              }
            }
            
          }
        }
      }
    }
  }
}
</style>