import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
    UserInfo: {
        name: 'name',
        avatar: '',
        info: 'php是世界上最好的语言！'
    },
    CategoryList: {},
    Config: {
        Pages: 10,
        Id: 0,
        Cid: 0

    }
    // loading: false,
    // UserList: [111, 222, 333], //用户列表
    // themeObj: 0, //主题
    // aboutmeObj: '', //关于我的信息
    // host: "http://" + window.location.host + "/port/", //接口路径
    // keywords: '', //关键词
    // errorImg: 'this.onerror=null;this.src="' + require('../../static/img/tou.jpg') + '"'
}

export default new Vuex.Store({
    state,
    mutations: {
        setUserInfo(state, info) {
            state.UserInfo = info
        },
        setCategoryList(state, info) {
            state.CategoryList = info
        },
        // setConfig(state, info) {
        //     state.CategoryList = info
        // }

    }
})