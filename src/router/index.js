import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import Scores from '@/views/Scores.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores,
    },
  ],
})

export default router
