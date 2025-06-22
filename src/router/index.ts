import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ParentPage1View from '@/views/ParentPage1View.vue'
import ParentPage2View from '@/views/ParentPage2View.vue'
import TeacherView from '@/views/TeacherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginView
    },
    {
      path: '/parent/page1',
      name: 'parentPage1',
      component: ParentPage1View
    },
    {
      path: '/parent/page2',
      name: 'parentPage2',
      component: ParentPage2View
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherView
    }
  ]
})

export default router
