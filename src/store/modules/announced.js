import * as types from '../mutation-types'
import api from '../../api/announced'
import { Toast } from 'mint-ui'

const state = {
    unitPrice: 0,
    count: 1,
    totalPrice: 0,
    PreInfoData:{}
}

const getters = {
    unitPrice: state => state.unitPrice,
    count: state => state.count,
    totalPrice: state => state.totalPrice,
    PreInfoData: state => state.PreInfoData
}

const mutations = {
    [types.UPDATE_COUNT] (state, num) {
        state.count += num;
        state.totalPrice = state.unitPrice * state.count;
    },
    [types.PRE_INFO] (state, response) {
        if(response.code == '1000'){
            state.PreInfoData = response.result;
            state.unitPrice = response.result.price;
            state.totalPrice = state.unitPrice * state.count;
        }else{
            Toast({
					message: response.msg,
				});
        }
        console.log(response)
    }
}

const actions = {
    updateCount ({ commit, state }, num) {
        if (!(state.count <= 1 && num <= -1)) {
            commit(types.UPDATE_COUNT, num);
        }
    },
    getPreInfo ({commit },options){
        api.getPreInfo(options).then((data)=>{
            commit(types.PRE_INFO, data.body);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}