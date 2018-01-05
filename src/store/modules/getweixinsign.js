import * as types from '../mutation-types'
import api from '../../api/weixinsign'
import { Toast } from 'mint-ui'

const state = {
    weixinsignInfo:{}
}
const getters = {
    weixinsignInfo: state => state.weixinsignInfo
}
const mutations = {
    [types.WEIXIN_SIGN](state,response){
        state.weixinsignInfo = response
    }
}
const actions = {
    getWeixinSign({ commit },options){
        api.getWeixinSign(options).then((response)=>{
            commit(types.WEIXIN_SIGN,response.body)
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}