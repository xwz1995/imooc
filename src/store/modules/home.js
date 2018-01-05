import * as types from '../mutation-types'

const state = {
    page: 1,
    items: [],
    name: ''
}

const getters = {
    items: state => state.items,
    name: state => {
        return state.name
    }
}

const mutations = {
    [types.RECEIVE_LIST] (state, data) {
        state.page += 1;
        state.items = state.items.concat(data);
    },
    [types.CHANGE_NAME] (state, name) {
        state.name = name;
    }
}

export default {
    state,
    getters,
    mutations
}