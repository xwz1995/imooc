import * as types from '../mutation-types'
import api from '../../api/getticket'
import { Toast } from 'mint-ui'
const state = {
    myticketsinfo:{}
}
const getters = {
    myticketsinfo : state => state.myticketsinfo
}
const mutations = {
    [types.MY_TICKET](state,res){
        state.myticketsinfo = res.result
    }
}
const actions = {
    myTickets({commit},options){
        api.myTickets(options).then((res)=>{
            commit(types.MY_TICKET,res.body)
        })
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}