<template>
    <div class="report-handle">
        <div class="title-wrapper">
            <div class="title-content">
                <div class="title">申诉记录</div>
                <!-- <div class="history"><span>查看所有历史</span></div> -->
            </div>
        </div>
        <div class="main-display">
            <div class="list-wrapper">
                <div class="accordion">
                    <!-- 申诉处理 -->
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="report-heading">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#report-collapse" aria-expanded="true" aria-controls="report-collapse">
                            申诉处理
                            </button>
                        </h2>
                        <div id="report-collapse" class="accordion-collapse collapse show" aria-labelledby="report-heading">
                            <!-- 排序 -->
                            <div class="sort-content">
                            <div class="btn-group">
                                <button type="button" class="btn" @click="sortByTime(reviewItemArr)">排序</button>
                                <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>{{ sortTypeName }}</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" @click="sortByTime(reviewItemArr)">按申诉时间降序</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByTimeReverse(reviewItemArr)">按申诉时间升序</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByState(reviewItemArr)">按状态</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" @click="sortByStateReverse(reviewItemArr)">按状态逆序</a></li>
                                </ul>
                            </div>
                            </div>
                            <div class="accordion-body">
                                <ul class="report" v-if="reviewItemArr!==[]">
                                    <li class="report-every wow animate__animated animate__flipInX" v-for="(item, index) in reviewItemArr" :key="index">
                                        <div class="item-wrapper">
                                            <div class="item-identity-content item-content">
                                                <div class="item-identity item-identity-piece item-piece" v-if="item.reviewSignal">
                                                    <div class="item-buyer item-piece">
                                                        <div>买家id：<span class="item-span">{{ item.ida }}</span></div>
                                                        <div>买家账户：<span class="item-span">{{ item.userNameA }}</span></div>
                                                    </div>
                                                    <div class="item-seller item-piece">
                                                        <div>卖家id：<span class="item-span">{{ item.idb }}</span></div>
                                                        <div>卖家账户：<span class="item-span">{{ item.userNameB }}</span></div>
                                                    </div>
                                                    
                                                </div>
                                                <div class="item-tid item-identity-piece item-piece" v-if="!item.reviewSignal">
                                                    TID：<span class="item-span">{{ item.tid }}</span>
                                                </div>
                                            </div>
                                            <div class="item-info-content item-content">
                                                <div class="item-time-content item-piece">
                                                    <div class="item-time">
                                                        <!-- 上诉时间：<span class="item-span">{{ item.time.split('T')[0] +' '+ item.time.split('T')[1].slice(0,-10)}}</span> -->
                                                        上诉时间：<span class="item-span">{{item.time.slice(0,-4)}}</span>
                                                    </div>
                                                </div>
                                                <div class="item-state">
                                                    状态：
                                                    <span class="item-span"
                                                    :style="item.state===1?'color: green;':(item.state === 0? 'color:gray;':'color:red;')"
                                                    >
                                                    {{ item.state === 1?"已审核":(item.state === 0?"暂未审核":"已拒绝") }}
                                                    </span>
                                                </div>
                                                <div class="item-detail-content item-inner-content" v-if="item.reviewSignal">
                                                    <div class="item-detail item-piece">
                                                        交易详情：<br />
                                                        <span class="item-span" v-if="item.detail">【总价】{{ Number(item.detail.split('||')[0]).toFixed(3) + '元' }} </span>
                                                        <br v-if="item.detail" />
                                                        <span class="item-span" v-if="item.detail">【单价】{{ (item.detail.split('||')[0]/item.detail.split('||')[1]).toFixed(3) + '元/KWH' }} </span>
                                                        <br v-if="item.detail" />
                                                        <span class="item-span" v-if="item.detail">【交易量】{{ item.detail.split('||')[1] + 'KWH' }} </span>
                                                        <span class="item-span" v-if="!item.detail">交易未完成或被拒绝</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item-text-content item-content">
                                                <div class="item-reason-content item-text-inner">
                                                    <div class="item-reason">
                                                        <div>申诉理由：<span class="item-span">{{ item.reason }}</span></div>
                                                    </div>
                                                </div>
                                                <div class="item-result-content item-text-inner">
                                                    <div class="item-process">
                                                        <div>处理反馈：</div>
                                                        <textarea class="form-control" v-model="item.process" rows="1.5"></textarea>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            <div class="btn-wrapper">
                                                <div class="btn-content">
                                                    <div class="review-btn" v-if="!item.reviewSignal">
                                                        <button @click="traceBack(item)">审 查</button>
                                                    </div>
                                                    <div class="submit-btn" v-if="item.reviewSignal">
                                                        <button @click="submitResult(item)">提 交</button>
                                                    </div>
                                                    <div class="reject-btn">
                                                        <button @click="rejectReport(item)">拒 绝</button>
                                                    </div>
                                                </div>
                                                
                                                <!-- <div class="btn-content" v-if="item.reviewSignal">
                                                    <div class="pass-btn">
                                                        <button>通 过</button>
                                                    </div>
                                                    <div class="reject-btn">
                                                        <button>驳 回</button>
                                                    </div>
                                                </div>       -->
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
    name: 'report-handle',
    data() {
        return {
            sortTypeName: '默认'
        }
    },
    computed: {
        ...mapState({
            reviewItemArr: state => state.marketSupervision.reviewItemArr,
        })
    },
    methods: {
        //排序
        sortByTime(arr) {
          arr.sort((a, b) => {return a.time<b.time?1:-1})
          this.sortTypeName = '按申诉时间降序'
        },
        sortByTimeReverse(arr) {
          this.sortTypeName = '按申诉时间升序'
          arr.sort((a, b) => {return a.time>b.time?1:-1})
        },
        sortByState(arr) {
          arr.sort((a, b) => {return b.state - a.state})
          this.sortTypeName = '按状态'
        },
        sortByStateReverse(arr) {
          arr.sort((a, b) => {return a.state - b.state})
          this.sortTypeName = '按状态逆序'
        },
        async traceBack(item) {
            await this.$store.dispatch('getC_revoke', item)
        },
        async submitResult(item) {
            this.$pop().popMsg('确认递交处理结果吗？')
            await this.$bus.$on('popConfirm', () => {
                item.tempState = 1
                this.$store.dispatch('passOrRejectReport', item)
            })
        },
        async rejectReport(item) {
            this.$pop().popMsg('拒绝追溯此笔交易吗？')
            await this.$bus.$on('popConfirm', () => {
                item.tempState = -1
                this.$store.dispatch('passOrRejectReport', item)
            })
        }
    },
    async mounted() {
        await this.$store.dispatch('getReviewArr')
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
.report-handle {
    width: 100%;
    min-height: calc(100vh);
    background-color: lighten($theme-color, 5);
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-display {
    width: 100%;
    min-height: calc(90vh);
    background-color: #f7f7f7;
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
        .title {
            padding-left: 5%;
            height: 100%;
            display: flex;
            align-items: center;
            font-weight: bolder;
            font-size: 2rem;
            letter-spacing: 0.2rem;
            color: #fff;
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
                color: $font-color;
                list-style: none;
                padding: 2rem 1rem;
                margin-top: 0.2rem;
                width: 100%;
                border-radius: 2rem;
                // border: 0.05rem solid $theme-color;
                border-top: none;
                border-bottom: 0.5rem solid $theme-color;
                // background-image: linear-gradient(360deg, lighten($theme-color, 39), #fff 97%);
                background-image: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255, 0.9) 40%), url('@/assets/image/admin-page/report-handle/report-bg.jpg');
                background-repeat: no-repeat;
                // background-size: cover;
                .item-wrapper{
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .item-span {
                        font-weight: 800;
                        color: darken($font-color, 10);
                        font-size: 0.9rem;
                        word-break: break-word;
                    }
                    .item-identity-content {
                        width: 25%;
                        word-break: break-word;
                        padding: 1rem;
                        .item-identity {
                            .item-piece {
                                display: flex;
                                flex-direction: column;
                            }
                        }
                    }
                    .item-info-content {
                        width: 30%;
                        padding: 0 2rem;
                    }
                    .item-text-content {
                        width: 25%;
                        .item-text-inner {
                            display: flex;
                            flex-direction: column;
                            textarea {
                                font-weight: 800;
                                font-size: 0.9rem;
                            }
                        }
                    }
                    
                    .btn-wrapper {
                        .btn-content {
                            display: flex;
                            height: 100%;
                            flex-wrap: wrap;
                            align-content: space-around;
                            // flex-direction: column;
                            button {
                                color: #fff;
                                font-weight: 700;
                                margin: 0.2rem 0.2rem;
                                padding: 0.4rem 0.4rem;
                                border-radius: 0.5rem;
                                transition: 0.3s ease;
                            }
                            .pass-btn  button{
                                background-color: rgb(45, 110, 45);
                                &:hover {
                                    background-color: rgb(65, 172, 65);
                                }
                            }
                            .submit-btn  button{
                                background-color: rgb(45, 110, 45);
                                &:hover {
                                    background-color: rgb(65, 172, 65);
                                }
                            }
                            .reject-btn button {
                                background-color: rgb(186, 67, 67);
                                &:hover {
                                    background-color: red;
                                }
                            }
                            .review-btn  button{
                                background-color: $theme-color;
                                &:hover {
                                    background-color: $theme-color-dark;
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