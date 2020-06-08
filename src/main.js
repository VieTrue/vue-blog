import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/css/style.less'
// 接口
import request from './request/request'
// 在原型上扩展,这样不用在每个页面都导入request
Vue.prototype.$api = request;

Vue.config.productionTip = false

// 设置页面title
router.beforeEach((to, from, next) => {
    if (to.params.keywords) {
        document.title = to.params.keywords
    } else if (to.params.tag) {
        document.title = to.params.tag;
    } else if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

Vue.use(ElementUI);
// Vue.component(CollapseTransition.name, CollapseTransition)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')