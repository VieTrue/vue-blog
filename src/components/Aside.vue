<!-- 侧栏 下 公用 -->

<template>
    <aside v-bind:class="{ 'aside-fixed': isAsideFixed }">
        <div class="aside-tab">
            <!-- <div @click="isTabStyle = !isTabStyle">34532</div> -->
            <el-row class="aside-tab-toggle" type="flex" justify="center" v-show="isTabStyle" :gutter="6">
                <el-col :span="8">
                    <div @click="ToggleAsideTab(true)" v-bind:class="{ 'active': isAsideTab }" class="tab-toggle"> 目录 </div>
                </el-col>
                <el-col :span="8">
                    <div @click="ToggleAsideTab(false)" v-bind:class="{ 'active': !isAsideTab }" class="tab-toggle"> 信息 </div>
                </el-col>
            </el-row>
            <div class="aside-tab-main">
                <div v-show="isAsideTab && isTabStyle" class="tab-catalog">
                    <ul>
                        <li v-for="(item, index) in MenuData" :key="'tagm'+index">
                            <a :class="{'active':item.minheight < scrollTop && scrollTop < item.maxheight}" @click="scrollPage(item.minheight+1)"> {{item.title}} </a>
                        </li>
                    </ul>
                </div>
                <div v-show="!isAsideTab | !isTabStyle" class="tab-author">
                    <div>
                        <el-avatar :size="120" :src="$store.state.UserInfo.avatar"></el-avatar>
                        <p class="author-name"> {{$store.state.UserInfo.name}} </p>
                        <p class="author-desc"> {{$store.state.UserInfo.info}} </p>
                        <el-row class="author-other" type="flex" justify="center" :gutter="16">
                            <el-col><i class="el-icon-user"></i></el-col>
                            <el-col><i class="el-icon-star-off"></i></el-col>
                            <el-col><i class="el-icon-help"></i></el-col>
                        </el-row>

                    </div>
                </div>
            </div>

        </div>
        <back-to-top />
    </aside>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue'
import {PageScrolling} from '../utils/function.js'
// import {Typeit} from '../utils/plug.js'
export default {
    name: 'Aside',
    data () {
        return {
            isAsideTab: true,
            isAsideFixed: false,
            isTabStyle: false,
            scrollTop: 0,
            MenuData: []
        }
    },
    components: {
        BackToTop
    },
    mounted() {
        var vm = this
        vm.scrollTop = window.pageYOffset
        vm.AsideFixed()

        // 监听滚动事件
        window.addEventListener('scroll', vm.handleScroll)
    },
    methods: {
        ToggleAsideTab: function(bool){
            var vm = this;
            vm.isAsideTab = bool
        },
        handleScroll: function(e){
            var vm = this;
            let TotalHeight = e.target.documentElement.scrollHeight - window.innerHeight // 页面滚动总高度
            vm.scrollTop = window.pageYOffset // 当前位置高度
            vm.ShowPercenTage = parseInt(vm.scrollTop / TotalHeight * 100)
            vm.AsideFixed()
        },
        ChangeMenu () {
            var vm = this;
            var commentDom = document.querySelector("#comment");
            let menulist = []
            if (vm.$route.name === 'Show') {
                menulist = document.getElementById('vShowContent').getElementsByTagName('h3');
                vm.isTabStyle = true
            } else {
                return;
            }
            if (menulist.length === 0 && !commentDom) {
                vm.isTabStyle = false
                return
            }
            let data = []
            for(var i = 0; i < menulist.length; i++){
                data[i] = {
                    title: menulist[i].innerText,
                    path: menulist[i].childNodes[0].id,
                    minheight: menulist[i].offsetTop+210,
                    maxheight: 0,
                }
            }
            if (commentDom) {
                data[i] = {
                    title:'评论',
                    path: 'comment',
                    minheight: commentDom.offsetTop+5,
                    maxheight: 0,
                }
            }
            data.reverse()
            let maxheight = document.documentElement.scrollHeight;
            for(var i = 0; i < menulist.length; i++){
                data[i].maxheight = maxheight
                maxheight = data[i].minheight
            }
            vm.MenuData = data.reverse()
        },
        AsideFixed () {
            var vm = this;
            let HeaderHeight = document.querySelector("header").offsetHeight // header高度
            vm.scrollTop >= HeaderHeight ? vm.isAsideFixed = true : vm.isAsideFixed = false
        },
        scrollPage (height) {
            PageScrolling(height)
        },
        routeChange () {
            var vm = this;
            const timer = setInterval(() => {
                // 页面加载1秒后执行
                vm.ChangeMenu()
                console.log(1)
                clearInterval(timer);
            }, 1000);
        }
    },
    watch: {
        '$route':'routeChange',
    },
    created() {
        var vm = this;
        vm.routeChange()
    }
}
</script>

