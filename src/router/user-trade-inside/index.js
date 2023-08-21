import powerBuy from '@/pages/external-page/user-trade/power-buy/power-buy.vue'
import powerSell from '@/pages/external-page/user-trade/power-sell/power-sell.vue'
import tradeCheck from '@/pages/external-page/user-trade/trade-check/trade-check.vue'

const route = [
    {
        path: 'power-buy',
        name: 'power-buy',
        component: powerBuy,
        meta: {
            keepAlive: true, requireAuth: true
        }
    },
    {
        path: 'power-sell',
        name: 'power-sell',
        component: powerSell,
        meta: {
            keepAlive: true, requireAuth: true,
        }
    },
    {
        path: 'trade-check',
        name: 'trade-check',
        component: tradeCheck,
        meta: {
            keepAlive: true, requireAuth: true
        }
    },
]

export default route