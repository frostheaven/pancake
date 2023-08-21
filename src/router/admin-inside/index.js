import reportHandle from '@/pages/external-page/admin-page/report-handle/report-handle.vue'
import registerApproval from '@/pages/external-page/admin-page/register-approval/register-approval.vue'

const route = [
    {
        path: 'report-handle',
        name: 'report-handle',
        component: reportHandle,
        meta: {
            keepAlive: true, requireAuth: true, requireAdmin: true
        }
    },
    {
        path: 'register-approval',
        name: 'register-approval',
        component: registerApproval,
        meta: {
            keepAlive: true, requireAuth: true, requireAdmin: true
        }
    }
    
]

export default route