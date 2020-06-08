<!-- 文章列表 公用 -->

<template>
    <main>

        <el-card class="box-card" shadow="hover" v-for="(item, index) in articleData" :key="'article'+index">
            <div slot="header" class="clearfix" v-if="item.desc">
                <h3 class="title">
                    <router-link :to="{ name: 'Show', params: { aid: item.id }}">{{item.title}}</router-link>
                </h3>
                <el-row class="info" type="flex" justify="center" :gutter="16">
                    <el-col title="修改时间"> <i class="el-icon-time"></i> <span> {{item.updated_at}} </span> </el-col>
                    <el-col title="浏览数"> <i class="el-icon-view"></i> <span> {{item.views}} </span> </el-col>
                    <el-col title="点赞数"> <i class="el-icon-star-off"></i> <span> {{item.likes}} </span> </el-col>
                    <el-col title="评论数"> <i class="el-icon-chat-line-square"></i> <span> {{item.comment}} </span> </el-col>
                </el-row>
            </div>
            <el-row class="desc" :gutter="15" v-if="item.image">
                <el-col :span="6" class="hidden-xs-only">
                    <el-image :src="item.image" fit="cover">
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </el-col>
                <el-col :span="24" :sm="18">
                    <view-editor v-model="item.desc" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" />
                </el-col>
            </el-row>
            <div v-else-if="!item.desc">
                <h3 class="title"><router-link :to="{ name: 'Show', params: { aid: item.id }}">{{item.title}}</router-link></h3>
                <el-row class="info" type="flex" :gutter="16">
                    <el-col title="修改时间"> <i class="el-icon-time"></i> <span> {{item.updated_at}} </span> </el-col>
                    <el-col title="浏览数"> <i class="el-icon-view"></i> <span> {{item.views}} </span> </el-col>
                    <el-col title="点赞数"> <i class="el-icon-star-off"></i> <span> {{item.likes}} </span> </el-col>
                    <el-col title="评论数"> <i class="el-icon-chat-line-square"></i> <span> {{item.comment}} </span> </el-col>
                </el-row>
            </div>
            <div class="desc" v-else>
                <view-editor v-model="item.desc" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" />
            </div>
            <div class="tags">
                <el-tag v-for="(itemtag, indextag) in item.tags" :key="'tag'+indextag">
                    <router-link :to="{ name: 'Tags', params: { tag: itemtag }}">{{itemtag}}</router-link>
                </el-tag>
            </div>
        </el-card>
    </main>
</template>

<script>
import {viewEditor} from 'mavon-editor'
export default {
    name: 'ArticleList',
    data () {
        return {
            articleData: [],
            page: 0,
            limit: 10,
            isPages: true,
            isbool: true
        }
    },
    components: {
        viewEditor
    },
    mounted() {
        // 监听滚动事件
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        getArticleList (initpage) {
            var vm = this
            vm.isbool = false
            vm.page = vm.page+1
            if (vm.$route.params.tag) {
                var where = {
                    tag: vm.$route.params.tag, // 分类id
                    page: vm.page, // 页数
                    limit: vm.limit, // 每页数量
                }
                vm.$api.getTagsList(where).then(res => {
                    vm.articleData = initpage ? [] : vm.articleData;
                    if (!res) {
                        vm.isPages = false
                        return;
                    } else if (res.data.length < vm.limit) {
                        vm.isPages = false
                    }
                    vm.articleData = vm.articleData.concat(res.data);
                    vm.isbool = true
                })
            } else {
                var where = {
                    catid: vm.$route.params.cid, // 分类id
                    page: vm.page, // 页数
                    limit: vm.limit, // 每页数量
                }
                vm.$api.getArticleList(where).then(res => {
                    vm.articleData = initpage ? [] : vm.articleData;
                    if (!res) {
                        vm.isPages = false
                        return;
                    } else if (res.data.length < vm.limit) {
                        vm.isPages = false
                    }
                    vm.articleData = vm.articleData.concat(res.data);
                    vm.isbool = true
                })
            }

        },
        handleScroll: function(e){
            var vm = this
            var mainHeight = document.querySelector("main").offsetHeight + document.querySelector("main").offsetTop - window.innerHeight - 100
            var scrollTop = window.pageYOffset  // 当前位置高度
            if (scrollTop >= mainHeight && vm.isbool && vm.isPages) {
                vm.getArticleList(false)
            }
        },
        routeChange () {
            var vm = this
            vm.page = 0
            vm.isPages = true,
            vm.isbool = true
            vm.getArticleList(true)
        }
    },
    watch: {
        '$route':'routeChange'
    },
    created() {
        var vm = this
        vm.routeChange()
    }
}
</script>
