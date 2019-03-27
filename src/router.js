import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Entidades from './components/Entidad.vue'
import Ordenes from './components/Orden.vue'
import Convocatorias from './components/Convocatoria.vue'
import Solicitudes from './components/Solicitud.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/entidades',
      name: 'entidades',
      component: Entidades
    },
    {
      path: '/ordenes',
      name: 'ordenes',
      component: Ordenes
    },
    {
      path: '/convocatorias',
      name: 'convocatorias',
      component: Convocatorias
    },
    {
      path: '/solicitudes',
      name: 'solicitudes',
      component: Solicitudes
    }
  ]
})
