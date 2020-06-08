<!-- 详情页 -->
<template>
    <div>
        <div class="headband"></div>
        <section class="container">
            <el-row>
                <!-- <el-row :gutter="20" type="flex" justify="center"> -->
                <el-col class="left-mian" :xs="24">
                    <web-header />
                    <web-aside />
                </el-col>

                <el-col class="right-mian">
                    <web-menu />
                    <web-article-show />
                </el-col>
            </el-row>
        </section>
        <web-footer />
    </div>
</template>

<script>
import WebHeader from '@/components/Header.vue'
import WebAside from '@/components/Aside.vue'
import WebFooter from '@/components/Footer.vue'
import WebArticleShow from '@/components/ArticleShow.vue'
import WebMenu from '@/components/Menu.vue'

export default {
    name:'Show',
    // data () {
    // },
    components: {
        WebHeader,
        WebFooter,
        WebArticleShow,
        WebAside,
        WebMenu
    },
    // mounted () {

    // }
    // methods: {
    //     routeChange () {
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