import {createRouter, createWebHistory} from 'vue-router'
import BotUiHome from "@/views/bot-ui/bot-ui-home.vue"
import ModelOperateView from "@/views/bot-ui/operate/model-operate-view.vue";

export const BotUiPath = {
    OPERATE: 'operate'
}

const routes = [
    {
        path: '/',
        redirect: "/ui",
    },
    {
        path: '/ui',
        component: BotUiHome,
        meta: {title: 'Bot Home'},
        redirect: "/ui/operate",
        children: [
            {
                path: BotUiPath.OPERATE,
                component: ModelOperateView,
                meta: {
                    title: 'Operate'
                }
            }
        ]
    },
]


const router = createRouter({
    history: createWebHistory('/app/'),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta?.title) {
        document.title = to.meta.title as string
    }
    next()
})

export default router
