<template>
    <transition name="fade">
        <div class="dialog-pay" v-show="dialogPayShow">
            <div class="dialog-pay-content">
                <div class="dialog-pay-header">
                    <p>您可以购入多张，用以赠送给您的朋友。</p>
                    <i class="live-ticket-ico"></i>
                    <i class="close-btn" @click="dialogPayShowFn"></i>
                </div>
                <div class="dialog-pay-wrap">
                    <div class="dialog-pay-title">
                        <p class="clearfix">{{title}}<span class="fr">￥<em>{{price}}</em><i>张</i></span></p>
                    </div>
                    <div class="dialog-pay-num">
                        <p class="clearfix">数量
                            <span class="fr">
                                <a href="javascript:;" class="reduce" @click="changeMoneyFn(-1)"><i class="reduce-ico" :class="[ticketNum>1 ? 'reduce-ico-active' : '']"></i></a><em>{{ticketNum}}</em><a href="javascript:;" class="add" @click="changeMoneyFn(1)"><i class="add-ico add-ico-active"></i></a>
                            </span>
                        </p>
                    </div>
                    <div class="dialog-pay-money">
                        <p class="clearfix">支付金额<i>购买后，不退不换</i><span class="fr">￥<em>{{totalPrice}}</em></span></p>
                    </div>
                    <div class="dialog-pay-btn">
                        <a href="javascript:;">确认支付</a>
                    </div>
                </div>
            </div>
        </div>
    </transition> 
</template>
<script>
    export default{
        data:()=>{
            return{
            }
        },
        props:{
            dialogPayShow:null,
            ticketNum:null,
            price:null,
            totalPrice:null,
            title:null
        },
        methods:{
            dialogPayShowFn(){
                this.$emit('dialog-ticket-cancel')
            },
            changeMoneyFn(num){
                this.$emit('dialog-change-money',num)
            }
        }
    }
</script>
<style>
    .dialog-pay{
        position:fixed;
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,.5);
        z-index: 10
    }
    .dialog-pay-content{
        width: 100%;
        position: fixed;
        bottom:0;
        left: 0;
        background: #fff;
        z-index: 11;
    }
    .dialog-pay-header{
        height: 87px;
        line-height: 87px;
        color: #bcbcbc;
        font-size: 24px;
        text-align: center
    }
    .live-ticket-ico{
        width: 54px;
        height: 69px;
        position: absolute;
        left: 22px;
        top:-8px;
        background: url('../../assets/live-ticket-ico.png') no-repeat;
        background-size: cover
    }
    .close-btn{
        width: 20px;
        height: 20px;
        background: url('../../assets/close-btn.png') no-repeat;
        position: absolute;
        right: 20px;
        top:20px;
        background-size: cover;
    }
    .dialog-pay-wrap{
        line-height: 108px;
        font-size: 34px;
        color: #403c3c;
    }
    .dialog-pay-wrap p{
        padding: 0 22px;
        border-top:1px solid #dadada;
    }
    .dialog-pay-title span{
        color: #ff982a;
        font-size: 38px;
    }
    .dialog-pay-title em{
        font-size: 48px;
        font-style: normal;  
        padding: 0 15px 0 5px;
    }
    .dialog-pay-title i{
        font-size: 25px;
        font-style: normal;
    }
    .dialog-pay-num a.reduce{
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    .dialog-pay-num em{
        display: inline-block;
        height: 44px;
        line-height: 44px;
        padding: 0 30px;
        font-size: 32px;
        color: #929292;
        font-style: normal;
        border-top:2px solid #bdbdbd;
        border-bottom:2px solid #bdbdbd;
        vertical-align: middle;
    }
    .dialog-pay-num a{
        width: 45px;
        height: 44px;
        display: inline-block;
        border:2px solid #bdbdbd;
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        vertical-align: middle;
        position: relative
    }
    .dialog-pay-num a.add{
        
    }
    .dialog-pay-num i{
        display: inline-block;
        position: absolute;
        top:50%;
        left: 50%;
    }
    .dialog-pay-num i.reduce-ico{
        width: 21px;
        height: 5px;
        background: url('../../assets/reduce.png') no-repeat;
        background-size: cover;
        margin-top: -2.5px; 
        margin-left: -10.5px;
    }
    .dialog-pay-num i.add-ico{
        width: 21px;
        height: 21px;
        background: url('../../assets/add.png') no-repeat;
        background-size: cover;
        margin-top: -10.5px;
        margin-left: -10.5px;
    }
    .dialog-pay-num i.add-ico-active{
        background: url('../../assets/add-active.png') no-repeat;
        background-size: cover;
    }
    .dialog-pay-num i.reduce-ico-active{
        background: url('../../assets/reduce-active.png') no-repeat;
        background-size: cover;
    }
    .dialog-pay-money i{
        font-size: 24px;
        color: #bcbcbc;
        font-style: normal;
        padding-left: 46px;
    }
    .dialog-pay-money span{
        font-size: 34px;
        color: #6e6e6e;
        font-weight: 900
    }
    .dialog-pay-money em{
        font-style: normal;
    }
    .dialog-pay-btn{
        height: 110px;
        line-height: 110px;
        text-align: center;
        background: #77c34f;
    }
    .dialog-pay-btn a{
        color: #fff;  
        font-size: 34px;  
        text-decoration: none;
        display: block;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>