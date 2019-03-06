<template>
  
    <v-app id="inspire">
      <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
        <v-list dense>
          <template>
            <v-list-tile :to="{name: 'home'}">
              <v-list-tile-action>
                <v-icon color="primary darken-3">home</v-icon>
              </v-list-tile-action>
               <v-list-tile-title>
                  Inicio
               </v-list-tile-title>
              
            </v-list-tile>  
          </template>
          <template>
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
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Solicitudes
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>email</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Comunicación
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>mail</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Requerimiento
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Propuesta
                 </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Resolución
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template>
          <template>
            <v-list-group>
              <v-list-tile color="primary" slot="activator">
                <v-list-tile-action>
                  <v-icon color="primary darken-3">monetization_on</v-icon>
                </v-list-tile-action>
                
                <v-list-tile-content>
                  <v-list-tile-title >
                    Pagos  
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>euro_symbol</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Primer pago
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>euro_symbol</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Segundo pago
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              
            </v-list-group>
          </template>
          <template>
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
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Acuerdo Inicio
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Propuesta
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Alegaciones
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Resolución
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              
            </v-list-group>
          </template>
          <template>
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
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Órdenes
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
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
                  <v-icon class="primary--text">account_balance</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title class="primary--text">
                    Entidades  
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Solicitudes
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              
            </v-list-group>
          </template>
          <template>
            <v-list-group>
              <v-list-tile color="primary" slot="activator">
                <v-list-tile-action>
                  <v-icon color="primary darken-3">perm_identity</v-icon>
                </v-list-tile-action>
                
                <v-list-tile-content>
                  <v-list-tile-title >
                    Accesos  
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>group</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Usuarios
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{name: ''}">
                <v-list-tile-action>
                  <v-icon>people_outline</v-icon>
                </v-list-tile-action>
               <v-list-tile-content>
                 <v-list-tile-title>
                   Roles
                 </v-list-tile-title>
               </v-list-tile-content>
              </v-list-tile>
              
              
            </v-list-group>
          </template>
          <template>
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
        <v-btn icon>
          <v-icon>apps</v-icon>
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
    };
  }
};
</script>
