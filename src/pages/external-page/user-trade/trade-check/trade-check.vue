<template>
    <div class="trade-check">
        <div class="title-wrapper">
            <div class="title-content">
                <div class="title">我的买卖</div>
                <!-- <div class="sk-input-wrapper">
                    <input type="password" id="sk-input" placeholder="提供私钥以获取内容" v-model="mixSk">
                    <button @click="paste" id="paste-btn" class="paste-btn sk-btn">粘贴</button>
                    <button @click="getMyContract" class="paste-btn sk-btn">提交</button>
                </div> -->
                <div class="balance-wrapper">
                    当前余额：<span>
                        {{ userBalance?userBalance+' 元':'提供私钥以获取' }}
                        <!-- {{ userBalance?'398.262 元':'提供私钥以获取' }} -->
                        &nbsp;<i class="fa fa-question-circle-o" aria-hidden="true" style="cursor:pointer;" />
                    </span>
                </div>
            </div>
        </div>
        <div class="main-display">
            <div class="list-wrapper">
                <div class="accordion">
                    <!-- 售电确认 -->
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="sell-confirm-heading">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sell-confirm-collapse" aria-expanded="true" aria-controls="sell-confirm-collapse">
                            我的售电
                            </button>
                        </h2>
                        <div id="sell-confirm-collapse" class="accordion-collapse collapse show" aria-labelledby="sell-confirm-heading">
                            <!-- 排序 -->
                            <div class="sort-content">
                                <div class="btn-group">
                                    <button type="button" class="btn" @click="sortByTimeA(confirmToSellArr, 0)">排序</button>
                                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>{{ sellSortTypeName }}</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" @click="sortByTimeA(confirmToSellArr, 0)">按申请时间（最新）</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByTimeAReverse(confirmToSellArr, 0)">按申请时间（过去）</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByPrice(confirmToSellArr, 0)">按电价</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByCount(confirmToSellArr, 0)">按交易量</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByName(confirmToSellArr, 0)">按名称</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="accordion-body">
                                <ul class="sell-confirm">
                                    <li class="sell-confirm-every wow animate__animated animate__flipInX" v-for="item in confirmToSellArr" :key="item.id">
                                        <div class="item-content">
                                            <div class="item-name">
                                            名称：<span class="item-span">{{ item.projectName?item.projectName : '' }}</span>
                                            </div>
                                            <div class="item-id">
                                            ID：<span class="item-span">{{ item.id }}</span>
                                            </div>
                                        </div>
                                        <div class="item-content item-content-second">
                                            <div class="item-price">
                                            交易价格：<span class="item-span">{{ item.price }}&nbsp;元/KWH</span>
                                            </div>
                                            <div class="item-quantity">
                                            交易量：<span class="item-span">{{ item.count }}&nbsp;KWH</span>
                                            </div>
                                            <div class="item-apply-time" v-if="item.timeA">
                                            申请时间：<span class="item-span">{{ item.timeA.slice(0,-4) }}</span>
                                            </div>
                                        </div>
                                        <div class="item-content item-content-third">
                                            <div class="item-total-price">
                                            总金额：<span class="item-span">{{ (item.price*item.count).toFixed(3) }}&nbsp;元</span>
                                            </div>
                                            <div class="item-status">
                                                状态：<span 
                                                class="item-span"
                                                :style="item.state===1?'color: green;':(item.state === 0? 'color:gray;':'color:red;')">
                                                    {{ item.state === 1?"通过":(item.state === 0?"暂未审批":"拒绝") }}
                                                </span>
                                            </div>
                                            <div class="item-process-time" v-if="item.timeB">
                                            处理时间：<span class="item-span">{{ item.timeB.slice(0,-4) }}</span>
                                            </div>
                                        </div>
                                        <div class="btn-wrapper">
                                            <div class="review-btn">
                                                <button @click="reviewTrade(item)">申诉</button>
                                            </div>
                                            <div class="pass-btn">
                                                <button v-if="item.state === 0" class="live-btn-uncheck" @click="passTrade(item)">通过</button>
                                                <button v-if="item.state === 1" class="disabled-btn-checked">已通过</button>
                                                <button v-if="item.state === -1" class="disabled-btn-opposite">通过</button>
                                            </div>
                                            <div class="reject-btn">
                                                <button v-if="item.state === 0" class="live-btn-uncheck" @click="rejectTrade(item)">拒绝</button>
                                                <button v-if="item.state === -1" class="disabled-btn-checked">已拒绝</button>
                                                <button v-if="item.state === 1" class="disabled-btn-opposite">拒绝</button>
                                            </div>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 购电申请 -->
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="purchase-apply-heading">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#purchase-apply-collapse" aria-expanded="false" aria-controls="purchase-apply-collapse">
                            我的购电
                            </button>
                        </h2>
                        <div id="purchase-apply-collapse" class="accordion-collapse collapse show" aria-labelledby="purchase-apply-heading">
                            <!-- 排序 -->
                            <div class="sort-content">
                                <div class="btn-group">
                                    <button type="button" class="btn" @click="sortByTimeA(myPurchaseApplyArr, 1)">排序</button>
                                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>{{ purchaseSortTypeName }}</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" @click="sortByTimeA(myPurchaseApplyArr, 1)">按购买时间（最新）</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByTimeAReverse(myPurchaseApplyArr, 1)">按购买时间（过去）</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByPrice(myPurchaseApplyArr, 1)">按电价</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByCount(myPurchaseApplyArr, 1)">按交易量</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByName(myPurchaseApplyArr, 1)">按名称</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="accordion-body">
                                <ul class="purchase-apply">
                                    <li class="purchase-apply-every clearfix wow animate__animated animate__flipInX" v-for="item in myPurchaseApplyArr" :key="item.id">
                                        <!-- 图标 -->
                                        <div class="item-logo">
                                            <img :src="item.image? 'http://124.222.159.78:8089'+item.image:require('@/assets/user-default/portrait-default.png')" class="img-fluid" alt="...">
                                        </div>
                                        <div class="item-content">
                                            <div class="item-name">
                                            名称：<span class="item-span">{{ item.projectName }}</span>
                                            </div>
                                            <div class="item-id">
                                            ID：<span class="item-span">{{ item.id }}</span>
                                            </div>
                                        </div>
                                        <div class="item-content item-content-second">
                                            <div class="item-price">
                                            购电价格：<span class="item-span">{{ item.price }}&nbsp;元/KWH</span>
                                            </div>
                                            <div class="item-quantity">
                                            购电量：<span class="item-span">{{ item.count }}&nbsp;KWH</span>
                                            </div>
                                            <div class="item-apply-time" v-if="item.timeA">
                                            购买时间：<span class="item-span">{{ item.timeA.slice(0,-4) }}</span>
                                            </div>
                                        </div>
                                        <div class="item-content item-content-third">
                                            <div class="item-total-price">
                                            总金额：<span class="item-span">{{ (item.price*item.count).toFixed(3) }}&nbsp;元</span>
                                            </div>
                                            <div class="item-status">
                                            状态：<span 
                                            class="item-span"
                                            :style="item.state===1?'color: green;':(item.state === 0? 'color:gray;':'color:red;')">
                                                {{ item.state === 1?"通过":(item.state === 0?"暂未审批":"拒绝") }}
                                                </span>
                                            </div>
                                            <div class="item-process-time" v-if="item.timeB">
                                            处理时间：<span class="item-span">{{ item.timeB.slice(0,-4) }}</span>
                                            </div>
                                        </div>
                                        <div class="btn-wrapper">
                                            <div class="review-btn">
                                                <button @click="reviewTrade(item)">申诉</button>
                                            </div>
                                            <div class="remove-btn">
                                                <button>撤回</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
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
    name: 'trade-check',
    data() {
        return {
            purchaseSortTypeName: '默认',
            sellSortTypeName: '默认',
            mixSk: '',
        }
    },
    watch: {
        mixSk(newVal) {
            let pasteBtn = document.getElementById('paste-btn')           
            if(newVal === '')pasteBtn.innerText = '粘贴'
        }
    },
    computed: {
        ...mapState({
            confirmToSellArr: state => state.tradeCheck.confirmToSellArr,
            myPurchaseApplyArr: state => state.tradeCheck.myPurchaseApplyArr,
            userBalance: state => state.tradeCheck.userBalance //用户余额
        })
    },
    methods: {
        //排序
        sortByTimeA(arr, arrType) {
            arr.sort((a, b) => {return a.timeA < b.timeA?1:-1})
            if(arrType)this.purchaseSortTypeName = '按时间（最新）'
            else this.sellSortTypeName = '按时间（最新）'
        },
        sortByTimeAReverse(arr, arrType) {
            arr.sort((a, b) => {return a.timeA > b.timeA?1:-1})
            if(arrType)this.purchaseSortTypeName = '按时间（过去）'
            else this.sellSortTypeName = '按时间（过去）'
        },
        sortByPrice(arr, arrType) {
            arr.sort((a, b) => {return a.price - b.price})
            if(arrType)this.purchaseSortTypeName = '按电价'
            else this.sellSortTypeName = '按电价'
        },
        sortByCount(arr, arrType) {
            arr.sort((a, b) => {return a.count - b.count})
            if(arrType)this.purchaseSortTypeName = '按交易量'
            else this.sellSortTypeName = '按交易量'
        },
        sortByName(arr, arrType) {
            arr.sort((a, b) => {return a.projectName.charCodeAt()<b.projectName.charCodeAt()?1:-1})
            if(arrType)this.purchaseSortTypeName = '按名称'
            else this.sellSortTypeName = '按名称'
        },

        // async paste() {
        //     let target = document.getElementById('sk-input');
        //     const pasteText = await navigator.clipboard.readText()
        //     if(!target.value) {
        //         target.value = pasteText
        //         this.mixSk = target.value
        //         let pasteBtn = document.getElementById('paste-btn')
        //         pasteBtn.innerText = '已粘贴√'
        //     }
        // },
        // async getMyContract() {
        //     if(this.mixSk === '')this.$pop().popMsgOnlyConfirm('私钥为空！')
        //     else {
        //         await this.$store.dispatch('checkPrivKeyToGetTrade', this.mixSk)
        //     }
        // },
        async passTrade(item){
            // console.log('state', item.tempState)
            this.$pop().popMsg('确认出售吗？')
            await this.$bus.$on('popConfirm', () => {
                item.tempState = 1 //确认出售，则将tempState修改为1进行数据传输
                this.$store.dispatch('CalOTPrivKey', item)
            })
            // console.log('state', item.state)
        },
        async rejectTrade(item) {
            this.$pop().popMsg('确认拒绝吗？')
            await this.$bus.$on('popConfirm', () => {
                item.tempState = -1 //确认拒绝，则将tempState修改为-1进行数据传输
                this.$store.dispatch('CalOTPrivKey', item)
            })
        },
        async reviewTrade(item) {
            item.reason = ''
            this.$pop().popMsgWithInput('', '在此说明申诉理由，以便我们更好地为您解决问题')
            this.$bus.$on('popConfirm', (reason) => {
                item.reason = reason
                this.$store.dispatch('reviewTrade', item)
            })
        }
    },
    async mounted() {
        //载入时，自动使用私钥进行数据获取
        await this.$store.dispatch('checkPrivKeyToGetTrade')
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
li {
    list-style: none;
}
.trade-check {
    width: 100%;
    min-height: calc(100vh);
    background-color: lighten($theme-color, 5);
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-display {
    width: 100%;
    min-height: calc(90vh);
    background-color: rgb(247, 247, 247);
    .list-wrapper {
        width: 100%;
    }
}
}
.title-wrapper {
    width: 100%;
    height: calc(10vh);
    .title-content{
        width: 100%; height: 100%;
        position: relative;
        display: flex;
        .title {
            padding-left: 5%;
            height: 100%;
            width: 40%;
            display: flex;
            align-items: center;
            font-weight: bolder;
            font-size: 2rem;
            letter-spacing: 0.2rem;
            color: #fff;
        }
        .sk-input-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            #sk-input {
                width: 25%;
                border-radius: 2rem;
                font-size: 0.8rem;
                padding: 0.3rem;
                transition: 0.3s ease;
            }
            .sk-btn {
                border-radius: 1rem;
                font-size: 0.8rem;
                padding: 0.3rem 0.6rem;
                margin-left: 1.5%;
                background-color: $theme-color;
                color: #fff;
                transition: 0.3s ease;
                &:hover {
                    background-color: $theme-color-dark;
                }
            }
        }
        .balance-wrapper {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            font-weight: 800;
            color: #fff;
            cursor: default;
            span {
                text-shadow: 2px 2px black;
            }
        }
    }
}
.accordion {
    background: transparent;
    .accordion-item{
        border: none;
        background-color: transparent;
        button {
            background: transparent;
        }
    }
}
// 主体列表
.accordion-collapse {
    width: 100%;
    .sort-content {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);
    }
    .accordion-body {
        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            li {
                list-style: none;
                padding: 2rem 1rem;
                margin-top: 0.2rem;
                width: 80%;
                border-bottom-left-radius: 2rem;
                border-bottom-right-radius: 2rem;
                border-bottom: 0.5rem solid $theme-color;
                background-image: linear-gradient(360deg, lighten($theme-color, 39), #fff 97%);

                display: flex;
                justify-content: space-around;
                align-items: center;
                .item-logo {
                    height: 4rem;
                    width: 4rem;
                    overflow: hidden;
                    display: flex;
                    img{
                        border-radius: 999px;
                        height: 100%;
                    }
                }
                .item-span {
                    font-size: 0.9rem;
                    font-weight: 1000;
                    word-break: break-word;
                }
                .btn-wrapper {
                    display: flex;
                    justify-content: space-around;
                    button {
                        min-width: 4rem;
                        background-color: $theme-color;
                        color: #fff;
                        font-weight: 700;
                        margin: 0 4px;
                        padding: 0.4rem 0.4rem;
                        border-radius: 0.5rem;
                        transition: 0.3s ease;
                        &:hover {
                            background-color: $theme-color-dark;
                        }
                    }
                    .pass-btn {
                        .live-btn-uncheck{
                            background-color: rgb(45, 110, 45);
                            &:hover {
                                background-color: rgb(65, 172, 65);
                            }
                        }
                        .disabled-btn-checked {
                            background-color: rgb(65, 172, 65);
                            cursor: default;
                        }
                        .disabled-btn-opposite {
                            background-color: gray;
                            cursor: default;
                        }
                    }
                    .reject-btn {
                        .live-btn-uncheck {
                            background-color: rgb(186, 67, 67);
                            &:hover {
                                background-color: rgb(240, 77, 77);
                            }
                        }
                        .disabled-btn-checked {
                            background-color: rgb(240, 77, 77);
                            cursor: default;
                        }
                        .disabled-btn-opposite {
                            background-color: gray;
                            cursor: default;
                        }
                    }
                    .remove-btn button {
                        background-color: gray;
                        &:hover {
                            background-color: rgb(79, 79, 79);
                        }
                    }
                }
            }
        }
    }
}

</style>