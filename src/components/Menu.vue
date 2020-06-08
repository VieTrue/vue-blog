<!-- 分类栏 -->

<template>
    <el-row class="sub-menu" type="flex" justify="center">
        <el-col v-for="(item, index) in $store.state.CategoryList" :key="'category'+index">
            <router-link :to="{ name: 'List', params: { cid: item.id }}" :class="{'active':Cid==item.id}">{{item.title}}</router-link>
        </el-col>
    </el-row>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue'
export default {
    name: 'Menu',
    data () {
        return {
            Id: 0,
            Cid: 0
        }
    },
    methods: {
        routeChange () {
            var vm = this
            vm.Cid = vm.$route.params.cid
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

