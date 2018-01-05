<template>
    <div class="dialog-live" v-show="dialogShow">
        <div class="header">
            <i class="close-write" @click="dialogShowFn"></i>
        </div>
        <div class="wrap">
            <img src="../../assets/liuming.jpg" class="img"/>
            <p class="username">柳明</p>
            <div class="money">
                <span style="width:60%;display:inline-block;text-align: right"  v-show="!setMoney">￥
                    <span class="money-num">{{money}}</span>
                </span>
                <span class="set-money" v-show="setMoney">￥
                    <input type="text"  placeholder="" @input="changeNumFn($event)">
                </span>
                <span style="width:38%;display:inline-block;text-align: left" v-show="!setMoney">
                    <em @click="setMoneyFn">自定义金额</em>
                </span>
            </div>
            <div class="money-detail">
                <span @click="changeMoneyFn(1.99)"><em>￥</em>1.99</span>
                <span @click="changeMoneyFn(2.99)"><em>￥</em>2.99</span>
                <span @click="changeMoneyFn(3.99)"><em>￥</em>3.99</span>
            </div>
            <div class="success">
                马上打赏
            </div>
        </div>
        
    </div>
</template>
<script>
    export default{
        data:()=>{
            return{ 
            }
        },
        props:{
            dialogShow:null,
            setMoney:null,
            money:'',
            active:null
        },
        methods:{
            dialogShowFn(){
                this.$emit('dialog-cancel')
            },
            setMoneyFn(){
                this.$emit('set-money-num')
            },
            changeMoneyFn(num){
                this.$emit('change-money-num',num)
            },
            changeNumFn(ev){
                this.$emit('change-num',ev)
            }
        }
    }
</script>
<style>
    .dialog-live{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 10;
        padding: 0 50px;
        box-sizing: border-box
    }
    .dialog-live .header{
        width: 100%;
        height: 85px;
        line-height: 85px;
        font-size: 28px;
        color: #fff;
        padding-left: 35px;
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        position: relative;
        margin-top: 200px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .dialog-live .close-write{
        width: 20px;
        height: 20px;
        position: absolute; 
        left:40px;
        top:30px;
        background: url('../../assets/close-black.png') no-repeat;
        background-size: cover;
    }
    .dialog-live .wrap{
        background: #fff;
        padding: 0 35px 44px;
        box-sizing: border-box;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .dialog-live .wrap{
        color: #0e0e0e;
        font-size: 26px;
        text-align: center; 
    }
    .dialog-live .wrap .img{
        width: 147px;
        height: 147px;
        background-size:cover;
        margin: 0 auto;
        border-radius: 50%;      
    }
    .dialog-live .wrap .username{
        font-size: 38px;
        color: #323130;
        margin-top: 20px;
    }
    .dialog-live .wrap .money{
        font-size: 38px;
    }
    .dialog-live .wrap .money-num{
        font-size: 66px;
    }
    .dialog-live .wrap .money em{
        color: #77c34f;
        font-style: normal;
        font-size: 22px;
        display: inline-block;
        padding-left: 20px;
    }
    .dialog-live .success{
        background: #77c34f;
        color:#fff;
        height: 80px;
        line-height: 80px;
        width: 423px;
        margin: 0 auto;
        text-align: center;
        font-size: 30px;
        border-radius: 50px;
    }
    .money-detail{
        display:flex; 
        margin-top: 40px;
    }
    .money-detail span{
        flex: 1;
        margin:0 30px 50px 0;
        height: 68px;
        display: inline-block;
        /*border:2px solid #ebbf74;*/
        border:2px solid #ebebeb;
        line-height: 68px;
        /*color: #ebbf74;*/
        color: #ebebeb;
        font-size: 36px;
        border-radius: 50px;
    }
    .money-detail span em{
        font-size: 22px;
        font-style: normal;
    }
    .money-detail span:last-child{
        margin-right: 0;
    }
    .set-money{
        display: inline-block;
        width: 312px;
        border-bottom: 1px solid #eaeaea;
    }
    .set-money input{
        width: 50%;
        font-size: 66px;
        text-align: left;
        font-weight: normal;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
</style>