import * as types from '../mutation-types'
import api from '../../api/invitation'
import { Toast } from 'mint-ui'

const state = {
    invitationInfo:{}
}
const getters = {
    invitationInfo: state => state.invitationInfo
}
const mutations = {
    [types.INVITATION_INFO](state,res){
        if(res.code == '1000'){
            state.invitationInfo = res.result;
        }else{
            Toast({message: res.msg});
        }
        console.log(res)
    }
}
const actions = {
    getInvitation({commit},option){
        api.getInviteInfo(option).then((res)=>{
            commit(types.INVITATION_INFO,res.body)
        })
    }
}
export default{
    state,
    getters,
    mutations,
    actions
}