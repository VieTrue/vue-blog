<!-- 关于页面 -->
<template>
    <div>
        <div class="headband"></div>
        <section class="container">
            <el-row>
                <el-col class="left-mian" :xs="24">
                    <web-header />
                    <web-aside />
                </el-col>

                <el-col class="right-mian">
                    <web-menu />
                    <web-article-list />
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
import WebArticleList from '@/components/ArticleList.vue'
import WebMenu from '@/components/Menu.vue'

export default {
    name:'Home',
    components: { //定义组件
        WebHeader,
        WebFooter,
        WebAside,
        WebArticleList,
        WebMenu
    },
}
</script>