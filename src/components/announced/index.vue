<template>
    <section>
        <div style="font-size: 0">
            <img :src="PreInfoData.posterUrl" class="head-pic">
        </div>
        <div class="ann-content" v-show="PreInfoData.showState==1?true:false">
            <p class="clearfix">距离直播开始还有：<span class="fr"><em>{{day}}</em>天<em>{{hour}}</em>时<em>{{minute}}</em>分<em>{{second}}</em>秒</span></p>
        </div>
        <div class="ann-content" v-show="PreInfoData.showState==2?true:false">
            <p class="clearfix">正在直播中...<b class="fr">01:23:00</b
            ></p>
        </div>
        <div class="ann-content" v-show="PreInfoData.showState==3?true:false">
            <p class="clearfix">直播已结束<b class="fr"></b
            ></p>
        </div>
        <div class="pay-ticket">
            <p @click="dialogPayShowFn">￥ {{unitPrice}}<em>立即购票</em></p><span>门票（{{userinfo.inviteCount}}/{{userinfo.buyCounts}})</span>
        </div>
        <div class="pay-ticket-success">已有 34265345 人订票</div>
        <dialog-pay 
            :dialogPayShow="dialogPay" 
            :price="unitPrice" 
            :ticketNum="count" 
            :totalPrice="totalPrice"
            :title="PreInfoData.title"
            @dialog-change-money="changeMoneyFn"
            @dialog-ticket-cancel="dialogPayShowFn">
        </dialog-pay>
    </section>
</template>
<script>
    import dialogPay from '../payDialog/index'
    import { mapGetters, mapActions } from 'vuex'
    import getTime from '../../mixins/getUserInfo'

    export default{
        data:()=>{
            return{
                dialogPay:null,
                timer:null
            }
        },
        mixins: [getTime],
        computed: mapGetters({
            unitPrice: 'unitPrice',
            count: 'count',
            totalPrice: 'totalPrice',
            PreInfoData : 'PreInfoData',
            userinfo:'userinfo'
        }),
        watch:{
            'PreInfoData':function(val){
                this.timer = setInterval(()=>{
                    this.getTime(val.showTime)
                },1000)
            },
            'userinfo':function(val){
                this.getPreInfo({
                    params:{
                        liveShowId:this.$route.params.id
                    }
                })
            }
        },
        created () {
            this.getuserinfo()
        },
        methods: Object.assign({
            dialogPayShowFn(){
                this.dialogPay = !this.dialogPay
            },
            changeMoneyFn(num){
                this.updateCount(num);
            }
        }, mapActions([
            'updateCount',
            'getPreInfo',
            'getuserinfo'
        ])),
        components:{
            dialogPay
        },
        destroyed:function(){
            clearInterval(this.timer)
        }
    }
</script>
<style>
    .head-pic{
        width: 100%;
        height: 948px;
    }
    .ann-content{
        font-size: 30px;
        padding: 0 24px 0;
        color: #1d1d1d;
        box-sizing: border-box
    }
    .ann-content p{
        line-height: 60px;
        margin: 24px 0
    }
    .ann-content span.fr{
        border:1px solid #fef1da;
        padding-right: 15px;
        line-height: 60px;
        display: inline-block;
    }
    .ann-content span.fr em{
        font-size: 37px;
        font-style: normal;
        color: #f8ab17;
        padding:0 15px;
        
    }
    .pay-ticket{
        display:flex; 
        width: 100%;
        text-align: center;
        height: 80px; 
        line-height: 80px;
        padding: 0 24px 0;
        box-sizing: border-box
    }
    .pay-ticket p{
        -webkit-flex: 3; 
        -moz-flex:3;
        -ms-flex:3; 
        flex: 3;  
        font-size: 30px;
        background: #77c34f;
        color: #fff;
        border-radius: 5px;
    }
    .pay-ticket p em{
        padding-left: 44px;
        font-style: normal;
    }
    .pay-ticket span{
        -webkit-flex: 2; 
        -moz-flex:2;
        -ms-flex:2; 
        flex: 2;
        color: #28c38d;
        font-size: 31px;
    }
    .pay-ticket-success{
        font-size: 22px;
        color: #868686;
        padding:24px;
        box-sizing: border-box
    }
    
</style>