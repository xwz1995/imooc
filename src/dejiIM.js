/**
 * 集成融云im
 */
var dejiIM = {
		token : '',
		
		appid : '',
		
		chatRoomId : '',
		
		count : 50,
		
		conversationtype : RongIMLib.ConversationType.CHATROOM,
		
		init : function(appid,token,chatRoomId){
			dejiIM.appid=appid;
			dejiIM.token=token;
			dejiIM.chatRoomId=chatRoomId;
			RongIMLib.RongIMClient.init(appid);
		},
		
		initCount : function(count){
			dejiIM.count=count;
		},
		
		initchatRoomId : function(chatRoomId){
			dejiIM.chatRoomId=chatRoomId;
		},
		
		//链接监听
		connectionListener : function(kickOff){
			// 设置连接监听状态 （ status 标识当前连接状态）
            // 连接状态监听器
            RongIMClient.setConnectionStatusListener({
               onChanged: function (status) {
                   switch (status) {
                       //链接成功
                       case RongIMLib.ConnectionStatus.CONNECTED:
                           console.log('链接成功');
                           break;
                       //正在链接
                       case RongIMLib.ConnectionStatus.CONNECTING:
                           console.log('正在链接');
                           break;
                       //重新链接
                       case RongIMLib.ConnectionStatus.DISCONNECTED:
                           console.log('断开连接');
                           break;
                       //其他设备登录
                       case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    	   kickOff();
                    	   console.log('其他设备登录');
                           break;
                         //网络不可用
                       case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                         console.log('网络不可用');
                         break;
                       }
               }});
		},
		//信息监听
		messageListener : function(operateCallback){
			// 消息监听器
            RongIMClient.setOnReceiveMessageListener({
               // 接收到的消息
               onReceived: function (message) {
                   // 判断消息类型
       
                   switch(message.messageType){
                       case RongIMClient.MessageType.TextMessage:
                              // 发送的消息内容将会被打印
                    	   var content = message.content.content;
                    	   content.messageId = message.messageUId;
                    	   operateCallback(content);
                           break;
                       case RongIMClient.MessageType.VoiceMessage:
                           // 对声音进行预加载                
                           // message.content.content 格式为 AMR 格式的 base64 码
                           RongIMLib.RongIMVoice.preLoaded(message.content.content);
                           break;
                       case RongIMClient.MessageType.ImageMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.DiscussionNotificationMessage:
                    	  
                           // do something...
                           break;
                       case RongIMClient.MessageType.LocationMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.RichContentMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.DiscussionNotificationMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.InformationNotificationMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.ContactNotificationMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.ProfileNotificationMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.CommandNotificationMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.CommandMessage:
                           // do something...
                           break;
                       case RongIMClient.MessageType.UnknownMessage:
                           // do something...
                           break;
                       default:
                           // 自定义消息
                           // do something...
                   }
               }
           });
		},
		//链接融云服务器
		connect:function(getRoomInfo,isRepeatLogin){
			//如果已经登录过就不用再登陆了 直接加入聊天室就可以了
			if(isRepeatLogin==1){
				console.log("登录过不用重复登陆");
				dejiIM.joinChatRoom();
                dejiIM.getChatRoomInfo(getRoomInfo);
				return false;
			}
			//如果没有登录过 就登陆并且加入聊天室
            RongIMClient.connect(dejiIM.token, {
              onSuccess: function(userId) {
            	  
            	
            		console.log("Login successfully." + userId);
                    //加入聊天室
                    dejiIM.joinChatRoom();
                    dejiIM.getChatRoomInfo(getRoomInfo);
                    
              },
              onTokenIncorrect: function() {
                console.log('token无效');
              },
              onError:function(errorCode){
                    var info = '';
                    switch (errorCode) {
                      case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                      case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                      case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                      case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                      case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                    }
                    console.log("errorcode:"+errorCode+info);
                  }
            });
            return true;
		},
		//加入聊天室
		joinChatRoom : function(){
			RongIMClient.getInstance().joinChatRoom(dejiIM.chatRoomId, dejiIM.count, {
				  onSuccess: function() {
				       // 加入聊天室成功。
				  },
				  onError: function(error) {
				    // 加入聊天室失败
					  alert(error);
				  }
				});
		},
		//退出聊天室
		quitChatRoom : function(){
			RongIMClient.getInstance().quitChatRoom(dejiIM.chatRoomId, {
				  onSuccess: function() {
				       // 退出聊天室成功。
				  },
				  onError: function(error) {
				    // 退出聊天室失败。
				  }
			});
		},
		//获取聊天室信息
		getChatRoomInfo : function(getRoomInfo){
			var order = RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
			RongIMClient.getInstance().getChatRoomInfo(dejiIM.chatRoomId, 20, order, {
			  onSuccess: function(chatRoom) {
				  getRoomInfo(chatRoom);
			       // chatRoom => 聊天室信息。
			    // chatRoom.userInfos => 返回聊天室成员。
			     // chatRoom.userTotalNums => 当前聊天室总人数。
			  },
			  onError: function(error) {
			    // 获取聊天室信息失败。
			  }
			});
		},
		//发送信息
		sendMessage : function(content,callback){
			var msg = new RongIMLib.TextMessage({content:content,extra:"附加信息"});
			 RongIMClient.getInstance().sendMessage(dejiIM.conversationtype, dejiIM.chatRoomId, msg, {
			                onSuccess: function (message) {
			                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
			                    //console.log("发送成功！");
			                    callback.onSuccess();
			                },
			                onError: function (errorCode,message) {
			                    var info = '';
			                    switch (errorCode) {
			                        case RongIMLib.ErrorCode.TIMEOUT:
			                            info = '超时';
			                            break;
			                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
			                            info = '未知错误';
			                            break;
			                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
			                            info = '在黑名单中，无法向对方发送消息';
			                            break;
			                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
			                            info = '不在讨论组中';
			                            break;
			                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
			                            info = '不在群组中';
			                            break;
			                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
			                            info = '不在聊天室中';
			                            break;
			                        default :
			                            info = x;
			                            break;
			                    }
			                    alert('发送失败:' + info);
			                }
			            }
			        );
		}

};

window.dejiIM = dejiIM;