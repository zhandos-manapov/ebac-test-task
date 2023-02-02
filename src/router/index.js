import { createRouter, createWebHistory } from "vue-router";
import VProfile from '../views/VProfile';

const routes = [
    {
        path: '',
        redirect: '/profile'
    },
    {
        path: '/profile',
        name: 'VProfile',
        component: VProfile
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router