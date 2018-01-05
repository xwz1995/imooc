export default {
    // host:'http://192.168.10.34:8090',
    host:'http://weixin.fanhaiol.com',
    // host:'http://yg-test.dejikeji.com',
    BIND:'/api/front/v1/user/bind', //绑定信息请求
    GETINDEX:'/api/front/v1/index/getIndex', //获取首页信息
    CHANNELLIST:'/api/front/v1/channel/list', //获取某个精选栏目列表
    GETARTICLE:'/api/front/v1/article/getArticle', //获取文章信息
    LOUD:'/api/front/v1/loud/loud', //点赞/取消赞
    COMMENTLIST:'/api/front/v1/comment/list',
    GETUSERINFO:'/api/front/v1/user/getUserInfo', //获取当前当前用户信息
    COMMENTPUB:'/api/front/v1/comment/pub', //发表评论
    ISLOUD:'/api/front/v1/loud/isLoud', //判断用户当前是否点赞过
    GETCHANNELLIST:'/api/front/v1/channel/getChannelList', //获取栏目列表展示
    GETBANNERINFO:'/api/front/v1/channel/getBannerInfo', //获取当前栏目顶部Banner,
    GETCHANNELINDEXLIST:'/api/front/v1/channel/getChannelIndexList',//获取栏目首页列表
    GETREMIND:'/api/front/v1/liveshow/getRemind', //查询是否设置过提醒
    REMIND:'/api/front/v1/liveshow/remind', //设置直播提醒
    LIVESHOWFIND:'/api/front/v1/liveshow/find', //获取直播/预告/回顾信息,
    LIVEROOM:'/api/front/v1/liveshow/liveroom', //获取直播间列表
    WEIXINJUMP:'/api/weixin/jump', //
    WEIXINSIGN:'/api/weixin/sign', //获取签名
    GETSHAREINFO:'/api/front/v1/share/getShareInfo', //获取分享信息
    FLOWUPLOAD:'/api/front/v1/flow/upload' //用户观看视频流量上报
}