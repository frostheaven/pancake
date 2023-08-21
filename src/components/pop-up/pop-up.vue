<template>
    <div id="pop-up">
        <div class="window-wrapper">
            <div class="window-content wow animate__animated animate__zoomIn">
                <div class="window-title">
                    <div class="title">提 示</div>
                </div>
                <div class="window-display">
                    <div class="window-inside">
                        <!-- 显示信息通过popMsg()调用，设置于pop-up-settings.js -->
                        <div id="message"></div>
                        <div class="input-wrapper">
                            <input type="text" id="inputToCopy" style="display: none;">
                            <button @click="copy" class="copy-btn inner-btn" id="popCopyBtn" style="display: none;">复制</button>
                            <input type="text" id="inputToPaste" placeholder="在此提供您的私钥" v-model="pasteText" style="display: none;">
                            <button @click="paste" class="paste-btn inner-btn" id="popPasteBtn" style="display: none;">粘贴</button>
                            <!-- <input type="text" id="inputToSubmit" v-model="submitText" style="display: none;"> -->
                             <textarea class="form-control" id="inputToSubmit" v-model="submitText" style="display: none;" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="window-bottom">
                        <div class="btn-wrapper">
                            <button @click.once="confirm" class="confirm-btn bottom-btn" id="popConfirmBtn">确 认</button>
                            <button @click.once="cancel" class="cancel-btn bottom-btn" id="popCancelBtn">取 消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pop-up',
    data() {
        return {
            pasteText: '',
            submitText: ''
        }
    },
    watch: {
        pasteText(newVal) {
            let pasteBtn = document.getElementById('popPasteBtn')           
            if(newVal === '')pasteBtn.innerText = '粘贴'
        },
    },
    methods: {
        async confirm(){
            await this.$bus.$emit('popConfirm', this.pasteText || this.submitText) //设置全局事件，传入内容
            this.$bus.$off('popConfirm') //解绑事件，否则重复调用！
            this.$pop().popRemove()
        },
        async cancel(){
            await this.$bus.$emit('popCancel')
            this.$bus.$off('popCancel')
            await this.$pop().popRemove()
        },
        copy() {
            let target = document.getElementById('inputToCopy');
            let copyText = target.placeholder
            navigator.clipboard.writeText(copyText)

            let copyBtn = document.getElementById('popCopyBtn')
            copyBtn.innerText = '已复制√'
        },
        async paste() {
            let target = document.getElementById('inputToPaste');
            const pasteText = await navigator.clipboard.readText()
            if(!target.value) {
                target.value = pasteText
                this.pasteText = target.value
                let pasteBtn = document.getElementById('popPasteBtn')
                pasteBtn.innerText = '已粘贴√'
            }
        },
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
    #pop-up {
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 999;
        top: 0;
        scroll-margin-top: 0;
        background-color: rgba(255, 255, 255, 0.3);
    }
    .window-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .window-content {
            height: 25%;
            width: 30%;
            border: 3px solid $theme-color;
            background-color: #fff;
            .window-title {
                width: 100%;
                height: 25%;
                display: flex;
                align-items: center;
                background-color: $theme-color;
                .title {
                    padding: 1rem;
                    font-weight: 900;
                    font-size: 1.5rem;
                    color: #fff;
                    font-style: italic;
                }
            }
            .window-display {
                width: 100%;
                height: 80%;
                .window-inside {
                    width: 100%;
                    height: 70%;
                    padding: 3%;
                    letter-spacing: 2px;
                    #message {
                        font-weight: 500;
                        font-size: 1.1rem;
                    }
                    .input-wrapper {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin-top: 2%;
                        #inputToCopy {
                            width: 60%;
                            border-radius: 2rem;
                            font-size: 0.8rem;
                            padding: 0.2rem;
                            pointer-events: none; //设置input框不可选
                        }
                        #inputToPaste {
                            width: 60%;
                            border-radius: 2rem;
                            font-size: 0.8rem;
                            padding: 0.2rem;
                        }
                        #inputToSubmit {
                            width: 100%;
                            height: 3rem;
                            font-size: 0.8rem;
                            letter-spacing: 1px;
                            padding: 0.5rem;
                        }
                        .inner-btn {
                            border-radius: 1rem;
                            font-size: 0.8rem;
                            padding: 0.2rem 0.6rem;
                            margin-left: 2%;
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
        font-size: 1.2rem;
        padding: 0.4rem 3.5rem;
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