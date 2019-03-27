<template>
  <v-container>
    <v-layout align-start justify-center row pa-3 mb-2>
      <v-flex xs12 text-xs-center>
        <h1 class="display-2 font-weight-bold">Programa para la gestión de subvenciones para Centros Guadalinfos</h1>
      </v-flex>
    </v-layout>
  <v-layout v-show="cargando">
    <v-flex class="text-xs-center">
        
          <!-- <v-progress-circular

            :size= 120
            indeterminate
            color="primary">
              Cargando...
          </v-progress-circular>
          -->

          <img src="../assets/Cargando2.gif" alt="Cargando..." width="100px" height="auto" >
        
      </v-flex>
  </v-layout>
    <v-layout align-start row justify-space-between pa-3 mb-2>
      
      <v-flex xs3>
        <img src="../assets/uco_logo.png" alt="uco logo" width="200px" height="110px">
      </v-flex>
      <v-flex xs3>
        <img src="../assets/logo-junta.png" alt="logo junta" width="200px" height="110px">
      </v-flex>
      <v-flex xs3>
        <img src="../assets/logo_politecnica.png" alt="logo politecnica" width="200px" height="110px">
      </v-flex>
    </v-layout>
    <v-layout pa-3 mb-2>
      <v-flex xs12>
        <p
          class="text-xs-justify"
        >Este programa trata de ayudar a la gestión de los centros de acceso público a internet de Andalucía, gestionados por los municipios de menos de 20.000 habitantes y financiados anualmente con fondos de la Comunidad Autónoma de Andalucía y las respectivas Diputaciones Provinciales,</p>
        <p>A continuación debes seleccionar el año de la convocatoria con el que vas a trabajar:</p>
        <v-select
            v-model="select"
            :items="convocatorias"
            item-text="yearConvocatoria"
            item-value="idConvocatoria"
            label="Convocatoria de Trabajo"
            solo
            v-on:change="cambiarEjercicioTrabajo"
          ></v-select>
        
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  
  data() {
    return {
      cargando: 1,
      convocatorias: null,
      select: "",
      entidades: null,
      ordenes: null,
      solicitudes: null
      
    }
  },
  methods: {

    cambioCarga() {
      this.cargando=0;
    },
    
    cambiarEjercicioTrabajo() {
      //console.log("Voy a cambiar el ejercicio de trabajo por: "+this.select);
      //console.log("Es del tipo: "+typeof(this.select));
      this.$store.dispatch('cambiarConvocatoriaTrabajoAsync',this.select);
      this.solicitudes = this.$store.getters.getSolicitudes;
    },

    cargarEntidades() {
      let me = this;
     
      axios.get('/api/entidades_listar').then(function(response){
        me.entidades = response.data;
        me.$store.dispatch('setEntidadesAsync',me.entidades);
        //console.log("Acabo de actualizar los datos de entidades desde BBDD...");
      }).catch(function(error){
        console.log("Trabajaré con las entidades harcodeadas por defecto...");
        console.log("Error: "+error);
        
      });
      
    },
    cargarOrdenes() {
      let me = this;
      
      axios.get('/api/ordenes_listar').then(function(response){
        me.ordenes = response.data;
        me.$store.dispatch('setOrdenesAsync',me.ordenes);
        //console.log("Acabo de actualizar los datos de Ordenes desde BBDD...");
      }).catch(function(error){
        console.log("Trabajaré con las órdenes harcodeadas por defecto...");
        console.log("Error: "+error);
        
      });
    
    },
    cargarConvocatorias() {
      let me = this;
      
      axios.get('/api/convocatorias_listar').then(function(response){
        me.convocatorias = response.data;
        me.$store.dispatch('setConvocatoriasAsync',me.convocatorias);
        //console.log("Acabo de actualizar los datos de convocatorias desde BBDD...");
      }).catch(function(error){
        console.log("Trabajaré con las convocatorias harcodeadas por defecto...");
        console.log("Error: "+error);
        
      });

      
    },

    cargarSolicitudes() {
      let me = this;
      
      axios.get('/api/solicitud_listar').then(function(response){
        me.solicitudes = response.data;
        me.$store.dispatch('setSolicitudesAsync',me.solicitudes);
        //console.log("Acabo de actualizar los datos de solicitudes desde BBDD...");
      }).catch(function(error){
        console.log("Trabajaré con las solicitudes harcodeadas por defecto...");
        console.log("Error: "+error);
        
      });

      
    }
    
  },

  mounted() {
      
      this.cargarEntidades();
      this.cargarOrdenes();
      this.cargarConvocatorias();
      this.cargarSolicitudes();
      setTimeout(this.cambioCarga,1000);
    }
};
</script>

