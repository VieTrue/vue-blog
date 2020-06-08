<!-- 侧栏 上 公用 -->

<template>
    <header ref="header">
        <el-row class="header-black" type="flex" justify="space-between">
            <el-col :span="4" class="hidden-md-and-up header-nav-toggle">
                <div class="toggle" aria-label="切换导航栏" @click="isMenuShow = !isMenuShow" v-bind:class="{ 'toggle-close': isMenuShow }">
                    <span class="toggle-line toggle-line-first"></span>
                    <span class="toggle-line toggle-line-middle"></span>
                    <span class="toggle-line toggle-line-last"></span>
                </div>
            </el-col>
            <el-col :span="16" :md="24" class="header-nav-text">
                <p class="title">Next</p>
                <p class="description">Theme for Hexo</p>
            </el-col>
            <el-col :span="4" class="hidden-md-and-up header-nav-search">
                <div class="search">
                    <router-link :to="{ name: 'Search'}"><i class="el-icon-search"></i></router-link>
                </div>
            </el-col>
        </el-row>
        <div class="header-nav" v-show="isMenuShow">
            <el-menu default-active="2" class="el-menu-vertical-demo" router>
                <el-menu-item v-for="(item, index) in MenuList" :key="'menu'+index" :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            isMenuShow: false,
            MenuList:[
                {title:'首页',path:'/home',icon:'el-icon-menu'},
                {title:'导航1',path:'/list/1',icon:'el-icon-document'},
                {title:'关于',path:'/about',icon:'el-icon-setting'},
                {title:'搜索',path:'/search',icon:'el-icon-search'},
            ]
        }
    },
    // components: { //定义组件
    // },
    // methods: {
    //     routeChange () {
    //         console.log('Header')
    //     }
    // },
    // watch: {
    //     '$route':'routeChange'
    // },
    // created() {
    //     this.routeChange()
    // }
}
</script>
