<!-- 文章详情 公用 -->

<template>
    <main class="show">

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <h1 class="title">{{ArticleInfo.title}}</h1>
                <el-row class="info" type="flex" justify="center" :gutter="16">
                    <el-col title="修改时间"> <i class="el-icon-time"></i> <span> {{ArticleInfo.updated_at}} </span> </el-col>
                    <el-col title="浏览数"> <i class="el-icon-view"></i> <span> {{ArticleInfo.views}} </span> </el-col>
                    <el-col title="点赞数"> <i class="el-icon-star-off"></i> <span> {{ArticleInfo.likes}} </span> </el-col>
                    <el-col title="评论数"> <i class="el-icon-chat-line-square"></i> <span> {{ArticleInfo.comment}} </span> </el-col>
                </el-row>
            </div>
            <view-editor v-model="ArticleInfo.content"/>
            <div class="content" id="editor"></div>
            <div v-if="!ArticleInfo.original && ArticleInfo.originalurl" class="original">
                <span>原文链接：</span><a :href="ArticleInfo.originalurl" target="_blank">{{ArticleInfo.originalurl}}</a>
            </div>
            <div class="tags">
                <el-tag v-for="(itemtag, indextag) in ArticleInfo.tags" :key="'tag'+indextag">
                    <router-link :to="{ name: 'Tags', params: { tag: itemtag }}">{{itemtag}}</router-link>
                </el-tag>
            </div>
            <!-- rel="noopener noreferrer" -->
            <!-- <el-row type="flex" justify="space-between" class="pages">
                <el-col><a href="">上一页</a></el-col>
                <el-col><a href="">下一页</a></el-col>
            </el-row> -->
        </el-card>
        <web-comment v-if="IsComment" />
        <!-- <div class="fixed-right">
            <div @click="spotLikes">
                <i :class="Likes"></i>
                <p>{{ArticleInfo.likes}}</p>
                
            </div>
            <div @click="spotLikes">
                <i class="el-icon-chat-line-square"></i>
                <p>{{ArticleInfo.comment}}</p>
            </div>
        </div> -->
    </main>
</template>

<script>
import {viewEditor} from 'mavon-editor'
import WebComment from '@/components/Comment.vue'

export default {
    name: 'ArticleShow',
    components: {
        // mavonEditor,
        viewEditor,
        WebComment,
    },
    data : function(){
        return {
            ArticleInfo:[],
            IsComment: false,
            // Likes: 'el-icon-star-off',
        }
    },
    methods : {
        routeChange () {
            let vm = this
            vm.$api.getArticleInfo(vm.$route.params.aid).then(res => {
                if (res) {
                    // vm.Likes = res.other.is_likes ? 'el-icon-star-on' : 'el-icon-star-off'
                    vm.IsComment = res.data.is_comment
                    vm.ArticleInfo = res.data;
                    document.title = res.data.title
                }
            })
        },
        // spotLikes () {
        //     let vm = this
        //     vm.Likes = 'el-icon-star-off'
        //     vm.$api.spotLikes(vm.$route.params.aid).then(res => {
        //         if (res) {
        //             vm.Likes = res.other.is_likes ? 'el-icon-star-on' : 'el-icon-star-off'
        //             vm.ArticleInfo.likes = res.other.is_likes ? vm.ArticleInfo.likes + 1 : vm.ArticleInfo.likes - 1
        //         }
        //     })
        // }
    },
    watch: {
        '$route':'routeChange'
    },
    created() {
        let vm = this
        vm.routeChange()
    }
}
</script>

