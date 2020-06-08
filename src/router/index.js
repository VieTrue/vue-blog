import Vue from 'vue'
import Router from 'vue-router'
import { PageScrolling } from '../utils/function.js'
Vue.use(Router)

export default new Router({
    scrollBehavior(to, from, savePosition) {
        // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
        if (savePosition) {
            PageScrolling(savePosition.y)
        } else {
            PageScrolling(0)
        }
    },
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            children: [{
                path: 'home',
                name: 'Home',
                meta: { title: '首页', keywords: '', auth: false },
            }],
            component: resolve => require(['../views/Home.vue'], resolve),
            meta: { title: '首页', keywords: '', auth: false },
        },
        {
            path: '/list/:cid(\\d+)',
            name: 'List',
            component: resolve => require(['../views/List.vue'], resolve),
            meta: { title: '列表', keywords: '', auth: false },
        },
        {
            path: '/tags/:tag',
            name: 'Tags',
            component: resolve => require(['../views/TagsList.vue'], resolve),
            meta: { title: '标签', keywords: '', auth: false },
        },
        {
            path: '/search',
            name: 'Search',
            // children: [{
            //     path: ':keywords',
            //     name: 'Home',
            //     meta: { title: '', keywords: '', auth: false },
            // }],
            component: resolve => require(['../views/Search.vue'], resolve),
            meta: { title: '搜索', keywords: '', auth: false },
        },
        {
            path: '/show/:aid(\\d+)',
            name: 'Show',
            component: resolve => require(['../views/Show.vue'], resolve),
            meta: { title: '详情', keywords: '', auth: false },
        },
        {
            path: '/about',
            name: 'About',
            component: resolve => require(['../views/About.vue'], resolve),
            meta: { title: '关于我', keywords: '', auth: false },
        },
        {
            path: '*',
            name: 'notFound',
            component: resolve => require(['../404.vue'], resolve),
            meta: { title: '404', keywords: '', auth: false },
        }
    ]
})