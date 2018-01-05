import Vue from 'vue'
import { Toast } from 'mint-ui'
import VueResource from 'vue-resource'

var userInfo = {
    data:()=>{
        return{
            day:'00',
            hour:'00',
            minute:'00',
            second:'00',  
            num:60,
            yzmval:'获取验证码',
            cfg:{},
            weixinsigndata:{},
            weixinoptionsdata:{},
            weixinpayinfodata:{}
        }
    },
    methods:{
        getTime:function ShowCountDown(time){
            var now = new Date();
            var endDate = time.replace(new RegExp("-","gm"),"/");
            endDate = new Date(time);
            var leftTime=endDate.getTime()-now.getTime();
            if(leftTime<=0){
                return
            }else{
                this.day= parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
                this.hour= parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
                this.minute= parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
                this.second= parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                this.day = this.checkTime(this.day);
                this.hour = this.checkTime(this.hour);
                this.minute = this.checkTime(this.minute);
                this.second = this.checkTime(this.second);//小于10的话加0
            }
        },
        checkTime:function(i){
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        formatyzm:function(){
            this.yzmval = this.num + 's'
            let time = setInterval( () =>{
                this.num--
                if(this.num==0){
                    clearInterval(time)
                    this.yzmval = '获取验证码'
                }else{
                    this.yzmval = this.num + 's'
                }
            },1000)
        },
        getweixinsign:function(data,option){
            this.weixinsigndata = data
            this.weixinoptionsdata = option
            if(window.wx){
                this.cfg={
                        debug: false, // 开启调试模式
                        appId: this.weixinsigndata.appId, // 必填，公众号的唯一标识
                        timestamp: this.weixinsigndata.timestamp, // 必填，生成签名的时间戳
                        nonceStr: this.weixinsigndata.nonceStr, // 必填，生成签名的随机串
                        signature: this.weixinsigndata.signature,// 必填，签名，见附录1
                        jsApiList: ["chooseImage", "uploadImage", "downloadImage", "onMenuShareTimeline", "onMenuShareAppMessage","hideOptionMenu","showOptionMenu","chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    };
                window.wx.config(this.cfg);
                window.wx.ready(function () {
                    if(this.weixinoptionsdata.timeline){
                        window.wx.onMenuShareTimeline(this.weixinoptionsdata.timeline);
                    }else{
                        // window.wx.onMenuShareTimeline(tmconfig);
                    }
                    if(this.weixinoptionsdata.friend){
                        window.wx.onMenuShareAppMessage(this.weixinoptionsdata.friend);
                    }else{
                    }
                });
            }
        }
    }
}
export default userInfo