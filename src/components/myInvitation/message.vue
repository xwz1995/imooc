<template>
    <section >
        <div class="changeTab clearfix">
            <span :class="activeClass?'active':''" @click="changeTabFn">未观看( 120 )</span><span :class="activeClass?'':'active'" @click="changeTabFn">已观看( 110 )</span><a href="javascript:;" class="fr gift"><i class="gift-ico"></i>赠送</a>
        </div>
        <user-list :showList="activeClass"></user-list>
    </section>
</template>
<script>
    import userList from './userList'
    export default{
        props:{
            activeClass:null
        },
        methods:{
            changeTabFn(){
                this.$emit('changeTab')
            }
        },
        components:{
            userList
        }
    }
</script>
<style>
    .changeTab{
        height: 80px;
        padding: 0 36px;
        box-sizing: border-box;
        background: #fff;
        border-top:10px solid #f2f2f2;
        border-bottom: 1px solid #dadada;
        font-size: 26px;
        line-height: 70px;
    }
    .changeTab span{
        display: inline-block;
        margin-right: 80px;
        border-bottom:5px solid transparent;
        padding: 0 10px;
        height: 64px
    }
    .changeTab span.active{
        color: #77c34f;
        border-color: #77c34f
    }
    .changeTab .gift{
        text-decoration: none;
        color: #77c34f
    }
    .changeTab .gift-ico{
        display: inline-block;
        width: 29px;
        height: 27px;
        background: url('../../assets/gift.png') no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-top: -10px;
        margin-right: 10px;
    }
</style>