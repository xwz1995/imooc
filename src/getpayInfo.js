//分享组件
import Vue from 'vue'
import VueResource from 'vue-resource'
import config from "./config"
// import bridgeReady from './bridgeReady'
import jquery from 'jquery'
import './bus'
let isBlag=true;
function getPayInfo(ip_id,service_id,user_id,openid,order_from,callback){
	if(!isBlag){
		return;
	}
	isBlag=false;
    jquery.ajax({
          url:'/api/zhibo/v1/order/create',
          type:'POST',
          dataType:'json',
          data:{
        	  openid: openid,
        	  user_id: user_id,
        	  service_id: service_id,
        	  ip_id: ip_id,
			//   openid: 'oZbwiwNFY49pL0pEl4HfS-V39D7U',
        	//   user_id: '58da5b36c02864a228522f5e',
        	//   service_id: '58d38922fce2829a4c288cd8',
        	//   ip_id: '58075ddd458c4856da49081d',
        	  trade_type: "JSAPI",
        	  charge_source: 1,
			  order_from:order_from
        	},
          success:function(res){
			if(res.status == '10000'){
				 if(res.result.prepayid != 'non-essential-pay'){
					//  alert('收费')
					 wx.chooseWXPay({
						timestamp: res.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: res.result.nonceStr, // 支付签名随机串，不长于 32 位
						package: res.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: res.result.paySign, // 支付签名
						success: function (res) {
							//   alert(res+"+");
							isBlag=true;
							if(res.errMsg == "chooseWXPay:ok" ) {
								callback();
							}else{
								alert(res.errMsg);
							}
						},
						cancel:function(res){
							isBlag=true;
							//   alert(res+"*"+"用户取消支付");
							//支付取消
						},
						error:function(res){
							isBlag=true;
							alert('支付发生错误'+JSON.stringify(res));
						}
				
					});
				 }else{
					//  alert('免费')
					 callback();
				 }
			}else{
				isBlag=true;
				alert(res.msg);
				
			}      
        	 
          }
      });
}
export default getPayInfo;