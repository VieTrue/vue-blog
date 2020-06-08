<template>
    <div id="app">
        <!-- <keep-alive :include="['Aside', 'Hearder', 'Footer', 'BackToTop']"> -->
        <!-- <transition> -->
        <router-view />
        <!-- </transition> -->
        <!-- </keep-alive> -->
    </div>
</template>

<script>
export default {
  name: 'App',
    methods: {
        routeChange () {
            var vm = this
            if (vm.$route.meta.auth) {
                // console.log('权限')
            }
        }
    },
    watch: {
        '$route':'routeChange'
    },
    created() {
        var vm = this
        // 获取用户信息
        vm.$api.getUserInfo().then(res => {
            if (res) {
                document.querySelector('meta[name="author"]').setAttribute('content',res.data.name)
                vm.$store.commit('setUserInfo',res.data)
            }

        })
        // 获取分类列表
        vm.$api.getCategoryList().then(res => {
            if (res) {
                vm.$store.commit('setCategoryList',res.data)
            }
        })

    }
}
</script>

