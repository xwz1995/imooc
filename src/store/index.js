import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import home from './modules/home'
import announced from './modules/announced'
import getuserinfo from './modules/getuserinfo'
import getyzm from './modules/getyzm'
import bindPhone from './modules/bindPhone'
import getweixinsign from './modules/getweixinsign'
import myticket from './modules/myticket'
import invitation from './modules/invitation'
import createLogger from './middleware/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    home,
    announced,
    getuserinfo,
    invitation,
    getyzm,
    getweixinsign,
    bindPhone,
    myticket,
  },
  plugins: debug ? [createLogger()] : []
})
