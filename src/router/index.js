import { createRouter, createWebHashHistory } from "vue-router";

import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import Table from '@/views/Table.vue'
import User from '@/views/User.vue'
import MenuManage from '@/views/MenuManage.vue'
import Lunch from '@/views/Lunch.vue'
import { Loading } from '@/utils/loading'


const routes = [
    {
        path: "/",
        component: Login
    },
    {
        path: "/index",
        name: "Index",
        component: Index,
        children: [
            {
                path: "/table",
                name: "Table",
                component: Table
            },
            {
                path: "/user",
                name: "User",
                component: User
            },
            {
                path: "/menuManage",
                name: "MenuManage",
                component: MenuManage
            },
            {
                path: "/lunch",
                name: "Lunch",
                component: Lunch
            }
        ]
    },
    // 定義404頁面，動態路由
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from) => {
    console.log("beforeEach");
    Loading();
});


router.afterEach((to, from) => {
    console.log("afterEach");
    setTimeout(() => {
        Loading().close();
    }, 200);
});

export default router