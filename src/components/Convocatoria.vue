<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-icon color="blue">account_balance</v-icon>
        <v-toolbar-title class="primary--text">Convocatorias</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="palabraBusqueda" 
          append-icon="search" 
          label="Búsqueda" single-line hide-details>
        </v-text-field>

        <v-spacer></v-spacer>

        <!-- Ventana Emergente Modificar-->

        <v-dialog v-model="dialogModificar" max-width="80%">
          <!-- <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2 blue" v-on="on" icon >
                <v-icon>add</v-icon>
                     
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="headline blue--text">Modificar Convocatoria</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field disabled v-model="idConvocatoria" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      name="Nombre"
                      box
                      label="Nombre Convocatoria"
                      auto-grow
                      autofocus
                      v-model="nombreConvocatoria"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs2>
                    <v-select
                      v-model="yearConvocatoria"
                      :items="years"
                      :label="yearConvocatoria"
                      single-line
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-select
                      v-model="orden"
                      :items="ordenes"
                      item-text="aliasOrden"
                      item-value="idOrden"
                      :label="aliasOrden"
                      single-line
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaInicio" label="Fecha Inicio"
                    :value="fechaInicio"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaFin" label="Fecha Fin"
                    :value="fechaFin"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    
                    <v-text-field 
                      type="number"
                      v-model="importeAyuntamientoA" 
                      label="Importe Ayuntamientos A"
                      
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="number" 
                      v-model="importeAyuntamientoB" 
                      label="Importe Ayuntamientos B"
                      
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="number" 
                      v-model="importeAyuntamientoC" 
                      label="Importe Ayuntamientos C"
                      
                    ></v-text-field>          
                    
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELAA" 
                      label="Importe ELA A"
                      
                    ></v-text-field>          
                    
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELAB" 
                      label="Importe ELA B"
                     ></v-text-field>          
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field type="date" v-model="fechaJustificacion" :label="fechaJustificacion"
                    :value="fechaJustificacion"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="text" 
                      v-model="subag" 
                      label="SUBAG"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="text" 
                      v-model="subco" 
                      label="SUBCO"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeGuadalinfoCorriente" 
                      label="Importe Guadalinfo corriente"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeGuadalinfoFuturo" 
                      label="Importe Guadalinfo futuro"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELACorriente" 
                      label="Importe ELA corriente"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELAFuturo" 
                      label="Importe ELA futuro"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="text" 
                      v-model="aplicacionPresupuestariaCorriente" 
                      label="Aplicación Presupuestaria corriente"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="text" 
                      v-model="aplicacionPresupuestariaFutura" 
                      label="Aplicación Presupuestaria futura"
                     ></v-text-field>          
                  </v-flex>
                  

                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="numeroDiasYear" 
                      label="Días en el año 365/366"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6></v-flex>
                  

                  <v-flex xs12 v-if="valida">
                    <div class="red--text" v-for="item in validaMensaje">{{item}}</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">
                <v-icon large>cancel</v-icon>
              </v-btn>
              <v-btn v-if="esAdministrador || esUsuario" color="blue darken-1" flat @click="modificar">
                <v-icon large>save</v-icon>
              </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
   
        <!-- Ventana Emergente Crear-->

        <template v-if="esAdministrador || esUsuario">
        <v-dialog v-model="dialogCrear" max-width="80%">
          <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2 blue" v-on="on" icon >
                <v-icon>add</v-icon>
                     
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline blue--text">Alta nueva Convocatoria</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-textarea
                      name="Nombre"
                      box
                      label="Nombre Convocatoria"
                      auto-grow
                      autofocus
                      v-model="nombreConvocatoria"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs2>
                    <v-select
                      v-model="yearConvocatoria"
                      :items="years"
                      label="Año de Convocatoria"
                      single-line
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-select
                      v-model="orden"
                      :items="ordenes"
                      item-text="aliasOrden"
                      item-value="idOrden"
                      label="Orden"
                      single-line
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaInicio" label="Fecha Inicio"
                    :value="fechaInicio"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaFin" label="Fecha Fin"
                    :value="fechaFin"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    
                    <v-text-field 
                      type="number"
                      v-model="importeAyuntamientoA" 
                      label="Importe Ayuntamientos A"
                      
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="number" 
                      v-model="importeAyuntamientoB" 
                      label="Importe Ayuntamientos B"
                      
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="number" 
                      v-model="importeAyuntamientoC" 
                      label="Importe Ayuntamientos C"
                      
                    ></v-text-field>          
                    
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELAA" 
                      label="Importe ELA A"
                      
                    ></v-text-field>          
                    
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELAB" 
                      label="Importe ELA B"
                     ></v-text-field>          
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field type="date" v-model="fechaJustificacion" label="Fecha Justificación"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="text" 
                      v-model="subag" 
                      label="SUBAG"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field 
                      type="text" 
                      v-model="subco" 
                      label="SUBCO"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeGuadalinfoCorriente" 
                      label="Importe Guadalinfo corriente"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeGuadalinfoFuturo" 
                      label="Importe Guadalinfo futuro"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELACorriente" 
                      label="Importe ELA corriente"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="importeELAFuturo" 
                      label="Importe ELA futuro"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="text" 
                      v-model="aplicacionPresupuestariaCorriente" 
                      label="Aplicación Presupuestaria corriente"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field 
                      type="text" 
                      v-model="aplicacionPresupuestariaFutura" 
                      label="Aplicación Presupuestaria futura"
                     ></v-text-field>          
                  </v-flex>
                  

                  <v-flex xs6>
                    <v-text-field 
                      type="number" 
                      v-model="numeroDiasYear" 
                      label="Días en el año 365/366"
                     ></v-text-field>          
                  </v-flex>
                  <v-flex xs6></v-flex>

                  <v-flex xs12 v-if="valida">
                    <div class="red--text" v-for="item in validaMensaje">{{item}}</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">
                <v-icon large>cancel</v-icon>
              </v-btn>
              <v-btn color="blue darken-1" flat @click="crear">
                <v-icon large>save</v-icon>
              </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        
        
        
        
        
        
        <!-- Ventana Emergente Borrar-->

        <v-dialog v-model="dialogBorrar" max-width="80%">
          
          <v-card>
            <v-card-title>
              
              <span class="headline red--text">¿Seguro que quiere borrar el siguiente registro?</span>
            </v-card-title>
             

            <v-card-text>
              <v-container grid-list-md>
                

                <v-layout wrap>

                  <v-flex xs12>
                    <v-text-field disabled v-model="idConvocatoria" label="Id"></v-text-field>
                  </v-flex>
                  
                  <v-flex xs12>
                    <v-text-field disabled v-model="nombreConvocatoria" label="Nombre Convocatoria"></v-text-field>
                  </v-flex>
                  
                  <v-flex xs2>
                    <v-text-field disabled v-model="yearConvocatoria" label="Año"></v-text-field>
                  </v-flex>
                  
                  <v-flex xs4>
                    <v-text-field disabled v-model="aliasOrden" label="Orden"></v-text-field>
                  </v-flex>
                  
                  <v-flex xs3>
                    <v-text-field disabled v-model="fechaInicio" label="Fecha Inicio"></v-text-field>
                  </v-flex>
                  
                  <v-flex xs3>
                    <v-text-field disabled v-model="fechaFin" label="Fecha Fin"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled v-model="importeAyuntamientoA" label="Importe Ayuntamiento A"></v-text-field>
                   
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled v-model="importeAyuntamientoB" label="Importe Ayuntamiento B"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled v-model="importeAyuntamientoC" label="Importe Ayuntamiento C"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="importeELAA" label="Importe ELA A"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="importeELAB" label="Importe ELA B"></v-text-field>        
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field disabled v-model="fechaJustificacion" label="Fecha Justificación"></v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field disabled v-model="subag" label="SUBAG"></v-text-field>         
                  </v-flex>
                  
                  <v-flex xs4>
                    <v-text-field disabled v-model="subco" label="SUBCO"></v-text-field>          
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field disabled v-model="importeGuadalinfoCorriente" label="Importe Guadalinfo Corriente"></v-text-field>         
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field disabled v-model="importeGuadalinfoFuturo" label="Importe Guadalinfo Futuro"></v-text-field>         
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field disabled v-model="importeELACorriente" label="Importe ELA Corriente"></v-text-field>         
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="importeELAFuturo" label="Importe ELA Futuro"></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="aplicacionPresupuestariaCorriente" label="Aplicación corriente"></v-text-field>          
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="aplicacionPresupuestariaFutura" label="Aplicación Futura"></v-text-field>         
                  </v-flex>
                  
                  <v-flex xs6>
                    <v-text-field disabled v-model="numeroDiasYear" label="Número de días en el Año"></v-text-field>          
                  </v-flex>
                  <v-flex xs6></v-flex>
                  
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">
                <v-icon large>cancel</v-icon>
              </v-btn>
              <v-btn color="red darken-1" flat @click="borrar(idConvocatoria)">
                <v-icon large>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </template>
        
      </v-toolbar>

      <v-layout v-if="cargando">
        <v-flex class="text-xs-center">
          <img src="../assets/Cargando2.gif" alt="Cargando..." width="100px" height="auto" >
        </v-flex>

      </v-layout>

      <!-- Tabla Principal de la página -->

      <v-data-table 
          :headers="headers" 
          :items="convocatorias" 
          class="elevation-1" 
          :search="palabraBusqueda">

        <template v-slot:items="props">
          
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2 blue--text" @click="editItem(props.item)">edit</v-icon>
              <v-icon v-if="esAdministrador || esUsuario" small class="red--text" @click="deleteItem(props.item)">delete</v-icon>
            </td>
            <td class="text-xs-center">{{ props.item.yearConvocatoria }}</td>
            <td class="text-xs-center align-start">{{ props.item.idConvocatoria }}</td>
            
            <td class="text-xs-left" >{{ props.item.nombreConvocatoria }}</td>
            <td class="text-xs-left" >{{ props.item.subco }}</td>
          
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="limpiar">Limpiar</v-btn>
        </template>
      </v-data-table>

    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)



export default {

    
    data() {
        return {
            orden: null,
            years: [],
            year: new Date().getFullYear().toString(),
            cargando: 0,
            valida: 0,
            validaMensaje: [],

            idConvocatoria: null,
            nombreConvocatoria: '',
            yearConvocatoria: '',
            idOrden: null,
            nombreOrden: '',
            aliasOrden: '',
            fechaInicio: '',
            fechaFin: '',
            importeAyuntamientoA: 0,
            importeAyuntamientoB: 0,
            importeAyuntamientoC: 0,
            importeELAA: 0,
            importeELAB: 0,
            fechaJustificacion: '',
            subag:'',
            subco:'',
            importeGuadalinfoCorriente:0,
            importeGuadalinfoFuturo:0,
            importeELACorriente:0,
            importeELAFuturo:0,
           
            numeroDiasYear:0,
            aplicacionPresupuestariaCorriente:'',
            aplicacionPresupuestariaFutura:'',
            
            convocatorias: null,
            ordenes: null,

            dialogModificar: false,
            dialogCrear: false,
            dialogBorrar:false,

            headers: [
              { text: 'Opciones', value: 'opciones', sortable: false, class: 'primary--text' },
              { text: 'Año', align: 'center', sortable: true, value: 'yearConvocatoria', class: 'primary--text' },
              { text: 'id', align: 'center', sortable: true, value: 'idConvocatoria', class: 'primary--text' },
              
              { text: 'Orden', align: 'left', sortable: true, value: 'nombreConvocatoria', class: 'primary--text' },
              { text: 'SUBCO', align: 'left', sortable: true, value: 'subco', class: 'primary--text' },
              ],
            palabraBusqueda:'',
            objeto: null,
            token: null,
            header: null,
            configuration: null,
            
            
        }
    },
    
    watch: {
        dialog (val) {
        val || this.close()
        }
    },

    

    created () {
        
        this.convocatorias= this.$store.getters.getConvocatorias;
        this.ordenes = this.$store.getters.getOrdenes;
        let initialYear = new Date().getFullYear();
        for (let index = -10; index < 10; index++) {
          this.years.push((initialYear+index).toString());
          
        }
    },
    mounted() {
      this.token = this.$store.state.token;
        this.header = {"Authorization" : "Bearer "+this.token};
        this.configuration = {headers : this.header};
      this.convocatorias= this.$store.getters.getConvocatorias;
        this.ordenes = this.$store.getters.getOrdenes;
        let initialYear = new Date().getFullYear();
        for (let index = -10; index < 10; index++) {
          this.years.push((initialYear+index).toString());
          
        }
    },
    computed: {
      solicitudesConvocatoria: function() {
        let solicitudesAListar = this.solicitudes.filter(
          (item) => item.idConvocatoria === this.idConvocatoriaTrabajo
        );
        return solicitudesAListar;
      },
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
    
    methods: {

        cambioCarga() {
          this.cargando=0;
        },
        

        listar() {
          let me = this;
          this.cargando=1;
          axios.get('/api/convocatoria_listar').then(function(response){
            me.convocatorias = response.data;
            me.$store.dispatch('setConvocatoriasAsync',me.convocatorias);
            console.log("Acabo de actualizar los datos de convocatorias desde BBDD...");
          }).catch(function(error){
            console.log("Trabajaré con las convocatorias harcodeadas por defecto...");
           console.log("Error: "+error);
          });
          this.convocatorias= this.$store.getters.getConvocatorias;
          setTimeout(this.cambioCarga,1000);
        },


        editItem(item) {
            this.dialogModificar = true;

            this.idConvocatoria=item.idConvocatoria;
            this.nombreConvocatoria=item.nombreConvocatoria;
            this.yearConvocatoria=item.yearConvocatoria;
            this.idOrden=item.idOrden;
            this.nombreOrden=item.nombreOrden;
            this.aliasOrden=item.aliasOrden;
            this.fechaInicio=item.fechaInicio;
            this.fechaFin=item.fechaFin;
            this.importeAyuntamientoA=item.importeAyuntamientoA;
            this.importeAyuntamientoB=item.importeAyuntamientoB;
            this.importeAyuntamientoC=item.importeAyuntamientoA;
            this.importeELAA=item.importeELAA;
            this.importeELAB=item.importeELAB;
            this.fechaJustificacion=item.fechaJustificacion;
            this.subag=item.subag;
            this.subco=item.subco;
            this.importeGuadalinfoCorriente=item.importeGuadalinfoCorriente;
            this.importeGuadalinfoFuturo=item.importeGuadalinfoFuturo;
            this.importeELACorriente=item.importeELACorriente;
            this.importeELAFuturo=item.importeELAFuturo;
            this.aplicacionPresupuestariaCorriente=item.aplicacionPresupuestariaCorriente,
            this.aplicacionPresupuestariaFutura=item.aplicacionPresupuestariaFutura,
            
            this.numeroDiasYear=item.numeroDiasYear
            
            
        },
        validar() {
          this.valida=0;
          this.validaMensaje=[];
          if (this.nombreConvocatoria.length<3 || this.nombreConvocatoria.length>355) {
            this.validaMensaje.push("El nombre debe tener mas de 3 caracteres y menos de 355");
            this.valida=1;
            
          }

          if (this.idOrden == null) {
            this.validaMensaje.push("La orden no puede estar vacía");
            this.valida=1;
            
          }
          return this.valida;
          
        },

        deleteItem(item) {
            
            this.dialogBorrar = true;

            this.idConvocatoria=item.idConvocatoria;
            this.nombreConvocatoria=item.nombreConvocatoria;
            this.yearConvocatoria=item.yearConvocatoria;
            this.idOrden=item.idOrden;
            this.nombreOrden=item.nombreOrden;
            this.aliasOrden=item.aliasOrden;
            this.fechaInicio=item.fechaInicio;
            this.fechaFin=item.fechaFin;
            this.importeAyuntamientoA=item.importeAyuntamientoA;
            this.importeAyuntamientoB=item.importeAyuntamientoB;
            this.importeAyuntamientoC=item.importeAyuntamientoA;
            this.importeELAA=item.importeELAA;
            this.importeELAB=item.importeELAB;
            this.fechaJustificacion=item.fechaJustificacion;
            this.subag=item.subag;
            this.subco=item.subco;
            this.importeGuadalinfoCorriente=item.importeGuadalinfoCorriente;
            this.importeGuadalinfoFuturo=item.importeGuadalinfoFuturo;
            this.importeELACorriente=item.importeELACorriente;
            this.importeELAFuturo=item.importeELAFuturo;
            this.aplicacionPresupuestariaCorriente=item.aplicacionPresupuestariaCorriente,
            this.aplicacionPresupuestariaFutura=item.aplicacionPresupuestariaFutura,
            
            this.numeroDiasYear=item.numeroDiasYear
        },

        close() {
            this.dialogCrear = false;
            this.dialogModificar = false;
            this.dialogBorrar = false;
            this.limpiar();
            
            
            
        },

        limpiar() {
            this.idConvocatoria=null;
            this.nombreConvocatoria='';
            this.yearConvocatoria= this.year;
            this.idOrden=null;
            this.nombreOrden='';
            this.aliasOrden='';
            this.fechaInicio='';
            this.fechaFin='';
            this.importeAyuntamientoA=0;
            this.importeAyuntamientoB=0;
            this.importeAyuntamientoC=0;
            this.importeELAA=0;
            this.importeELAB=0;
            this.fechaJustificacion='';
            this.subag='';
            this.subco='';
            this.importeGuadalinfoCorriente=0;
            this.importeGuadalinfoFuturo=0;
            this.importeELACorriente=0;
            this.importeELAFuturo=0;
            
            this.numeroDiasYear=0;
            this.orden=null;
           
            this.palabraBusqueda='';
        },

        modificar () {
            
            if (this.validar()) {
              
              return;
            }
     
            // Código para editar
            let me = this;
            this.cargando=1;
               
            axios.put('/api/convocatoria',{
              'idConvocatoria': me.idConvocatoria,
              'nombreConvocatoria': me.nombreConvocatoria,
              'yearConvocatoria' : me.yearConvocatoria,
              'idOrden': me.idOrden,
              'nombreOrden': me.nombreOrden,
              'aliasOrden': me.aliasOrden,
              'fechaInicio': me.fechaInicio,
              'fechaFin': me.fechaFin,
              'importeAyuntamientoA': me.importeAyuntamientoA,
              'importeAyuntamientoB': me.importeAyuntamientoB,
              'importeAyuntamientoC': me.importeAyuntamientoC,
              'importeELAA': me.importeELAA,
              'importeELAB': me.importeELAB,
              'fechaJustificacion': me.fechaJustificacion,
              'subag': me.subag,
              'subco': me.subco,
              'importeGuadalinfoCorriente': me.importeGuadalinfoCorriente,
              'importeGuadalinfoFuturo': me.importeGuadalinfoFuturo,
              'importeELACorriente': me.importeELACorriente,
              'importeELAFuturo': me.importeELAFuturo,
              
              'numeroDiasYear': me.numeroDiasYear,
              'aplicacionPresupuestariaCorriente': me.aplicacionPresupuestariaCorriente,
              'aplicacionPresupuestariaFutura': me.aplicacionPresupuestariaFutura,
              
                  
                }).then(function(response){
                  me.close();
                  me.listar();
                  
                }).catch(function(error){
                  
                  me.close();
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);
                this.close();
        },

        crear () {

          
          this.idOrden = this.orden.idOrden;
          if (this.validar()) {
              
              return;
            }

          //Código para crear
                let me = this;
                this.cargando=1;
                

                axios.post('/api/convocatoria',{
              
              'nombreConvocatoria': me.nombreConvocatoria,
              'yearConvocatoria' : me.yearConvocatoria,
              'idOrden': me.idOrden,
              'nombreOrden': me.nombreOrden,
              'aliasOrden': me.aliasOrden,
              'fechaInicio': me.fechaInicio,
              'fechaFin': me.fechaFin,
              'importeAyuntamientoA': me.importeAyuntamientoA,
              'importeAyuntamientoB': me.importeAyuntamientoB,
              'importeAyuntamientoC': me.importeAyuntamientoC,
              'importeELAA': me.importeELAA,
              'importeELAB': me.importeELAB,
              'fechaJustificacion': me.fechaJustificacion,
              'subag': me.subag,
              'subco': me.subco,
              'importeGuadalinfoCorriente': me.importeGuadalinfoCorriente,
              'importeGuadalinfoFuturo': me.importeGuadalinfoFuturo,
              'importeELACorriente': me.importeELACorriente,
              'importeELAFuturo': me.importeELAFuturo,
              
              'numeroDiasYear': me.numeroDiasYear,
              'aplicacionPresupuestariaCorriente': me.aplicacionPresupuestariaCorriente,
              'aplicacionPresupuestariaFutura': me.aplicacionPresupuestariaFutura,
              
                  
                }).then(function(response){
                  me.close();
                  me.limpiar();
                  me.listar();
                }).catch(function(error){
                  
                  me.close();
                  me.limpiar();
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);
                this.close();
        },

        borrar(id) {
          this.close();
          let me = this;
                this.cargando=1;
                axios.delete('/api/convocatoria/'+id).then(function(response){
                  me.close();
                  
                  me.listar();
                  
                }).catch(function(error){
                  
                  me.close();
                  
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);
          
          
        }
  

    }
}
</script>


