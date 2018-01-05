import Vue from 'vue'
import Router from 'vue-router'
import Announced from '@/components/announced/index'
import Invitation from '@/components/Invitation/index'
import myInvitation from '@/components/myInvitation/index'
import Live from '@/components/Live/index'
import Hello from '@/components/hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/announced/:id',
      name: 'Announced',
      component: Announced
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/invitation/:liveShowId/:userId',
      name: 'Invitation',
      component: Invitation
    },
    {
      path: '/myinvitation/:liveShowId',
      name: 'myInvitation',
      component: myInvitation
    },
    {
      path: '/live/:liveShowId',
      name: 'live',
      component: Live
    }
  ]
})
