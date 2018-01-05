import Vue from 'vue'
import { bus }  from './bus'
import { chooseList }  from './bus'
import BASE from './base'
 var host = "http://zhibo.dejikeji.com";
 import $ from 'jquery'
//直播信息
var live = {
		
		id:'',//直播id
		
		ip_id:'',//IP id

		show_state:'',
		
		likeNumber:0,
		
		querytion_state:1,

        ipState:1,
        
        welcome_message:'',

        // 定时任务
        timingTask:function(){
            $.ajax({
                url: host+"/api/zhibo/v1/liveshow/pushUserTime",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                data: {//参数值
                    live_show_id:live.id,
                    user_id:live.lookUser.objectId,
                },
                type: "POST",   //请求方式
                success: function(data) {

                },
            });
        },

		// 获取用户的微信信息
		getweixininfo:function(){
			// live.lookUser.weixin = {
			// 	'iconUrl':'http://img0.pconline.com.cn/pconline/1306/02/3324702_1353z5f435920-140ce1.jpg',
			// 	'realname':'肖冰测试',
			// 	'city':'北京',
			// 	'province':'北京',
			// 	'gender':0,
			// 	'deji_user_id':'aljsdlfasdf'
			// }
			// live.loadUser();
			// //初始化im
			// live.initIM();
			// return;
			$.ajax({            
	            url: BASE.GETUSERINFO,
	            dataType: "json",   //返回格式为json
	            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
	            data:{

                },    
	            type: "GET",   //请求方式
	            success: function(data) {
					if(data.code == 1001){
						alert('没有登录,前往登录')
						window.location.href= '/#/login'
					}else{
						console.log(data.userInfo)
						live.lookUser.weixin = {
							'iconUrl':data.userInfo.authData.weixin.headimgurl,
							'realname':data.userInfo.realname,
							'city':data.userInfo.authData.weixin.city,
							'province':data.userInfo.authData.weixin.province,
							'gender':data.userInfo.authData.weixin.sex==2?0:1,
							'deji_user_id':data.userInfo.userId
						}
						live.loadUser();
						//初始化im
						live.initIM();
					}
	            },
				error:function(){
					// alert("获取微信关注信息失败，请重新刷新页面");
					// $(".userFunction").animate({"bottom":"0rem"},function(){
						
					// })
				}
            });
		},
        initIM : function(){
            $.ajax({            
	            url: host+'/api/zhibo/v1/getIMToken',
	            dataType: "json",   //返回格式为json
	            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
	            data:{
               	 	user_id:live.lookUser.objectId,
                    user_name:live.lookUser.realname,
                    portrait_uri:live.lookUser.iconUrl
                },    
	            type: "GET",   //请求方式
	            success: function(data) {
	                if(data.status == "10000"){
	                  	 data = data.result;
	                  	 //alert(data.result.token);
	                  	 dejiIM.init(data.appid,data.token,live.id);
	                  	 dejiIM.initCount(0);
	                  	 //初始化链接监听
	                   	 dejiIM.connectionListener(function(){
	                   		 //重复登陆的动作
	                   		alert("在其他设备上登陆了！");
	                   	 });
	                   	 //初始化信息监听
	                   	 dejiIM.messageListener(function(message){
	                   		 //操作信息将信息添加到列表上
	                   		live.commentRender(message);

	                   	 });
	                   	 //链接
	                   	 dejiIM.connect(function(chatRoomInfo){
	                   		 console.log("当前观众："+chatRoomInfo.userTotalNums);
	                   		  //$("#now_audience").html("<span>当前观众：</span>"+chatRoomInfo.userTotalNums+"人")
	                   	 },2);
	                   	
	                   }else if(data.status == 11000){
	                	   
	                        //alert("userid=="+live.lookUser.objectId+"  "+data.result);
	                   }  
	            }
            });
        },
        
        initRoomWN : function(){
        	
        	//改为从本地获取w_n	
            $.ajax({
                url: host+"/api/zhibo/v1/liveshow/getShowWN",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                data: {//参数值
                    live_show_id:live.id
                },    
                type: "GET",   //请求方式
                success: function(data) {
                	console.log("当前观众："+data.result.w_n);
                	$("#now_audience").html("<span>观看人数：</span>"+data.result.w_n+"人");
                },
            });
        	

        },
        // 观看人数
        addUserNum:function(num){
            $.ajax({
                url: host+"/api/zhibo/v1/liveshow/addUserNum",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                data: {//参数值
                    live_show_id:live.id,
                    user_id:live.lookUser.objectId,
                    num:num,
                    type:1
                },    
                type: "POST",   //请求方式
                success: function(data) {
					
                },
            });
        },
		//去ip主页
		goIPMainPage:function(){
            // 跳转到ip主页
            window.location.href = host+"/#/hr/homePage/"+live.ip_id;
		},
		//去重播页
		goIPReviewPage:function(){
            // 跳转到重播页
            window.location.href = host+"/live/review/"+live.id;
		},
		//当前观看的登陆用户
		lookUser:{
			isLogin:false,
			info:{},
			weixin:{}
		},

		// 分享设置的初始化
		timeline:{
			title: '', // 分享标题
			desc:'',
			link: '', // 分享链接
			imgUrl: '', // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		},
		//加载公告留言
		loadComments:function(){
			//从服务器端加载已有的留言
			// contentType 1留言 2 提问
            // message_type 1预告信息 2直播信息
            $.ajax({
                url: host+"/api/zhibo/v1/comments/chooselist",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                data: {//参数值
                    live_show_id:live.id,
                    message_type:2,
                    content_type:2
                },    
                type: "GET",   //请求方式
                success: function(data) {
                	if(data.result.count>0){
                		var datas = data.result.results.reverse();
                        // console.log(data.result.results)
                		for (var t = 0; t < datas.length; t++) {
                			live.commentRender(datas[t]);
						}
                	}
                	
					$("#appendchildNewUser").append('<li style="text-align:center;color:red;">---------- '+live.welcome_message+' ----------</li>');

                }
            });
		},
		
		//加载当前登陆用户信息
		loadUser:function () {
			try {
				if(live.lookUser.weixin&&live.lookUser.weixin.realname){
					live.lookUser.realname = live.lookUser.weixin.realname;
					live.lookUser.iconUrl = live.lookUser.weixin.iconUrl;
					live.lookUser.objectId = live.lookUser.weixin.deji_user_id;
					live.lookUser.isLogin = true;
					return;
				}else{
					live.lookUser.isLogin = false;
					live.goLogin();
					return;
				}
				
			} catch (e) {
					alert(e.name + ": " + e.message);
			}
			return;
		},

		// 信息弹框
        messageAlert:function(msg){
            $("#errmsg").show();
            $("#msgtext").html(msg);
            setTimeout(function(){
                $("#errmsg").hide();
            },1500)
        },
		
		//留言
		saveComment:function (message,callback) {
   			//测试留言结束
			if(live.lookUser.isLogin){
				$.ajax({
                    url: host+"/webapi/zhibo/v1/sendMessage",    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                    data: {//参数值
                        userMessage:message
                    },    
                    type: "POST",   //请求方式
                    beforeSend: function() {
                        //请求前的处理
                        //可以做数据提交前的校验 
                    },
                    success: function(data) {
                        //请求成功时处理
                        if(data.status=='10000'&&data.result=='1'){
                            // 成功
                        	//将消息发送到
                            dejiIM.sendMessage(data.data,{
                            	onSuccess:function(){
                            		live.commentRender(data.data);
                            		console.log("发送成功");
                                    if(callback)callback()
                            	},
                            	onFailure:function(){
                            		
                            	}
                            });                            
                        }else if(data.status=='10000'&&data.result=='2'){
                            // 错误
                            console.log('发送失败！');
                            live.messageAlert("发送失败！");
                        }else if(data.status=='10000'&&data.result=='3'){
                            // 用户被禁言
                            console.log('您已被禁言！');
                            live.messageAlert("您已被禁言！");
                        }else if(data.status=='10000'&&data.result=='4'){
                            // 禁言
                            console.log('房间禁言');
                            live.messageAlert("房间禁言");
                        }
                    },
                    complete: function() {
                        //请求完成的处理
                    },
                    error: function() {
                        //请求出错处理
                    }
                });
          }else{
          		
               window.location.href= '/#/login'
           }
		},
		
		//更新留言列表显示
		commentRender:function (message) {
            if(message.user_type=='2'){
					//回复用户与否，显示内容不同
                setTimeout(function(){
                    chooseList.$emit("chooseListmessage",message)
                },0) 
                   
            }else{
                setTimeout(function(){
                    bus.$emit("sendMessage",message)
                },0) 
            }
            
		},
		// 分享设置
		shareInit:function(timeline){
			if(window.location.href.indexOf('debug')>-1){
				return;
			}
			$.ajax({
				url: host+"/weixin/sign",    //请求的url地址
				dataType: "json",   //返回格式为json
				async: true, //请求是否异步，默认为异步，这也是ajax重要特性
				data: {//参数值
					url:location.href.split('#')[0]
				},    
				type: "GET",   //请求方式
				beforeSend: function() {
					//请求前的处理
					//可以做数据提交前的校验 
				},
				success: function(res) {
					//请求成功时处理
					if(window.wx){
						var cfg={
							debug: false, // 开启调试模式
							appId: res.appId, // 必填，公众号的唯一标识
							timestamp: res.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.nonceStr, // 必填，生成签名的随机串
							signature: res.signature,// 必填，签名，见附录1
							jsApiList: ["chooseImage", "uploadImage", "downloadImage", "onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						};
						window.wx.config(cfg);
						window.wx.ready(function () {
							// 分享到朋友圈
							window.wx.onMenuShareTimeline(timeline);
							// 分享给朋友
							window.wx.onMenuShareAppMessage(timeline);
						});
						window.wx.error(function (res) {
							live.messageAlert(JSON.parse(res));
						});
					}
				},
				complete: function() {
					//请求完成的处理
				},
				error: function() {
					//请求出错处理
				}
			});
		},
		// 获取分享详情
		getShareInfo:function(){
			$.ajax({
				url: host+"/api/zhibo/v1/liveshow/getshare",    //请求的url地址
				dataType: "json",   //返回格式为json
				async: true, //请求是否异步，默认为异步，这也是ajax重要特性
				data: {//参数值
					live_show_id:live.id,
                	type:1
				},    
				type: "GET",   //请求方式
				beforeSend: function() {
					//请求前的处理
					//可以做数据提交前的校验 
				},
				success: function(data) {
					//请求成功时处理
					if(data&&data.result&&data.status=="10000"){
						live.timeline = {
							title: data.result.results[0].title, // 分享标题
							desc:data.result.results[0].intro,
							link: data.result.results[0].url, // 分享链接
							imgUrl: data.result.results[0].show_pic, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							},
						}
						live.shareInit(live.timeline);
					}
				},
				complete: function() {
					//请求完成的处理
				},
				error: function() {
					//请求出错处理
				}
			})
		},
		
		init:function(id,likeNumber,querytion_state,ip_id,ip_state,show_state,welcome_message){
			live.id = id;
			if(show_state == 3){
                live.goIPReviewPage();
            }
			//$("#focusConfirm").show();
			live.ipState = ip_state;
			live.likeNumber = parseInt(likeNumber=='' ? 0 : likeNumber);
			live.ip_id = ip_id;
			live.show_state = show_state;
			live.welcome_message=welcome_message;
			
			live.getweixininfo();
			//分享设置
			live.loadComments();
			// live.getShareInfo();
		}
		
};


export default live;