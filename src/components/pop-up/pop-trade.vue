<template>
    <div id="pop-trade">
        <div class="window-wrapper">
            <div class="window-content wow animate__animated animate__zoomIn">
                <div class="window-title">
                    <div class="title">交易协商</div>
                </div>
                <div class="window-display">
                    <div class="window-inside">
                        <div class="trade-name-wrapper">
                            交易项目：<br />
                            <span id="trade-name">{{currentTrade?currentTrade.projectName : ''}}</span>
                        </div>
                        <div class="trade-body">
                            <div class="trade-sold-wrapper trade-info-wrapper">
                                <div class="trade-sold-content trade-info-content">
                                    可交易电量（·KWH）：<br />
                                    <span id="trade-sold">{{currentTrade?currentTrade.stock : ''}}</span>
                                </div>
                                <div class="change-sold-content change-info-content">
                                    <div class="change-input-wrapper">
                                         <div class="change-input-title">计划购买量：</div>
                                        <input type="number" class="change-input" v-model="applyCount" 
                                        :placeholder="currentTrade?currentTrade.stock : ''">
                                    </div>
                                </div>
                            </div>

                            <div class="trade-price-wrapper trade-info-wrapper">
                                <div class="trade-price-content trade-info-content">
                                    交易电价（元/度）：<br />
                                    <span id="trade-price">{{currentTrade?currentTrade.price : ''}}</span>
                                </div>
                                <div class="change-price-content change-info-content">
                                    <div class="change-input-wrapper">
                                        <div class="change-input-title">价格预期：</div>
                                        <input type="number" class="change-input" v-model.number="applyPrice" 
                                        :placeholder="currentTrade?currentTrade.price : ''">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="key-input-wrapper">
                            <input type="password" id="inputToPaste" placeholder="在此提供您的私钥" v-model="buyerPrKey">
                            <button @click="paste" class="paste-btn inner-btn" id="popPasteBtn">粘贴</button>
                        </div> -->
                    </div>
                    <div class="window-bottom">
                        <div class="btn-wrapper">
                            <button @click="confirmPurchase" class="confirm-btn bottom-btn" id="popConfirmBtn">完 成</button>
                            <button @click.once="cancelPurchase" class="cancel-btn bottom-btn" id="popCancelBtn">取 消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pop-trade',
    data() {
        return {
            applyPrice: '',
            applyCount: '',
            buyerPrKey: ''
        }
    },
    watch: {
        applyCount(newVal) {
            if (parseInt(newVal) > parseInt(this.currentTrade.stock)){
                this.applyCount = this.currentTrade.stock
                this.applyCount.replace(/^0+\./g,'0.').replace(/^[0]+/,'')
            }
        },
        applyPrice(newVal) {
            if(newVal < 0)this.applyPrice = 0
            this.applyPrice.replace(/^0+\./g,'0.').replace(/^[0]+/,'')
        },
        // buyerPrKey(newVal) {
        //     let pasteBtn = document.getElementById('popPasteBtn')           
        //     if(newVal === '')pasteBtn.innerText = '粘贴'
        // }
    },
    methods: {
        async confirmPurchase(){
            // if(!this.buyerPrKey)this.$pop().popMsgOnlyConfirm('请提供您的私钥！')
            // else{
                let applyInfo = {
                    projectName: this.currentTrade.projectName,
                    price: this.applyPrice? this.applyPrice : this.currentTrade.price,
                    count: this.applyCount? this.applyCount : this.currentTrade.stock,
                    // sk: this.buyerPrKey //用户私钥
                }
                await this.$bus.$emit('popConfirmPurchase', applyInfo) //设置全局事件
                this.$bus.$off('popConfirmPurchase') //解绑事件，否则重复调用！
                this.$popTrade().popRemoveTrade()
            // }  
        },
        async cancelPurchase(){
            await this.$bus.$emit('popCancelPurchase')
            this.$bus.$off('popCancelPurchase')
            await this.$popTrade().popRemoveTrade()
        },
        async paste() {
            let target = document.getElementById('inputToPaste');
            const pasteText = await navigator.clipboard.readText()
            if(!target.value) {
                target.value = pasteText
                this.buyerPrKey = target.value
                let pasteBtn = document.getElementById('popPasteBtn')
                pasteBtn.innerText = '已粘贴√'
            }
        }
    },
    mounted() {
        // console.log('current',this.currentTrade)
    },
}
</script>

<style lang="scss" scoped>
    #pop-trade {
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 998;
        top: 0;
        scroll-margin-top: 0;
        background-color: rgba(255, 255, 255, 0.8);
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .window-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .window-content {
            height: 55%;
            width: 40%;
            border: 3px solid $theme-color;
            background-color: #fff;
            .window-title {
                width: 100%;
                height: 10%;
                display: flex;
                align-items: center;
                background-color: $theme-color;
                .title {
                    padding: 1rem;
                    font-weight: 900;
                    font-size: 1.2rem;
                    color: #fff;
                    font-style: italic;
                }
            }
            .window-display {
                width: 100%;
                height: 90%;
                background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255, 0.5)), url('@/assets/image/user-trade/power-buy/trade-bg.jpg');
                .window-inside {
                    width: 100%;
                    height: 80%;
                    padding: 5%;
                    letter-spacing: 2px;
                    font-weight: 1000;
                    .trade-name-wrapper {
                        width: 100%;
                        height: 15%;
                        span {
                            font-size: 1.3rem;
                            color: darken($theme-color, 25);
                            font-weight: 1000;
                        } 
                    }
                    .trade-body {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 8%;
                        height: 60%;
                        .trade-info-wrapper {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            .trade-info-content {
                                width: 100%;
                                height: 50%;
                                span {
                                    color: orange;
                                    font-size: 1.5rem;
                                }
                            }
                            .change-info-content {
                                width: 100%;
                                .change-input-wrapper {
                                    width: 100%;
                                    input {
                                        margin-top: 3%;
                                        border-radius: 2rem;
                                        padding: 0.3rem 0.8rem;
                                        width: 70%;
                                    }
                                }
                            }
                        }
                    }
                    
                    .key-input-wrapper {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin-top: 2%;
                        #inputToPaste {
                            width: 60%;
                            border-radius: 2rem;
                            font-size: 0.8rem;
                            padding: 0.4rem 0.6rem;
                        }
                        .inner-btn {
                            border-radius: 1rem;
                            font-size: 0.8rem;
                            padding: 0.4rem 0.6rem;
                            margin-left: 5%;
                            background-color: $theme-color;
                            color: #fff;
                            transition: 0.3s ease;
                            &:hover {
                                background-color: $theme-color-dark;
                            }
                        }
                    }
                    
                }
                .window-bottom {
                    width: 100%;
                    .btn-wrapper {
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                    }
                }
            }
        }
    }
    .bottom-btn {
        font-weight: 1000;
        font-size: 0.9rem;
        padding: 0.4rem 2.5rem;
        transition: 0.3s ease;
        box-shadow: -5px -5px 5px rgb(59, 59, 59);
        &:active {
            box-shadow: -2px -2px 2px rgb(59, 59, 59);
            transform: translate(-5%, -10%);
        }
    }
    .confirm-btn {
        background-color: $theme-color;
        color: #fff;
        &:hover {
            background-color: $theme-color-dark;
        }
    }
    .cancel-btn {
        background-color: #fff;
        color: $theme-color;
        &:hover {
            background-color: darken(#fff, 10);
        }
    }
</style>