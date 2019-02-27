<template>
  <v-container>
    <v-layout align-start justify-center row pa-3 mb-2>
      <v-flex xs12 text-xs-center>
        <h1>Programa para la gestión de subvenciones para Centros Guadalinfos</h1>
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
export default {
  
  data() {
    return {
      convocatorias: this.$store.getters.getConvocatorias,
      select: ""
    };
  },
  methods: {
    cambiarEjercicioTrabajo() {
      
      this.$store.dispatch('cambiarConvocatoriaTrabajoAsync',this.select);
    }
  }
};
</script>

