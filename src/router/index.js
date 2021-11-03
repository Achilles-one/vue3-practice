import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Chatroom from '../views/Chatroom.vue'
import { projectAuth } from '../firebase/config'

// auth guard
const requireAuth = ( to, from, next ) => {
  let user = projectAuth.currentUser
  // console.log('current user in auth guard: ', user)
  if(!user) {
    next({ name: 'Welcome' })
  }
  else{
    next()
  }
}

// 已经登录的在welcome页面不用再登录,直接转Chatroom
const requireNoAuth = ( to, from, next ) => {
  let user = projectAuth.currentUser
  // console.log('current user in auth guard: ', user)
  if(user) {
    next({ name: 'Chatroom' })
  }
  else{
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
