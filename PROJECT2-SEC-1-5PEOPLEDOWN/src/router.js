import {createRouter, createWebHistory } from 'vue-router'
const history = createWebHistory(import.meta.env.BASE_URL)
const routes = [
    {
      path: '/',
      name: 'main',
      component: () => import('./components/Mainpage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue')
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: () => import('./components/productDetail.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('./components/product.vue')
    },
    {
      path: '/Basket',
      name: 'Basket',
      component: () => import('./components/Basket.vue')
    },
    {
      path: '/Createaccount',
      name: 'Createaccount',
      component: () => import('./components/Createaccount.vue')
    },
    {
      path: '/Editprofile',
      name: 'Editprofile',
      component: () => import('./components/Editprofile.vue')
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('./components/Profile.vue')
    }
  ]
const router = createRouter({history,routes})
export default router