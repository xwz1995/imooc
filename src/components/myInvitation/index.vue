<template>
    <div class="my-invitation">
        <div class="ip-info clearfix">
            <i class="video-type">回顾</i>
            <img src="../../assets/liuming.jpg" class="fl img"/>
            <div class="wrap">
                <h2>柳明 美国大选究竟对金融市场有何影响力</h2>
                <p class="time">直播时间：2017-04-08 18:20</p>
                <p class="ticket-info clearfix"><span>总数:123</span><span>被领取：22</span><span>剩余：22</span><a href="javascript:;" class="fr pay">购买</a></p>
            </div>
        </div>
        <change-tab :activeClass="addClsActive" @changeTab="changeTabFn"></change-tab>
    </div>
</template>
<script>
    import changeTab from './message'
    import { mapGetters, mapActions } from 'vuex'
    import { Toast } from 'mint-ui'
    export default{
        data:()=>{
            return{
                addClsActive:null
            }
        },
        computed:mapGetters({
            userinfo:'userinfo',
            weixinsignInfo:'weixinsignInfo',
            myticketsinfo:'myticketsinfo'
        }),
        created:function(){
            this.myTickets({
                params:{
                    liveShowId:this.$route.params.liveShowId
                }
            })
        },
        methods: Object.assign({
            changeTabFn(){
                this.addClsActive = !this.addClsActive
            }
        },mapActions([
            'getuserinfo',
            'getWeixinSign',
            'myTickets'
        ])),
        components:{
            changeTab
        }
    }
</script>
<style>
    .my-invitation .ip-info{
        position: relative;
        padding: 36px 30px;
        border-top:1px solid #dfdfdf;
        line-height: normal;
        height: auto
    }
    .my-invitation .ip-info .video-type{
        position: absolute;
        top:110px;
        height: 40px;
        display: block;
        padding: 0 13px;
        line-height: 40px;
        font-style: normal;
        font-size: 24px;
        color: #b7b7b7;
        background: rgba(0,0,0,.5);
        border-top-right-radius: 33%;
        border-bottom-right-radius: 33%;
    }
    .my-invitation .ip-info .img{
        width: 185px;
        height: 132px;
        background-size: cover;
    }
    .my-invitation .ip-info .wrap{
        margin-left: 213px;
    }
    .my-invitation .ip-info .wrap{
        color: #323232;
        font-size: 26px;
    }
    .my-invitation .ip-info .wrap h2{
        font-weight: normal;
        font-size: 26px;
        padding-bottom: 12px;
    }
    .my-invitation .ip-info .wrap .time{
        color: #b7b7b7;
        font-size: 24px;
        padding-bottom: 12px;
    }
    .my-invitation .ip-info .ticket-info{
        font-size: 24px;
        color: #b7b7b7;
    }
    .my-invitation .ip-info .ticket-info span{
        padding-right: 24px;
    }
    .my-invitation .ip-info .ticket-info .pay{
        color: #77c34f;
        text-decoration: none;
    }
    
</style>