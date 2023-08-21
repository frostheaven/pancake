// 自定义弹窗脚本
import Vue from 'vue'
import popUp from '@/components/pop-up/pop-up.vue'

const popUpTemplate = Vue.extend(popUp)

popUp.install = () => {
    let popUpInstance = new popUpTemplate({}).$mount()
    return {
        /**
         * 
         * @param {string} message 提示信息
         * @param {string} confirmText 可选，更改“确认”按钮名字
         * @param {string} cancelText 可选，更改“取消”按钮名字
         */
        popMsg(message, confirmText, cancelText){
            if(!document.querySelector('#pop-up')){
                if(confirmText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = confirmText
                if(cancelText)popUpInstance.$el.querySelector('#popCancelBtn').innerText = cancelText
                popUpInstance.$el.querySelector('#message').innerHTML = message
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            }        
        },
        popRemove(){
            document.querySelector('#pop-up').remove()
            document.body.style.overflow = ''
            popUpInstance.$destroy()
            popUpInstance.$el.remove()
        },
        // 只有“确认”按钮
        popMsgOnlyConfirm(message, btnText) {
            if(!document.querySelector('#pop-up')){
                popUpInstance.$el.querySelector('#popCancelBtn').style.display = 'none'
                if(btnText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = btnText
                popUpInstance.$el.querySelector('#message').innerHTML = message
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            } 
        },
        //只有“取消”按钮
        popMsgOnlyCancel(message, btnText) {
            if(!document.querySelector('#pop-up')){
                popUpInstance.$el.querySelector('#popConfirmBtn').style.display = 'none'
                if(btnText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = btnText
                popUpInstance.$el.querySelector('#message').innerHTML = message
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            } 
        },
        //仅提示信息
        popMsgOnly(message) {
            if(!document.querySelector('#pop-up')){
                popUpInstance.$el.querySelector('#popConfirmBtn').style.display = 'none'
                popUpInstance.$el.querySelector('#popCancelBtn').style.display = 'none'
                popUpInstance.$el.querySelector('#message').innerHTML = message
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            }
        },
        //提示信息并自动返回
        popMsgAutoReturn(message, returnTime) {
            if(!document.querySelector('#pop-up')){
                let timeRest = (returnTime? returnTime : 1)
                popUpInstance.$el.querySelector('#popConfirmBtn').style.display = 'none'
                popUpInstance.$el.querySelector('#popCancelBtn').style.display = 'none'
                // popUpInstance.$el.querySelector('#message').innerHTML = message + timeRest + 's后返回...'
                popUpInstance.$el.querySelector('#message').innerHTML = message + '即将返回页面...'
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
                let timer = setInterval(() => {
                    if(timeRest >= 0)timeRest-=0.1
                    else{
                        this.popRemove()
                        clearInterval(timer)
                    }
                }, 100);
            } 
        },
        //创建一个input框用于复制文本
        popMsgToCopy(message, inputText, confirmText, cancelText) {
            if(!document.querySelector('#pop-up')){
                if(confirmText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = confirmText
                if(cancelText)popUpInstance.$el.querySelector('#popCancelBtn').innerText = cancelText
                popUpInstance.$el.querySelector('#message').innerHTML = message
                popUpInstance.$el.querySelector('#inputToCopy').style.display = ''
                popUpInstance.$el.querySelector('#inputToCopy').style['pointer-events'] = none //设置input框不可选
                popUpInstance.$el.querySelector('#popCopyBtn').style.display = ''
                popUpInstance.$el.querySelector('#inputToCopy').innerText = inputText
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            }
        },
        //创建一个input框用于复制文本，仅“确认”按钮
        popMsgOnlyConfirmToCopy(message, inputText, btnText) {
            if(!document.querySelector('#pop-up')){
                popUpInstance.$el.querySelector('#popCancelBtn').style.display = 'none'
                if(btnText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = btnText
                popUpInstance.$el.querySelector('#message').innerHTML = message
                popUpInstance.$el.querySelector('#inputToCopy').style.display = ''
                popUpInstance.$el.querySelector('#popCopyBtn').style.display = ''
                popUpInstance.$el.querySelector('#inputToCopy').placeholder = inputText
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            }
        },
        //创建一个input框用于粘贴文本
        popMsgToPaste(message, confirmText, cancelText) {
            if(!document.querySelector('#pop-up')){
                if(confirmText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = confirmText
                if(cancelText)popUpInstance.$el.querySelector('#popCancelBtn').innerText = cancelText
                popUpInstance.$el.querySelector('#message').innerHTML = message
                popUpInstance.$el.querySelector('#inputToPaste').style.display = ''
                popUpInstance.$el.querySelector('#popPasteBtn').style.display = ''
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            }
        },
        //创建一个input框用于提交内容
        popMsgWithInput(message, placeholderText, confirmText, cancelText) {
            if(!document.querySelector('#pop-up')){
                if(message)popUpInstance.$el.querySelector('#message').innerHTML = message
                if(placeholderText)popUpInstance.$el.querySelector('#inputToSubmit').placeholder = placeholderText
                if(confirmText)popUpInstance.$el.querySelector('#popConfirmBtn').innerText = confirmText
                if(cancelText)popUpInstance.$el.querySelector('#popCancelBtn').innerText = cancelText
                popUpInstance.$el.querySelector('#inputToSubmit').style.display = ''
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popUpInstance.$el)
            }
        }

    }
}

export default popUp


