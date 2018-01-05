import * as types from '../mutation-types'
import api from '../../api/getuserinfo'
import { Toast } from 'mint-ui'

const state = {
    userinfo:{}
}
const getters = {
    userinfo: state => state.userinfo
}
const mutations = {
    [types.USER_INFO](state,response){
        if(response.code == '1000'){
            state.userinfo = response.result
        }else{
            Toast(response.msg)
        }
    }
}
const actions = {
    getuserinfo({ commit }){
        api.getUserInfo().then((response)=>{
            commit(types.USER_INFO,response.body)
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}