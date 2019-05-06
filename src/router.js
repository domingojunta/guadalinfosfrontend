import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Entidades from './components/Entidad.vue'
import Ordenes from './components/Orden.vue'
import Convocatorias from './components/Convocatoria.vue'
import Solicitudes from './components/Solicitud.vue'
import ConcesionSolicitudes from './components/ConcesionSolicitudes.vue'
import ConcesionComunicacion from './components/ConcesionComunicacion.vue'
import ConcesionRequerimiento from './components/ConcesionRequerimiento.vue'
import ConcesionPropuesta from './components/ConcesionPropuesta.vue'
import ConcesionResolucion from './components/ConcesionResolucion.vue'
import ConcesionPrimerPago from './components/ConcesionPrimerPago.vue'
import LiquidacionRequerimiento from './components/LiquidacionRequerimiento.vue'
import LiquidacionPropuesta from './components/LiquidacionPropuesta.vue'
import LiquidacionResolucion from './components/LiquidacionResolucion.vue'
import LiquidacionJustificacion from './components/LiquidacionJustificacion.vue'
import LiquidacionSegundoPago from './components/LiquidacionSegundoPago.vue'
import ReintegroAcuerdoInicio from './components/ReintegroAcuerdoInicio.vue'
import ReintegroResolucion from './components/ReintegroResolucion.vue'
import ReintegroCobro from './components/ReintegroCobro.vue'
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
    },
    {
      path: '/concesionSolicitudes',
      name: 'concesionSolicitudes',
      component: ConcesionSolicitudes
    },
    {
      path: '/concesionComunicacion',
      name: 'concesionComunicacion',
      component: ConcesionComunicacion
    },
    {
      path: '/concesionRequerimiento',
      name: 'concesionRequerimiento',
      component: ConcesionRequerimiento
    },
    {
      path: '/concesionPropuesta',
      name: 'concesionPropuesta',
      component: ConcesionPropuesta
    },
    {
      path: '/concesionResolucion',
      name: 'concesionResolucion',
      component: ConcesionResolucion
    },
    {
      path: '/concesionPrimerPago',
      name: 'concesionPrimerPago',
      component: ConcesionPrimerPago
    },
    {
      path: '/liquidacionRequerimiento',
      name: 'liquidacionRequerimiento',
      component: LiquidacionRequerimiento
    },
    {
      path: '/liquidacionPropuesta',
      name: 'liquidacionPropuesta',
      component: LiquidacionPropuesta
    },
    {
      path: '/liquidacionResolucion',
      name: 'liquidacionResolucion',
      component: LiquidacionResolucion
    },
    {
      path: '/liquidacionJustificacion',
      name: 'liquidacionJustificacion',
      component: LiquidacionJustificacion
    },
    {
      path: '/liquidacionSegundoPago',
      name: 'liquidacionSegundoPago',
      component: LiquidacionSegundoPago
    },
    {
      path: '/reintegroAcuerdoInicio',
      name: 'reintegroAcuerdoInicio',
      component: ReintegroAcuerdoInicio
    },
    {
      path: '/reintegroResolucion',
      name: 'reintegroResolucion',
      component: ReintegroResolucion
    },
    {
      path: '/reintegroCobro',
      name: 'reintegroCobro',
      component: ReintegroCobro
    }
  ]
})
