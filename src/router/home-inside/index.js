import homepage from '@/pages/internal-page/homepage/homepage.vue'
import tradingFloor from '@/pages/internal-page/trading-floor/trading-floor.vue'
import searchDiscover from '@/pages/internal-page/search-discover/search-discover.vue'
import help from '@/pages/internal-page/help/help.vue'

const route = [
    {
        path: 'homepage',
        name: 'homepage',
        component: homepage,
        meta: {
            keepAlive: false, requireAuth: false
        }
    },
    {
        path: 'trading-floor',
        name: 'trading-floor',
        component: tradingFloor,
        meta: {
            keepAlive: false, requireAuth: false,
        }
    },
    {
        path: 'search-discover',
        name: 'search-discover',
        component: searchDiscover,
        meta: {
            keepAlive: true, requireAuth: false
        }
    },
    {
        path: 'help',
        name: 'help',
        component: help,
        meta: {
            keepAlive: false, requireAuth: false
        }
    }
]

export default route