<template>
    <div class="Invitation">
        <div class="Invitation-wrap">
            <div class="content">
                <p class="intro">{{invitationInfo.author}} | 著名经济学家</p>
                <div class="bg-intro">
                    <h2>{{invitationInfo.title}}</h2>
                    <p class="clearfix"><span class="fr">￥{{invitationInfo.price}}</span>门票价格：</p>
                    <p class="clearfix"><span class="fr">{{invitationInfo.showTime | filterFun}}</span>直播时间：</p>
                </div>
                <p class="word-remind" 
                    v-show="invitationInfo.status==2&& invitationInfo.showState!=2&& userId!=userinfo.userId?true:false">您来晚了，门票已被领完。<br />您可以联系您的好友 
                    <em class="proxy-name">温新泽</em> 询问是否还有余票
                </p>
                <p class="word-remind" style="margin-bottom: 20px;" 
                    v-show="invitationInfo.status==0 && invitationInfo.showState!=2&& userId!=userinfo.userId?true:false">您的好友 
                    <em class="proxy-name">温新泽</em> 已帮您购票,可免费领取
                </p>
                <p class="word-remind" style="margin-bottom: 20px;" 
                    v-show="invitationInfo.status==1 && invitationInfo.showState!=2 && userId!=userinfo.userId?true:false ">您已经领过这张票了，点击下方立即观看，进入直播间
                </p>
                <p class="word-remind" style="margin-bottom: 20px;" 
                    v-show="userId==userinfo.userId?true:false">分享好友领票
                </p>
                <div class="mglr70">
                    <button class="go-see" 
                        @click="dialogShowFn" 
                        :disabled="invitationInfo.status==2?true:false"
                        v-show="invitationInfo.status==1 && invitationInfo.showState!=2 && userId!=userinfo.userId?true:false "
                        >
                        立即观看
                    </button>
                </div>
                <div class="mglr70">
                    <button class="go-see" 
                        @click="dialogShowFn" 
                        v-show="invitationInfo.status==0 && invitationInfo.showState!=2&& userId!=userinfo.userId?true:false">
                        立即领取
                    </button>
                </div>
                <div class="mglr70">
                    <button class="go-see" 
                        @click="dialogShowFn" 
                        v-show="invitationInfo.status==2&& invitationInfo.showState!=2&& userId!=userinfo.userId?true:false"
                        disabled>
                        票以领完
                    </button>
                </div>
                <div class="mglr70">
                    <button class="go-see" 
                        @click="dialogShowFn" 
                        v-show="invitationInfo.showState==2&& userId!=userinfo.userId?true:false"
                        disabled>
                        直播已结束
                    </button>
                </div>
                <div class="mglr70">
                    <button class="go-see" 
                        @click="dialogShowFn" 
                        v-show="userId==userinfo.userId?true:false">
                        分享好友
                    </button>
                </div>
                <div class="ewm clearfix">
                    <img :src="invitationInfo.channelCodeUrl" class="fl"/>
                    <div class="app-intro">
                        <h6>{{invitationInfo.channelName}}</h6>
                        <p>{{invitationInfo.channelDesc}}</p>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="heade-pic"><img src="../../assets/header-pic.png"></div>
        </div>
        <my-dialog 
            :dialogShow="dialogShow" 
            :yzmval="yzmval"
            @dialog-cancel="dialogShowFn"
            @change-phone-num="changePhoneNumFn"
            @change-yzm="changeYzmFn"
            @bind-phone="bindPhoneFn"
            @get-yzm="getYzmFn">
        </my-dialog>
    </div>
</template>
<script>
    import myDialog from '../dialog/index'
    import { mapGetters, mapActions } from 'vuex'
    import { Toast } from 'mint-ui'
    import formatyzm from '../../mixins/getUserInfo'
    export default{
        data:()=>{
            return{
                dialogShow:null,
                userId:'',
                phoneNum:'',
                yzm:'',
            }
        },
        mixins:[formatyzm],
        computed:mapGetters({
            invitationInfo : 'invitationInfo',
            userinfo:'userinfo',
            bindInfo:'bindInfo',
            weixinsignInfo:'weixinsignInfo'
        }),
        filters:{
            filterFun:function(val){
                if(val && val!=''){return val.substring(0,16)}
            }
        },
        watch:{
            'userinfo':function(val){
                this.userId = this.$route.params.userId
                this.getInvitation({
                    params:{
                        liveShowId:this.$route.params.liveShowId,
                        userId:this.$route.params.userId
                    }
                })
            },
            'yzmInfo':function(val){
                console.log(val.code)
                if(val.code==1000){
                    this.formatyzm()
                }
            },
            'bindInfo':function(val){
                if(val.code=="1000"){
                    Toast(val.msg)
                    this.dialogShow = !this.dialogShow
                }else{
                    Toast(val.msg)
                }
                
            }
        },
        created:function(){
            this.getuserinfo()
            this.getWeixinSign({
                params:{
                    url:location.href.split('#')[0]
                }
            })
        },
        methods: Object.assign({
            dialogShowFn(){
                if(this.invitationInfo.showState==2){ //判断直播是否结束

                }else{
                    if(this.userId == this.userinfo.userId){ //判断当前用id户与代理人id是否一致
                        // this.$router.push({ name: 'live', params: { liveShowId: this.$route.params.liveShowId }})
                        this.dialogShow = !this.dialogShow
                    }else{
                        if(this.invitationInfo.status==0){ //没领取票
                            this.dialogShow = !this.dialogShow
                        }else if(this.invitationInfo.status==1){ //已领取
                            this.$router.push({ name: 'live', params: { liveShowId: this.$route.params.liveShowId }})
                        }else{ //没票

                        }   
                    }
                }
            },
            changePhoneNumFn(ev){
                this.phoneNum = ev.target.value
            },
            changeYzmFn(ev){
                this.yzm = ev.target.value
            },
            getYzmFn(){
                if(this.phoneNum == ''){
                    Toast('手机号不能为空')
                    return
                }else{
                    this.getYzm({
                        params:{
                            mobile:this.phoneNum
                        }
                    })
                }
            },
            bindPhoneFn(){
                if(this.phoneNum == ''){
                    Toast('手机号不能为空')
                    return
                }else if(!(/^1\d{10}$/.test(this.phoneNum))){
                    Toast('手机号格式错误')
                    return
                }else if(this.yzm == ''){
                    Toast('验证码不能可空')
                    return
                }else{
                    this.bindPhone({
                        mobile:this.phoneNum,
                        checkCode:this.yzm,
                        inviteUserId:this.$route.params.userId,
                        liveShowId:this.$route.params.liveShowId,
                    })
                }
            },
        },mapActions([
            'getInvitation',
            'getuserinfo',
            'bindPhone',
            'getYzm',
            'getWeixinSign'
        ])),
        components:{
            myDialog
        },
    }
</script>
<style>
    .Invitation{
        width: 100%;
        height: 100%;
    }
    .Invitation-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fffbf5;
        padding: 26px;
        box-sizing: border-box;
    }
    .Invitation-wrap .content{
        width: 100%;
        height: 100%;
        border:6px solid #e5b473;
        box-sizing: border-box
    }
    .line{
        width: 100%;
        height: 151px;
        background: url('../../assets/line.png') no-repeat;
        position: absolute;
        top:70px;
        left:0;
        background-size: cover
    }
    .heade-pic{
        position: absolute;
        top:45px;
        left: 50%;
        margin-left: -95px;
        background-size:cover 
    }
    .heade-pic img{
        height: 190px;
        width: 190px;
        border:6px solid #dec19b;
        border-radius: 50%;
    }
    .Invitation-wrap .intro{
        padding-top: 255px;
        font-size: 31px;
        color: #af7a37;
        text-align: center;
    }
    .Invitation-wrap .bg-intro{
        width: 539px;
        height:293px;
        background: url('../../assets/bg-intro.png') no-repeat;
        background-size: cover;
        margin:40px 0 80px 80px;
        font-size: 26px;
        color: #fff;
    }
    .Invitation-wrap .word-remind{
        color: #403c3c;
        font-size: 28px;
        text-align: center;
        padding: 0 45px 40px;
        line-height: 45px;
    }
    .Invitation-wrap .proxy-name{
        color: #77c34f;
        font-style: normal
    }
    .Invitation-wrap .mglr70{
        margin: 0 70px;
    }
    .Invitation-wrap .go-see{
        width: 100%;
        height: 70px;
        display: block;
        text-align: center;
        line-height: 70px;
        color: #fff;
        text-decoration: none;
        background: #77c34f;
        font-size: 25px;
    }
    .Invitation-wrap .ewm{
        position: absolute;
        bottom:53px;
        left: 56px;
    }
    .Invitation-wrap .ewm img{
        width: 109px;
        height: 109px;
        background-size: cover;
    }
    .Invitation-wrap .app-intro{
        margin-left: 124px;
        color: #434343;
    }
    .Invitation-wrap .app-intro h6{
        font-size: 26px;
        font-weight: normal;
        line-height: 38px;
        padding-top: 25px;
    }
    .Invitation-wrap .app-intro p{
        font-size: 25px;
    }
    .Invitation-wrap .bg-intro h2{
        font-size: 42px;
        color: #fff;
        text-align: center;
        font-weight: 900;
        padding-top: 55px;
    }
    .Invitation-wrap .bg-intro p{
        padding: 20px 70px 0;
        vertical-align: bottom;
        line-height: 40px;
    }
    .Invitation-wrap .bg-intro p span{
        font-size: 34px;
        vertical-align: bottom;
    }
</style>