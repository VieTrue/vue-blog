<!-- 底部 公用 -->

<template>
    <footer>
        <div class="container">
            <div class="footer-main">
                <div class="copyright">
                    <span> © {{StartYear}} – {{CurrentYear}}</span>
                    <span>46</span>
                </div>
            </div>
            
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {
            StartYear: 2019,
            CurrentYear: 2020
        }
    },

    methods: {
        routeChange () {
            this.getDateYear()
        },
        getDateYear() {
            let nowDate = new Date();
            this.CurrentYear = nowDate.getFullYear();
            // let date = {year: nowDate.getFullYear(),month: nowDate.getMonth() + 1,date: nowDate.getDate()}
        }
    },
    watch: {
        '$route':'routeChange'
    },
    created() {
        this.routeChange()
    }
}
</script>
