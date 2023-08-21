// 自定义弹窗脚本
import Vue from 'vue'
import popTrade from '@/components/pop-up/pop-trade.vue'

const popTradeTemplate = Vue.extend(popTrade)

popTrade.install = (currentTrade) => {
    let popTradeInstance = new popTradeTemplate({
        data() {
            return {
                currentTrade: currentTrade
            }
        },
    }).$mount()
    return {
        popCreateTrade(){
            if(!document.querySelector('#pop-trade')){
                document.body.style.overflow = 'hidden'
                document.body.appendChild(popTradeInstance.$el)
            }
        },
        popRemoveTrade(){
            document.querySelector('#pop-trade').remove()
            document.body.style.overflow = ''
            popTradeInstance.$destroy()
            popTradeInstance.$el.remove()
        },
    }
}

export default popTrade


