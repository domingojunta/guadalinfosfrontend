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
import Login from './components/Login.vue'
import store from './store'
import About from './views/About.vue'
import Usuarios from './components/Usuarios.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true,
        LECTOR:true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true,
        LECTOR:true
      }
    },
    {
      path: '/entidades',
      name: 'entidades',
      component: Entidades,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true,
        LECTOR:true
      }
    },
    {
      path: '/ordenes',
      name: 'ordenes',
      component: Ordenes,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true,
        LECTOR:true
      }
    },
    {
      path: '/convocatorias',
      name: 'convocatorias',
      component: Convocatorias,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true,
        LECTOR:true
      }
    },
    {
      path: '/solicitudes',
      name: 'solicitudes',
      component: Solicitudes,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true,
        LECTOR:true
      }
    },
    {
      path: '/concesionSolicitudes',
      name: 'concesionSolicitudes',
      component: ConcesionSolicitudes,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/concesionComunicacion',
      name: 'concesionComunicacion',
      component: ConcesionComunicacion,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/concesionRequerimiento',
      name: 'concesionRequerimiento',
      component: ConcesionRequerimiento,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/concesionPropuesta',
      name: 'concesionPropuesta',
      component: ConcesionPropuesta,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/concesionResolucion',
      name: 'concesionResolucion',
      component: ConcesionResolucion,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/concesionPrimerPago',
      name: 'concesionPrimerPago',
      component: ConcesionPrimerPago,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/liquidacionRequerimiento',
      name: 'liquidacionRequerimiento',
      component: LiquidacionRequerimiento,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/liquidacionPropuesta',
      name: 'liquidacionPropuesta',
      component: LiquidacionPropuesta,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/liquidacionResolucion',
      name: 'liquidacionResolucion',
      component: LiquidacionResolucion,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/liquidacionJustificacion',
      name: 'liquidacionJustificacion',
      component: LiquidacionJustificacion,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/liquidacionSegundoPago',
      name: 'liquidacionSegundoPago',
      component: LiquidacionSegundoPago,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/reintegroAcuerdoInicio',
      name: 'reintegroAcuerdoInicio',
      component: ReintegroAcuerdoInicio,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/reintegroResolucion',
      name: 'reintegroResolucion',
      component: ReintegroResolucion,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/reintegroCobro',
      name: 'reintegroCobro',
      component: ReintegroCobro,
      meta: {
        ADMINISTRADOR: true,
        USUARIO:true
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios,
      meta: {
        ADMINISTRADOR: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        libre: true
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{

  if (to.matched.some(record => record.meta.libre)) {
    next()
  } else if (store.state.usuario && store.state.usuario.rol=='ADMINISTRADOR' ){
    if (to.matched.some(record=> record.meta.ADMINISTRADOR)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol=='USUARIO' ){
    if (to.matched.some(record=> record.meta.USUARIO)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol=='LECTOR' ){
    if (to.matched.some(record=> record.meta.LECTOR)) {
      next()
    }
  } else {
    next({name:'login'})
  }

})




export default router
