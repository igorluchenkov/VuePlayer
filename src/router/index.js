import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage/MainPage.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
    	path: '*',
    	redirect: '/player'
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
      children: [
        {
          path: 'player',
        },
        {
          path: 'playlist',           
        }
      ]
    },
  ]
})