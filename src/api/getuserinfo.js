import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
    getUserInfo : options => Vue.http.get('/api/zhibo/front/v1/user/getUserInfo',options)
}