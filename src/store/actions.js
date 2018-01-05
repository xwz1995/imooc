import api from '../api/home.js'
import * as types from './mutation-types'

export const getList = ({ commit, state }) => {
    api.getList({
        page: state.home.page,
        pageSize: 10
    }).then((data) => {
        commit(types.RECEIVE_LIST, data);
    });
}

export const changeName = ({ commit, state }, name) => {
    commit(types.CHANGE_NAME, name);
}