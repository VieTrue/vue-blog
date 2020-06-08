// import Vue from 'vue'
// import axios from 'axios'
// import { Message } from 'element-ui'
// import instance from 'request'
import instance from './interceptor'

//公共路径
instance.defaults.baseURL = "http://192.168.4.46:8081/api";
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// instance.defaults.baseURL = 'http://47.115.163.61:8888/api';

/**
 * 查询文章列表
 * @param {Where} 查询条件
 */
const getArticleList = (Where) => {
    return instance.post('/article/getlist', Where)
}

/**
 * 查询文章详情
 * @param {Aid} 文章 Id 
 */
const getArticleInfo = (Aid) => {
    return instance.post('/article/getinfo', { id: Aid })
}

/**
 * 用户信息查询
 */
const getUserInfo = () => {
    return instance.post('/user/getinfo')
}

/**
 * 查询分类
 */
const getCategoryList = () => {
    return instance.post('/category/getlist')
}

/**
 * 文章点赞
 * @param {Aid} 文章 Id
 */
const spotLikes = (Aid) => {
    return instance.post('/article/spotlikes', { id: Aid })
}

/**
 * 发布文章评论
 * @param {Aid} 文章 Id
 * @param {Content} 评论内容
 * @param {ReplyId} 回复 Id
 */
const setComment = (Aid, Content, ReplyId) => {
    return instance.post('/comment/setcomment', { id: Aid, content: Content, reply_id: ReplyId })
}

/**
 * 文章评论查询
 * @param {Aid} 文章 Id
 */
const getCommentList = (Aid) => {
    return instance.post('/comment/getlist', { id: Aid })
}

/**
 * 标签查询文章
 * @param {Where} 查询条件
 */
const getTagsList = (Where) => {
    return instance.post('/article/gettaglist', Where)
}

/**
 * 关键词搜索文章
 * @param {Where} 查询条件
 */
const getSearchList = (Where) => {
    return instance.post('/article/search', Where)
}

export default {
    // getWenzhang,
    // getRegister, //注册
    // UserLogin, //登录
    // LoginOut, //退出登录
    getCategoryList, // 查询分类
    // navMenList, //导航信息
    getArticleList, // 查询文章列表
    getArticleInfo, // 查询文章详情
    getUserInfo, // 用户信息查询
    getTagsList, // 标签查询文章
    getSearchList, // 关键词搜索文章
    getCommentList, // 文章评论列表
    // OtherComment, //其他评论列表
    setComment, // 设置文章评论
    // setOuthComment, //设置其他评论
    // showLikeData, //do you like me
    // GetLike, //设置 do you like me
    // FriendUrlData, //友情链接数据
    // AboutMeData, //关于我文章编写
    spotLikes, // 文章收藏 文章点赞
    // AdmireData, //赞赏数据
    // getLikeCollectList, //用户收藏喜欢列表
    // getUserInfo, //用户信息查询
    // UserInfoSave, //修改用户信息
    // initDate, //设置时间
    // changeTheme, //获取主题信息
}