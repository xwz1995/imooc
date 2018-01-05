import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
    getYzm : options => Vue.http.get('/api/zhibo/front/v1/code/getMobileCode',options)
}