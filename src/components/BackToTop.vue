<!-- 返回顶部 公用 -->

<template>
    <el-collapse-transition>
        <div class="backtop" v-show="isShowPercenTage" @click="backToTop">
            <i class="el-icon-top"></i>
            <span> {{ ShowPercenTage }}&thinsp;% </span>
        </div>
    </el-collapse-transition>
</template>

<script>
import {PageScrolling} from '../utils/function.js'
export default {
    name: 'BackToTop',
    props: {
        transitionName: {
            type: String,
            default: 'fade'
        },
        visibilityHeight: {
            type: Number,
            default: 150
        },
        backPosition: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            ShowPercenTage: 0,
            isShowPercenTage: false,
            interval: null
        }
    },
    mounted() {
        // 监听滚动事件
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll: function(e){
            let TotalHeight = e.target.documentElement.scrollHeight - window.innerHeight // 页面总高度
            var scrollTop = window.pageYOffset  // 当前位置高度
            this.ShowPercenTage = parseInt(scrollTop / TotalHeight * 100)
            if (scrollTop >= this.visibilityHeight) {
                this.isShowPercenTage = true
            } else {
                this.isShowPercenTage = false
            }
        },

        backToTop() {
            PageScrolling(this.backPosition)
        },

    },
    // watch: {
    //     '$route':'routeChange'
    // },
    // created() { //生命周期函数
    //     this.backToTop(this.backPosition)
    // }
}
</script>

