// 自定义弹窗脚本
import Vue from 'vue'
import popSellForm from '@/components/pop-up/pop-sell-form.vue'

const popSellFormTemplate = Vue.extend(popSellForm)

popSellForm.install = () => {
    let popSellFormInstance = new popSellFormTemplate({}).$mount()
    return {
        popCreateSellForm(){
            if(!document.querySelector('#pop-sell-form')){
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popSellFormInstance.$el)
            }
        },
        popRemoveSellForm(){
            document.querySelector('#pop-sell-form').remove()
            document.body.style.overflow = ''
            popSellFormInstance.$destroy()
            popSellFormInstance.$el.remove()
        },
    }
}

export default popSellForm


