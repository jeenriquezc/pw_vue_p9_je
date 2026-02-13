import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VehiculoView from '../views/VehiculoView.vue'
import GuardarVehiculoView from '../views/GuardarVehiculoView.vue'
import RecibirTokenView from '../views/RecibirTokenView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: VehiculoView
  },
  {
    path: '/guardar-vehiculo',
    name: 'guardarVehiculo',
    component: GuardarVehiculoView
  },
  {
    path: '/recibir-token',
    name: 'recibirToken',
    component: RecibirTokenView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
