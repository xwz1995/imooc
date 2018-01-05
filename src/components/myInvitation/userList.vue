<template>
    <div class="userlist">
        <ul v-show="showList">
            <li class="clearfix">
                <img src="../../assets/user.png" class="img fl">
                <div class="wrap">
                    <h2>黄欣荣</h2>
                    <p class="phone-num"><i class="phone-ico"></i>12345678900</p>
                </div>
            </li>
        </ul>
        <ul v-show="!showList">
            <li class="clearfix">
                <img src="../../assets/user.png" class="img fl">
                <div class="wrap">
                    <h2>黄欣荣</h2>
                    <p class="phone-num"><i class="phone-ico"></i>12345678900</p>
                    <p class="word">说的太棒了</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:{
            showList:null
        }
    }
</script>
<style>
    .userlist{
        padding: 0 24px;
    }
    .userlist li{
        padding: 28px;
        border-bottom:1px solid #dadada;
        font-size: 0
    }
    .userlist li .img{
        width: 66px;
        height: 66px;
        background-size: cover;
        border-radius: 50%;
    }
    .userlist .wrap{
        margin-left: 80px;
        font-size: 28px;
    }
    .userlist .wrap h2{
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 5px;
    }
    .userlist .wrap .phone-num{
        font-size: 24px;
        color: #585757;
    }
    .userlist .wrap .phone-ico{
        width: 16px;
        height: 22px;
        display: inline-block;
        background: url('../../assets/phone.png') no-repeat;
        background-size: cover;
        margin-right: 10px;
    }
    .userlist .wrap .word{
        color: #3d3d3d;
        font-size: 28px;
        margin-top: 10px;
    }
</style>