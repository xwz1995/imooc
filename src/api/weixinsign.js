import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
    getWeixinSign : options => Vue.http.get('/api/weixin/sign',options)
}