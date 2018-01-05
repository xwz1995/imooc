import * as types from '../mutation-types'
import api from '../../api/getyzm'
import { Toast } from 'mint-ui'
const state = {
    yzmInfo:{}
}
const getters = {
    yzmInfo : state => state.yzmInfo
}
const mutations = {
    [types.GET_YZM](state , res){
        state.yzmInfo = res
        if(res.code=="1000"){
            Toast(res.msg)
        }else{
            Toast(res.msg)
        }
    }
}
const actions = {
    getYzm({commit},options){
        api.getYzm(options).then((res)=>{
            commit(types.GET_YZM,res.body)
        })
    }
}
export default  {
    state,
    getters,
    mutations,
    actions
}