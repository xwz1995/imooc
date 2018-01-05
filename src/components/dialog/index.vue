<template>
    <transition name="fade">
        <div class="dialog" v-show="dialogShow">
            <div class="content">
                <div class="header">
                    身份验证（每人只可领取一次）
                    <i class="close-write" @click="dialogShowFn"></i>
                </div>
                <div class="wrap">
                    <p>
                        <label>手机号</label><input type="text" @input="changePhoneNum($event)" /><a href="javascript:;" ></a>
                    </p>
                    <p>
                        <label>验证码</label><input type="text" @input="changeYzm($event)" /><a href="javascript:;" class="get-yzm" @click="getYzm">{{yzmval}}</a>
                    </p>
                    <div class="success" @click="bindFn">
                        完成
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
            dialogShow:null,
            yzmval:''
        },
        methods:{
            dialogShowFn(){
                this.$emit('dialog-cancel')
            },
            changePhoneNum(ev){
                this.$emit('change-phone-num',ev)
            },
            changeYzm(ev){
                this.$emit('change-yzm',ev)
            },
            bindFn(){
                this.$emit('bind-phone')
            },
            getYzm(){
                this.$emit('get-yzm')
            }
        }
    }
</script>
<style>
    .dialog{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        z-index: 10;
        box-sizing: border-box
    }
    .dialog .content{
        position: fixed;
        top:50%;
        left: 50%;
        margin-left: -324px;
        height: 460px;
        margin-top: -230px;
    }
    .dialog .header{
        width: 648px;
        height: 85px;
        line-height: 85px;
        font-size: 28px;
        color: #fff;
        padding-left: 35px;
        width: 100%;
        box-sizing: border-box;
        background: #77c34f;
        position: relative;
    }
    .dialog .close-write{
        width: 20px;
        height: 20px;
        position: absolute; 
        right:40px;
        top:30px;
        background: url('../../assets/close-write.png') no-repeat;
        background-size: cover;
    }
    .dialog .wrap{
        background: #fff;
        padding: 0 35px 44px;
        box-sizing: border-box;
        width:648px;
    }
    .dialog .wrap{
        color: #0e0e0e;
        font-size: 26px;
    }
    .dialog .wrap p{
        border-bottom:1px solid #dedede;
        height: 56px;
        line-height: 56px;
        padding: 20px 0;
    }
    .dialog .wrap p label{
        font-size: 26px;
        width: 20%;
        display: inline-block;
    }
    .dialog .wrap p input{
        font-size: 28px;
        margin: 0;
        padding-left: 10px;
        box-sizing: border-box;
        width: 38%;
        margin-right: 5%;
    }
    .dialog .wrap p a{
        display:inline-block;
    }
    .dialog .wrap p a.get-yzm{
        background: #77c34f;
        color:#fff;
        text-decoration: none;
        border-radius: 10px;
        height: 56px;
        padding: 0 20px;
        line-height: 56px;
        width: 167px;
        text-align: center;
    }
    .dialog .success{
        background: #77c34f;
        color:#fff;
        height: 80px;
        line-height: 80px;
        margin-top: 50px;
        text-align: center;
        font-size: 30px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>