import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
export default {
    bindPhone : options => Vue.http.post('/api/zhibo/front/v1/liveshow/getTicket',options,{emulateJSON:true})
}