<template>
  
    <v-app id="inspire">
      <v-navigation-drawer 
        fixed 
        :clipped="$vuetify.breakpoint.mdAndUp" 
        app 
        v-model="drawer"
        v-if="logueado">

        <v-list dense>
          <template v-if="esAdministrador || esUsuario || esLector">
            <v-list-tile :to="{name: 'home'}">
              <v-list-tile-action>
                <v-icon color="primary darken-3">home</v-icon>
              </v-list-tile-action>
               <v-list-tile-title>
                  Inicio
               </v-list-tile-title>
              
            </v-list-tile>  
          </template>

          <!--Concesión-->
          <template v-if="esAdministrador || esUsuario">
            <v-list-group>
              <v-list-tile color="primary" slot="activator">
                <v-list-tile-action>
                  <v-icon color="primary darken-3">description</v-icon>
                </v-list-tile-action>
                
                <v-list-tile-content>
                  <v-list-tile-title >
                    Concesión  
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!--ConcesionSolicitudes-->
              <v-list-tile color="text-body" :to="{name: 'concesionSolicitudes'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Solicitudes
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--ConcesionComunicacion-->
              <v-list-tile color="text-body" :to="{name: 'concesionComunicacion'}">
                <v-list-tile-action>
                  <v-icon>email</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Comunicación
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--ConcesionRequerimiento-->
              <v-list-tile color="text-body" :to="{name: 'concesionRequerimiento'}">
                <v-list-tile-action>
                  <v-icon>mail</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Requerimiento
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--PropuestaConcesion-->
              <v-list-tile  color="text-body" :to="{name: 'concesionPropuesta'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Propuesta
                 </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!--ConcesionResolución-->
              <v-list-tile color="text-body" :to="{name: 'concesionResolucion'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Resolución
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--Primer Pago-->
              <v-list-tile :to="{name: 'concesionPrimerPago'}">
                <v-list-tile-action>
                  <v-icon>euro_symbol</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Primer pago
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>


            </v-list-group>
          </template>

          <!--Liquidación-->
          <template  v-if="esAdministrador || esUsuario">

            
            <v-list-group>
              <v-list-tile color="primary" slot="activator">
                <v-list-tile-action>
                  <v-icon color="primary darken-3">monetization_on</v-icon>
                </v-list-tile-action>
                
                <v-list-tile-content>
                  <v-list-tile-title >
                    Liquidación  
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              
              <!--Requerimiento de Justificación-->
              <v-list-tile :to="{name: 'liquidacionRequerimiento'}">
                <v-list-tile-action>
                  <v-icon>mail</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Requerimiento Justificación
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--Propuesta de Liquidación y Notificación-->
              <v-list-tile :to="{name: 'liquidacionPropuesta'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Propuesta Liquidación
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--Resolución de Liquidación y Notificación-->
              <v-list-tile :to="{name: 'liquidacionResolucion'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Resolución Liquidación
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--Certificados de Justificación-->
              <v-list-tile :to="{name: 'liquidacionJustificacion'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Certificados de Justificación
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!--Segundo Pago-->
              <v-list-tile :to="{name: 'liquidacionSegundoPago'}">
                <v-list-tile-action>
                  <v-icon>attach_money</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Segundo Pago
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>              
              
            </v-list-group>
          </template>

          <!--Reintegros-->
          <template  v-if="esAdministrador || esUsuario">
            <v-list-group>
              <v-list-tile color="primary" slot="activator">
                <v-list-tile-action>
                  <v-icon color="primary darken-3">pan_tool</v-icon>
                </v-list-tile-action>
                
                <v-list-tile-content>
                  <v-list-tile-title >
                    Reintegros  
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!-- AIR -->
              <v-list-tile :to="{name: 'reintegroAcuerdoInicio'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Acuerdo Inicio Reintegro
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              <!-- Propuesta Reintegro -->
              <v-list-tile :to="{name: 'reintegroResolucion'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Resolución Reintegro
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>

              
              <!-- Cobro Reintegro -->
              <v-list-tile :to="{name: 'reintegroCobro'}">
                <v-list-tile-action>
                  <v-icon>attach_money</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Cobro del Reintegro
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              
            </v-list-group>
          </template>

          <!--Tablas-->
          <template  v-if="esAdministrador || esUsuario || esLector">
            <v-list-group>
              <v-list-tile color="primary" slot="activator">
                <v-list-tile-action>
                  <v-icon color="primary darken-3">table_chart</v-icon>
                </v-list-tile-action>
                
                <v-list-tile-content>
                  <v-list-tile-title >
                    Tablas  
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: 'ordenes'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Órdenes
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: 'convocatorias'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Convocatorias
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: 'entidades'}">
                <v-list-tile-action>
                  <v-icon>account_balance</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                    Entidades  
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: 'solicitudes'}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Solicitudes
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: 'usuarios'}"  v-if="esAdministrador">
                <v-list-tile-action>
                  <v-icon>person</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Usuarios
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template>

          
          <!--Créditos-->
          <template  v-if="esAdministrador || esUsuario || esLector">
            <v-list-tile color="primary" :to="{name: 'about'}">
              <v-list-tile-action>
                <v-icon color="primary darken-3">group</v-icon>
              </v-list-tile-action>
               <v-list-tile-title>
                  Créditos
               </v-list-tile-title>
              
            </v-list-tile>  
          </template>

        </v-list>
      </v-navigation-drawer>


      <v-toolbar color="primary" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-avatar size="55px" tile>
            <img src="@/assets/logo_guadalinfo2.png" alt="logo">
          </v-avatar>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">Guadalinfos</span>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-btn @click="salir" icon v-if="logueado">
          <v-icon class="mr-1" >logout</v-icon>Salir
        </v-btn>
         <v-btn :to="{name: 'login'}" icon v-else>
          <v-icon class="mr-1">apps</v-icon>
        </v-btn>
        
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-footer primary height="100%" class="pt-2">
        <v-layout justify-center>
          <v-flex text-xs-center>
            <v-card flat tile color="primary" class="white--text">
              <v-card-text class="white--text pt-2">
                Trabajo Fin de Grado Universidad de Córdoba
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    logueado() {
      return this.$store.getters.getUsuario;
    },
    esAdministrador() {
      return this.$store.getters.getUsuario && 
              this.$store.state.usuario.rol == 'ADMINISTRADOR';
    },
    esUsuario() {
      return this.$store.getters.getUsuario && 
              this.$store.state.usuario.rol == 'USUARIO';
    },
    esLector() {
      return this.$store.getters.getUsuario && 
              this.$store.state.usuario.rol == 'LECTOR';
    }
  },
  created() {
     this.$store.dispatch("autologin");
  },

  methods: {
    salir() {
      this.$store.dispatch("salir");
    }
    
  }
  

  }

</script>
