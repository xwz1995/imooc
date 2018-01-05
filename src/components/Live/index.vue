<template>
    <div class="video-wrap">
        <div class="video-play" ref="videoplay">
            <video id="rtmpPlayer" autoplay="autoplay" controls="controls" webkit-playsinline fullscreen="false" preload="true">
                <source type="application/x-mpegURL" src="rtmp://pili-live-rtmp.zhibo.dejikeji.com/dejizhibo2/58c6443675aa432a22f368ed" id="adress"/>
            </video>
        </div>
        <div class="ip-info clearfix" ref="ipinfo">
            <span class="fr">在线:<em class="num">1234</em></span>
            <span><i class="voice-ico"></i>主讲人:<em class="name">李白</em></span>
        </div>
        <div class="changeTab clearfix" ref="videotab" >
            <span :class="activeClass?'active':''" @click="changeTabFn">聊天室</span><span :class="activeClass?'':'active'" @click="changeTabFn">只看好友</span><a href="javascript:;" class="fr gift">我邀请的（8/9）</a>
        </div>
        <div class="tab-content hidden"  :style="{ height: Height + 'px'}" v-show="activeClass">
            <ul class="user-info user-control">
                <li class="clearfix" v-for="item in chooselist">
                    <img :src="item.user_headurl != 'undefined'? item.user_headurl : pic" class="fl">
                    <div class="right">
                        <h2 class="user-name"><span class="time fr">16:45</span>{{item.name}}<span class="control-tip">主持</span></h2>
                        <p>{{item.content}}</p>
                    </div>
                </li>
                <p class="welcomingWords"><span>欢迎来到直播间</span></p> 
            </ul>
        </div>
        <div class="tab-content hidden"  :style="{ height: Height + 'px'}" ref="tabcontent" v-show="!activeClass">
            <div ref="scroll" class="scroll">
                <ul class="user-info user-control">
                    <li class="clearfix" v-for="item in chooselist">
                        <img :src="item.user_headurl != 'undefined'? item.user_headurl : pic" class="fl">
                        <div class="right">
                            <h2 class="user-name"><span class="time fr">16:45</span>{{item.name}}<span class="control-tip">主持</span></h2>
                            <p>{{item.content}}</p>
                        </div>
                    </li>
                    <p class="welcomingWords"><span>欢迎来到直播间</span></p> 
                </ul>
                <ul class="user-info">
                    <li class="clearfix" v-for="item in todo">
                        <img :src="item.pic" class="fl">
                        <div class="right">
                            <h2 class="user-name"><span class="time fr">{{item.time}}</span>{{item.name}}</h2>
                            <p>{{item.content}}</p>
                        </div>
                    </li> 
                </ul>
            </div>
        </div>
        <div class="footer" ref="footer">
            <input type="text" placeholder="" class="tiwen-input"  v-model="content"/><a href="javascript:;" class="tiwen" @click="tiwen">提问</a><a href="javascript:;" class="rewards" @click="dialogShowFn"></a>
        </div>
        <dialog-live 
            :dialogShow="dialogShow" 
            :money="money" 
            @dialog-cancel="dialogShowFn" 
            @set-money-num="setMoneyFn" 
            :setMoney="setMoney" 
            @change-money-num="changeMoneyNum" 
            @change-num="changeNumFn">
        </dialog-live>
    </div>
</template>
<script src=""></script>
<script>
    import Vue from 'vue'
    import { Toast } from 'mint-ui';
    import { chooseList }  from '../../bus'
    import { bus }  from '../../bus'
    import  dejiIM from '../../dejiIM';
    import  live  from '../../play'
    import dialogLive from '../dialogLive/index'
    export default{
        data:()=>{
            return{
                money:'1.99',
                dialogShow:null,
                setMoney:null,
                activeClass:true,
                Height:'',
                content:'',
                todo:[],
                chooselist:[],
                pic:'http://awb.img.xmtbang.com/img/uploadnew/201510/23/2e17c73312884db5aabc274a4d15ac51.jpg'
            }
        },
        mounted:function(){
            this.getHeight()
            live.init('57fa7d76458c484f14249ba7',
                    '123',
                    1,
                    '57ce8cc24ff6a709ce1c82f0',
                    1,
                    1,
                    '欢迎光临'
            );
            live.timingTask();
            // 定时更新用户在线时间
            setInterval(function(){
                live.timingTask();
            },60000);

            //定时更新当前聊天室人数
            setInterval(function(){
                live.initRoomWN();
            },30000);
            live.initRoomWN();
            // 初始化
            live.addUserNum(1);
            // console.log()
            
        },
        created(){
            bus.$on('sendMessage', (data) => {
				this.todo.push({
                    pic:data.user_headurl,
                    time:data.c_t,
                    name:data.user_name,
                    content:data.content,
                });
                this.$nextTick(() => {
                    this.$refs.tabcontent.scrollTop = this.$refs.scroll.clientHeight - this.Height;
                    // console.log(this.$refs.scroll.clientHeight)
                    this.content = ''
                });
            });
            chooseList.$on('chooseListmessage', (data) => {
                this.chooselist.push({
                    name:data.user_name,
                    content:data.content,
                    reply:data.reply,
                    user_headurl:data.user_headurl,
                    to_message_content:data.to_message_content,
                    to_user_name:data.to_user_name,
                    user_headurl:data.user_headurl
                })
            });
        },
        methods:{
            changeNumFn(ev){
                var reg = /^\d{1,4}$/;
                 
                if(!reg.test(ev.target.value)){
                    Toast('金额只能为纯数字')
                    ev.target.value = ''
                    this.money=ev.target.value
                    return
                }else{
                    this.money=ev.target.value
                }   
                
                
                
                console.log(this.money)
            },
            changeMoneyNum(value){
                this.money=value
                console.log(this.money)
                this.setMoney = false
            },
            setMoneyFn(){
                this.setMoney=!this.setMoney;
            },
            dialogShowFn(){
                this.dialogShow = !this.dialogShow
            },
            changeTabFn(){
                this.activeClass=!this.activeClass
            },
            getHeight(){
                let videoplay = this.$refs.videoplay.getBoundingClientRect().height
                let videotab = this.$refs.videotab.getBoundingClientRect().height
                let ipinfo = this.$refs.ipinfo.getBoundingClientRect().height
                this.Height = parseInt(document.body.clientHeight - (videoplay + videotab + ipinfo) - 60 ) 
                
            },
            tiwen(ev){
                    if(this.content == ''){
                        Toast('留言不能为空')
                        return
                    }else if(/<\/?[^>]*>/g.test(this.content)){
                        Toast('输入有误')
                        this.content = ''
                        return
                    }
                    
                    // 留言参数类型为string
                    let message = {
                        'live_show_id':live.id,
                        'title':'', // 留言标题
                        'content':this.content, // 留言内容
                        'content_type':'2', // 留言类型，1留言2提问
                        'content_header':'2', // 留言内容类型 1图片2文字
                        'message_type':'2', // 预告留言为1，直播留言为2
                        'user_id':live.lookUser.objectId, // 留言用户
                        'user_name':live.lookUser.realname, // 留言用户名字
                        'user_headurl':live.lookUser.iconUrl, // 留言用户用户头像
                        'user_type':'1', // 留言用户类型，1 普通用户 2 运营人员
                        'state':'1', // 1 有效 2 无效 3 用户删除
                        'reply':'1', // 0 一级留言 1 回复
                        'to_message_id':'' // 上级回复id
                    }
                    live.saveComment(JSON.stringify(message));

                    
                    
                    // this.content = ''

                    
            }
            
        },
        components:{
            dialogLive
        },
    }
    
</script>
<style>
    .video-wrap{
        /*background: #eaeaea;*/
        height: 100%;
        position: relative;
    }
    .video-play{
        width: 100%;
        height: 416px;
    }
    .video-play .img{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        background-size: cover;
    }
    #rtmpPlayer{
        width: 100%;
        height: 416px;
    }
    .ip-info{
        height: 80px;
        font-size: 25px;
        color: #939191;
        padding: 0 55px 0 30px;
        line-height: 80px;
        background: #fff;
    }
    .ip-info .num{
        color: #f2ad69;
        padding-left: 10px;
    }
    .ip-info .name{
        color: #101010;
        padding-left: 10px;
    }
    .video-tab{
        display:flex; 
        height: 85px;
        background: #fff;
        border-top: 10px solid #eeeeee;
        border-bottom: 2px solid #eeeeee
    }
    .voice-ico{
        width: 36px;
        height: 25px;
        /*background: url('../../assets/voice.png') no-repeat;*/
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
        margin-top: -8px;
    }
    .video-tab p{
        -webkit-flex: 1;
        -webkit-flex: 1;
        -moz-flex:1;
        -ms-flex:1;
        flex:1;
        text-align: center;
        font-size: 26px;
        color: #7d7d7d;
         
    }
    .video-wrap .changeTab{
        height: 80px;
        line-height: 70px;
    }
    .tab-content{
        background: #fff; 
        -webkit-overflow-scrolling: touch; 
    }
    .hidden{
        overflow-y:auto ;
    }
    .user-info {
        padding:0 25px;
        font-size: 28px;
    }
    .user-info li{
        padding: 0 0 40px;
        width: 100%;
        border-bottom: 1px solid #ebebeb;
    }
    .user-info li img{
        width: 66px;
        height: 66px;
        border-radius: 50%;
    }
    .user-info .right{
        margin-left: 83px;
    }
    .user-info .user-name{
        font-size: 28px;
        color: #ababab;
        padding-bottom: 8px;
    }
    .user-info .right p{
        list-style: 38px;
    }
    .footer{
        display:flex; 
        padding: 18px;
        position: fixed;
        bottom: 0;
        background: #f2f2f2;
        width: 100%;
        box-sizing: border-box;
    }
    .tiwen-input{
        -webkit-flex: 5;
        -webkit-flex: 5;
        -moz-flex:5;
        -ms-flex:5;
        flex:5;
        margin-right: 19px;
        font-size: 30px;
        padding: 0 22px; 
        height: 70px;
        border:1px solid #c0c0c0;
        box-sizing: border-box;
    }
    .tiwen{
        -webkit-flex: 1;
        -webkit-flex: 1;
        -moz-flex:1;
        -ms-flex:1;
        flex:1;
        font-size: 30px;
        width: 100px;
        height: 70px;
        line-height: 70px;
        background: #77c34f;
        text-align: center;
        color: #fff;
        text-decoration: none;
    }
    .rewards{
        margin-left: 15px;
        background: url('../../assets/reward.png') no-repeat;
        background-size: 100%;
        width: 70px;
        height: 70px;
     
    }
    .video-announced{
        position: relative;
        font-size: 32px;
        color: #fff;   
    }
    .video-announced .remind-me{
        width: 100%;
        position: absolute;
        left: 0; 
        height: 90px;
        bottom: 0;
        display: flex;
        background: #5065ab;
        text-align: center;
        font-weight: 500;
        line-height: 90px;
    }
    .remind-me span{
        display: inline-block;
         -webkit-flex: 4;
        -webkit-flex: 4;
        -moz-flex:4;
        -ms-flex:4;
        flex:4;
    }
    .remind-me em{
        display: inline-block;
         -webkit-flex: 2;
        -webkit-flex: 2;
        -moz-flex:2;
        -ms-flex:2;
        flex:2;
        background: #e74447;
    }
    .remind-me p{
        display: inline-block;
         -webkit-flex: 1;
        -webkit-flex: 1;
        -moz-flex:1;
        -ms-flex:1;
        flex:1;
    }
    .control-tip{
        background:#f28942;
        color: #fff;
        padding: 3px 6px;
        font-size: 20px;
        border-radius: 5px;
        font-weight: 500;
        margin-left: 10px;
        display: inline-block;
    }
    .quote{
        display: block;
        padding: 18px;
        background: #f6f6f6;
        line-height: 35px;
        margin-top: 15px;
        font-size: 26px;
    }
    .user-name{
        padding-right: 10px;
    }
    .welcomingWords{
        text-align: center;
        font-weight: 500;
        margin: 30px 0 
    }
    .welcomingWords span{ 
        display: block;     /*设置为块级元素会独占一行形成上下居中的效果*/
        font-size: 28px;
        color: #f28942;
        position: relative;   /*定位横线（当横线的父元素）*/
    }            
    .welcomingWords span:before,.welcomingWords span:after{
        content: '';                 /*CSS伪类用法*/
        position: absolute;         /*定位背景横线的位置*/
        top: 52%;
        background: #c3c3c3;       /*宽和高做出来的背景横线*/
        width: 16%;
        height: 2px
    }
    .welcomingWords span:before{
        left: 11%;        /*调整背景横线的左右距离*/
    }
    .welcomingWords span:after {
        right: 11%;
    }
</style>