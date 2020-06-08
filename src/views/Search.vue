<!-- 首页 -->
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
import WebArticleList from '@/components/SearchList.vue'
export default {
    name:'SearchList',
    components: { //定义组件
        WebHeader,
        WebFooter,
        WebAside,
        WebArticleList
    }
}
</script>