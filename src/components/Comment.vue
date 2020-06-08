<!-- 文章评论 公用 -->

<template>
    <div id="comment" class="show-comment">
        <el-divider content-position="left">评论</el-divider>
        <div class="comment-input">
            <el-alert title="请勿发布不友善或者负能量的内容。" type="warning" :closable="false" show-icon></el-alert>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 9}" placeholder="请输入内容" v-model="Content"></el-input>
            <el-button type="primary" @click="setComment()">提交</el-button>
            <view-editor v-model="Content"/>
        </div>
        <div class="comment-list">
            <el-row v-for="(itemC, indexC) in CommentList" :key="'comment'+indexC" class="comment-item">
                <div class="comment-avatar">
                    <el-avatar :size="60" :src="$store.state.UserInfo.avatar"></el-avatar>
                </div>
                <div class="comment-content">
                    <div class="comment-info">
                        <p class="comment-name">{{itemC.name}}</p>
                        <div class="comment-text"><view-editor v-model="itemC.content"/></div>
                        <div class="comment-other">
                            <span> {{itemC.updated_at}} </span> <span class="isclick"> <i class="el-icon-star-off"></i> {{itemC.likes}} </span> <span @click="itemC.isReply = !itemC.isReply" class="isclick"> 评论 </span>
                        </div>
                        <div class="comment-reply"  v-show="itemC.isReply">
                            <el-input placeholder="请输入内容" v-model="itemC.reply" class="input-with-select">
                                <el-button slot="append" @click="setComment(true, indexC)">提交</el-button>
                            </el-input>
                        </div>
                    </div>
                    <div class="comment-reply-list"  v-show="itemC.isReply">
                        <!-- <el-divider></el-divider> -->
                        <el-row v-for="(itemReply, indexReply) in itemC.replyList" :key="'reply'+indexReply" class="comment-item">
                        <!-- <el-row> -->
                            <div class="comment-avatar">
                                <el-avatar :size="40" :src="$store.state.UserInfo.avatar"></el-avatar>
                            </div>
                            <div class="comment-content">
                                <div class="comment-name">{{itemReply.name}}</div>
                                <div class="comment-text"><view-editor v-model="itemReply.content"/></div>
                                <div class="comment-other">
                                    <span> {{itemReply.updated_at}} </span> <span> <i class="el-icon-star-off"></i> {{itemReply.likes}} </span>
                                </div>
                            </div>
                        </el-row>

                    </div>
                </div>
            </el-row>

        </div>

    </div>
</template>

<script>
import {viewEditor} from 'mavon-editor'

export default {
    name: 'Comment',
    components: {
        viewEditor
    },
    data : function(){
        return {
            Content: '',
            CommentList: [],
        }
    },
    methods : {
        routeChange () {
            let vm = this
            vm.$api.getCommentList(vm.$route.params.aid).then(res => {
                if (res) {
                    vm.CommentList = res.data;
                }
            })
            
        },
        setComment (reply = false, Index) {
            let vm = this
            let content = ''
            let replyId = 0;
            if (!reply) {
                content = vm.Content
            } else {
                content = vm.CommentList[Index].reply
                replyId = vm.CommentList[Index].id
            }
            if (!content) return 
            vm.$api.setComment(vm.$route.params.aid, content, replyId).then(res => {
                if (!reply) {
                    vm.Content = ''
                } else {
                    vm.CommentList[Index].reply = ''
                }
                vm.routeChange()
            })
        }

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

