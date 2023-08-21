<template>
    <div id="pop-sell-form">
        <div class="window-wrapper">
            <div class="window-content wow animate__animated animate__zoomIn">
                <div class="window-title">
                    <div class="title">快速出售</div>
                </div>
                <div class="window-display">
                    <div class="window-inside">
                        <div class="sell-name-wrapper">
                            项目名称：<input type="text" v-model="sellItemName">
                        </div>
                        <div class="sell-body">
                            <div class="sell-term-wrapper">
                                <div class="sell-term-content">
                                    交易周期：<br />
                                    <input type="text" placeholder="起始日期" v-model="sellTerm.startDate">
                                    <span> - </span>
                                    <input type="text" placeholder="截止日期" v-model="sellTerm.endDate">
                                </div>
                            </div>
                            <div class="sell-info-wrapper">
                                <div class="sell-stock-content sell-info-content">
                                    出售电量：<br />
                                    <input type="number" v-model="sellCount">
                                </div>
                                <div class="sell-price-content sell-info-content">
                                    出售电价：<br />
                                    <input type="number" v-model="sellPrice">
                                </div>
                                
                            </div> 
                        </div>
                    </div>
                    <div class="window-bottom">
                        <div class="btn-wrapper">
                            <button @click="confirmSell" class="confirm-btn bottom-btn" id="popConfirmBtn">完 成</button>
                            <button @click.once="cancelSell" class="cancel-btn bottom-btn" id="popCancelBtn">取 消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pop-sell-form',
    data() {
        return {
            sellItemName: '',
            sellPrice: '',
            sellCount: '',
            sellTerm: {
                startDate: '',
                endDate: ''
            }
        }
    },
    methods: {
        async confirmSell(){
            if(!this.sellItemName || !this.sellPrice || !this.sellCount)this.$pop().popMsgOnlyConfirm('请填写完整信息！')
            else{
                let sellInfo = {
                    projectName: this.sellItemName,
                    price: this.sellPrice,
                    stock: this.sellCount,
                    contractTerm: (this.sellTerm.startDate || '') + '-' + (this.sellTerm.endDate || '')
                }
                await this.$bus.$emit('popConfirmSell', sellInfo) //设置全局事件
                this.$bus.$off('popConfirmSell') //解绑事件，否则重复调用！
                this.$popSellForm().popRemoveSellForm()
            } 
        },
        async cancelSell(){
            await this.$bus.$emit('popCancelSell')
            this.$bus.$off('popCancelSell')
            this.$popSellForm().popRemoveSellForm()
        },
    },
    mounted() {
        // console.log('current',this.currentTrade)
    },
}
</script>

<style lang="scss" scoped>
    #pop-sell-form {
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
            height: 45%;
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
                background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255, 0.3)), url('@/assets/image/user-trade/power-sell/sell-bg.jpg');
                .window-inside {
                    width: 100%;
                    height: 80%;
                    padding: 3%;
                    letter-spacing: 2px;
                    font-weight: 1000;
                    .sell-name-wrapper {
                        width: 100%;
                        height: 15%;
                        input {
                            border-radius: 2rem;
                            padding: 0.1rem 0.6rem;
                            width: 40%;
                        } 
                    }
                    .sell-body {
                        margin-top: 3%;
                        height: 80%;
                        .sell-term-wrapper {
                            width: 100%;
                            height: 40%;
                            .sell-term-content {
                                width: 100%;
                                height: 100%;
                                input {
                                    margin-top: 3%;
                                }
                            }
                            
                        }
                        .sell-info-wrapper {
                            margin-top: 3%;
                            display: flex;
                            width: 100%;
                            flex-wrap: wrap;
                            .sell-info-content {
                                width: 40%;
                                input {
                                    margin-top: 3%;
                                    border-radius: 2rem;
                                    padding: 0.1rem 0.6rem;
                                    width: 70%;
                                }
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