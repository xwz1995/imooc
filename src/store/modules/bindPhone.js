import * as types from '../mutation-types'
import api from '../../api/bindPhone'
import { Toast } from 'mint-ui'
const state = {
    bindInfo:{}
}
const getters = {
    bindInfo : state => state.bindInfo
}
const mutations = {
    [types.BIND_PHONE](state , res){
        state.bindInfo = res
    }
}
const actions = {
    bindPhone({commit},options){
        api.bindPhone(options).then((res)=>{
            commit(types.BIND_PHONE,res.body)
        })
    }
}
export default  {
    state,
    getters,
    mutations,
    actions
}