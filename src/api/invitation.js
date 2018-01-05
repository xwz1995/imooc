import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
    getInviteInfo : options => Vue.http.get('/api/zhibo/front/v1/liveshow/getInviteInfo',options)
}