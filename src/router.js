import Vue from 'vue'
import Router from 'vue-router'
import 'lib-flexible'



import { Icon } from 'vant'

Vue.use(Icon)

// 导入页面组件
import Home from './views/Home.vue'
import Hot from './components/Hot.vue'
import Search from './components/Search.vue'
import Index from './components/Index.vue'
// import Playmusic from './components/Playmusic.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/index',
          name:'Index',
          component:Index
        },
        {
          path:'*',
          redirect:{path:'/index'}
        }, 
        {
          path:'/hot',
          name:'Hot',
          component:Hot
        },
        {
          path:'/search',
          name:'Search',
          component:Search
        }
        
      ]
 
    },
    {
      path: '/songlist/:dataList',
      name: 'Songlist',
      // route level code-splitting
      // this generates a separate chunk (Songlist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Songlist" */ './components/Songlist.vue')
    },
    {
      path: '/helloworld/:dataSongs',
      name: 'HelloWorld',
      component: () => import('./components/HelloWorld.vue')
    },
    {
      path: '/playmusic/:id',
      name: 'Playmusic',
      component: () => import('./components/Playmusic.vue')
    }
  ]
})
