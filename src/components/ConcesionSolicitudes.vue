<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        
          
            <v-icon color="blue">account_balance</v-icon>
            <v-toolbar-title class="primary--text">Solicitudes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-flex xs1>
              <v-select 
            v-model="select"
            :items="convocatorias"
            item-text="yearConvocatoria"
            item-value="idConvocatoria"
            label="Convocatoria"
            single-line
            v-on:change="cambiarEjercicioTrabajo"
            
          ></v-select>

          
            </v-flex>
            
          
          
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
              <span class="headline blue--text">Modificar Solicitud</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field disabled v-model="idSolicitud" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-select
                      v-model="convocatoria"
                      :items="convocatorias"
                      item-text="yearConvocatoria"
                      item-value="idConvocatoria"
                      :label="yearConvocatoria"
                      single-line
                      return-object
                      v-on:change="cambiarConvocatoriaTrabajo"
                    ></v-select>
                  </v-flex>
                  <v-flex xs8>
                    <v-select
                      v-model="entidad"
                      :items="entidades"
                      item-text="nombreEntidad"
                      item-value="idEntidad"
                      :label="nombreEntidad"
                      single-line
                      return-object
                      v-on:change="cambiarEntidadTrabajo"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="date" v-model="fechaEntrada" label="Fecha Entrada"
                    :value="fechaEntrada"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="expediente" label="Expediente"
                    :value="expediente"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="subcc" label="subcc"
                    :value="subcc"></v-text-field>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="costePersonal" 
                      label="Coste de Personal"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="costeDietas" 
                      label="Coste de Dietas"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="subvencionPersonal" 
                      label="Subvención Personal"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="subvencionDietas" 
                      label="Subvención Dietas"
                    > </v-text-field>
                  </v-flex>

                                    

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
        
        <v-dialog v-model="dialogCrear" max-width="80%">
          <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2 blue" v-on="on" icon >
                <v-icon>add</v-icon>
                     
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline blue--text">Alta Nueva Solicitud</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs4>
                    <v-select
                      v-model="convocatoria"
                      :items="convocatorias"
                      item-text="yearConvocatoria"
                      item-value="idConvocatoria"
                      label="Convocatoria"
                      autofocus
                      single-line
                      return-object
                      v-on:change="cambiarConvocatoriaTrabajo"
                    ></v-select>
                  </v-flex>
                  <v-flex xs8>
                    <v-select
                      v-model="entidad"
                      :items="entidades"
                      item-text="nombreEntidad"
                      item-value="idEntidad"
                      label="Nombre Entidad"
                      single-line
                      return-object
                      v-on:change="cambiarEntidadTrabajo"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="date" v-model="fechaEntrada" label="Fecha Entrada"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="expediente" label="Expediente"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="subcc" label="subcc"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="costePersonal" 
                      label="Coste de Personal"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="costeDietas" 
                      label="Coste de Dietas"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="subvencionPersonal" 
                      label="Subvención Personal"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field 
                      type="number"
                      v-model="subvencionDietas" 
                      label="Subvención Dietas"
                    > </v-text-field>
                  </v-flex>

                  
                  

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
                    <v-text-field disabled v-model="idSolicitud" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled v-model="yearConvocatoria" label="Convocatoria"></v-text-field>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field disabled v-model="nombreEntidad" label="Entidad"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled type="date" v-model="fechaEntrada" label="Fecha Entrada">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled type="text" v-model="expediente" label="Expediente"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field disabled type="text" v-model="subcc" label="subcc"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field disabled
                      type="number"
                      v-model="costePersonal" 
                      label="Coste de Personal"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field disabled
                      type="number"
                      v-model="costeDietas" 
                      label="Coste de Dietas"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field disabled
                      type="number"
                      v-model="subvencionPersonal" 
                      label="Subvención Personal"
                    > </v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field disabled
                      type="number"
                      v-model="subvencionDietas" 
                      label="Subvención Dietas"
                    > </v-text-field>
                  </v-flex>

                  
                  
                  
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">
                <v-icon large>cancel</v-icon>
              </v-btn>
              <v-btn color="red darken-1" flat @click="borrar(idSolicitud)">
                <v-icon large>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        
      </v-toolbar>

      <v-layout v-if="cargando">
        <v-flex class="text-xs-center">
          <img src="../assets/Cargando2.gif" alt="Cargando..." width="100px" height="auto" >
        </v-flex>

      </v-layout>

      <!-- Tabla Principal de la página -->

      <v-data-table 
          :headers="headers" 
          :items="solicitudesConvocatoria" 
          class="elevation-1" 
          :search="palabraBusqueda"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          >

        <template v-slot:items="props">
          
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2 blue--text" @click="editItem(props.item)">edit</v-icon>
              <v-icon small class="red--text" @click="deleteItem(props.item)">delete</v-icon>
            </td>
            <td class="text-xs-left">{{ props.item.nombreEntidad }}</td>
            <td class="text-xs-center align-start">{{ props.item.idSolicitud }}</td>
            
            <td class="text-xs-left" >{{ props.item.fechaEntrada }}</td>
            <td class="text-xs-left" >{{ props.item.expediente }}</td>
            <td class="text-xs-left" >{{ props.item.subcc }}</td>
          
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
            select: "",
            cargando: 0,
            valida: 0,
            validaMensaje: [],
            dialogModificar: false,
            dialogCrear: false,
            dialogBorrar:false,
            solicitudes: [],
            
            convocatorias:null,
            convocatoria: null,
            entidad: null,
            entidades:[],
            
            idConvocatoriaTrabajo: 1,
            rowsPerPageItems: [5,10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
            pagination: {
              rowsPerPage: 10
            },

            headers: [
              { text: 'Opciones', value: 'opciones', sortable: false, class: 'primary--text' },
              { text: 'Entidad', align: 'center', sortable: true, value: 'nombreEntidad', class: 'primary--text' },
              { text: 'id', align: 'center', sortable: true, value: 'idSolicitud', class: 'primary--text' },
              
              { text: 'Fecha', align: 'left', sortable: true, value: 'fechaEntrada', class: 'primary--text' },
              { text: 'Expediente', align: 'left', sortable: true, value: 'expediente', class: 'primary--text' },
              { text: 'subcc', align: 'left', sortable: true, value: 'subcc', class: 'primary--text' },
              ],
            palabraBusqueda:'',
            objeto: null,

            idSolicitud:'',
            idConvocatoria:'',
            nombreConvocatoria:'',
            yearConvocatoria:'',
            idEntidad:'',
            nombreEntidad:'',
            fechaEntrada:'',
            expediente:'',
            subcc:'',
            costePersonal:'',
            costeDietas:'',
            subvencionPersonal:'',
            subvencionDietas:'',
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
    
    

    

    
    mounted() {
        this.token = this.$store.state.token;
        this.header = {"Authorization" : "Bearer "+this.token};
        this.configuration = {headers : this.header};
        this.select = this.$store.getters.getIdConvocatoriaTrabajo;
        //console.log("El tipo de select es:"+typeof(this.select));
        this.idConvocatoriaTrabajo = this.select;
        //console.log("El tipo de idConvocatoriaTrabajo es: "+typeof(this.idConvocatoriaTrabajo));
        this.solicitudes = this.$store.getters.getSolicitudes;
        this.convocatorias = this.$store.getters.getConvocatorias;
        this.entidades = this.$store.getters.getEntidades;
           
        
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

        asiginarValores(item) {
          this.idSolicitud=item.idSolicitud;
            this.idConvocatoria=item.idConvocatoria;
            this.nombreConvocatoria=item.nombreConvocatoria;
            this.yearConvocatoria=item.yearConvocatoria;
            this.idEntidad= item.idEntidad;
            this.nombreEntidad=item.nombreEntidad;
            this.fechaEntrada=item.fechaEntrada;
            this.expediente=item.expediente;
            this.subcc=item.subcc;
            this.costePersonal=item.costePersonal;
            this.costeDietas=item.costeDietas;
            this.subvencionPersonal=item.subvencionPersonal;
            this.subvencionDietas=item.subvencionDietas;
            
        },
                
        cambiarEjercicioTrabajo() {
          
          this.$store.dispatch('cambiarConvocatoriaTrabajoAsync',this.select);
          this.select = this.$store.getters.getIdConvocatoriaTrabajo;
          this.idConvocatoriaTrabajo = this.select;
          let me = this;
          
          
        },
        
        cambiarConvocatoriaTrabajo() {
          let item = this.convocatoria;
          this.idConvocatoria=item.idConvocatoria;
          this.nombreConvocatoria=item.nombreConvocatoria;
          this.yearConvocatoria=item.yearConvocatoria;
        },

        cambiarEntidadTrabajo() {
          let item = this.entidad;
          this.idEntidad=item.idEntidad;
          this.nombreEntidad=item.nombreEntidad;
        },

        listar() {
          let me = this;
          this.cargando=1;

          axios.get('/api/solicitud_listar').then(function(response){
            me.solicitudes = response.data;
            me.$store.dispatch('setSolicitudesAsync',me.solicitudes);
            
          }).catch(function(error){
            console.log("Trabajaré con las convocatorias harcodeadas por defecto...");
            console.log("Error: "+error);
          });

         
          this.convocatorias = this.$store.getters.getConvocatorias;
          this.entidades = this.$store.getters.getEntidades;
          

          setTimeout(this.cambioCarga,1000);
        },


        editItem(item) {
            this.dialogModificar = true;
            this.asiginarValores(item);
       
        },

        validar() {
          this.valida=0;
          this.validaMensaje=[];
          if (this.fechaEntrada==='') {
            this.validaMensaje.push("El campo fecha entrada es obligatorio");
            this.valida=1;
            
          }

          if (this.idConvocatoria == null) {
            this.validaMensaje.push("La solicitud no puede estar vacía");
            this.valida=1;
            
          }

          if (this.idEntidad == null) {
            this.validaMensaje.push("La solicitud debe tener asignada una entidad");
            this.valida=1;
          }  
          return this.valida;
          
        },

        deleteItem(item) {
            
            this.dialogBorrar = true;
            this.asiginarValores(item);
                        
        },

        close() {
            this.dialogCrear = false;
            this.dialogModificar = false;
            this.dialogBorrar = false;
            this.limpiar();
            
            
            
        },

        limpiar() {
            this.idSolicitud='';
            this.idConvocatoria='';
            this.nombreConvocatoria='';
            this.yearConvocatoria='';
            this.idEntidad='';
            this.nombreEntidad='';
            this.fechaEntrada='';
            this.expediente='';
            this.subcc='';
            this.costePersonal='';
            this.costeDietas='';
            this.subvencionPersonal='';
            this.subvencionDietas='';
            
        },

        modificar () {
            
            if (this.validar()) {
              
              return;
            }
     
            // Código para editar
            
            let me = this;
            this.cargando=1;
            console.log("El subcc en el cliente es: "+me.subcc);   
            axios.put('/api/solicitud',{

              'idSolicitud':me.idSolicitud,
              'idConvocatoria':me.idConvocatoria,
              'nombreConvocatoria':me.nombreConvocatoria,
              'yearConvocatoria':me.yearConvocatoria,
              'idEntidad':me.idEntidad,
              'nombreEntidad':me.nombreEntidad,
              'fechaEntrada':me.fechaEntrada,
              'expediente':me.expediente,
              'subcc':me.subcc,
              'costePersonal':me.costePersonal,
              'costeDietas':me.costeDietas,
              'subvencionPersonal':me.subvencionPersonal,
              'subvencionDietas':me.subvencionDietas
              
                  
            }).then(function(response){
              me.close();
              me.listar();
                  
            }).catch(function(error){
              me.close();
              me.listar();
              console.log(error);
            });
            
              setTimeout(this.cambioCarga,1000);
              
              
            },

        
        
        crear () {

         
          if (this.validar()) {
              
              return;
            }

          //Código para crear
                let me = this;
                this.cargando=1;
                

                axios.post('/api/solicitud',{
              
              
              'idConvocatoria':me.idConvocatoria,
              'nombreConvocatoria':me.nombreConvocatoria,
              'yearConvocatoria':me.yearConvocatoria,
              'idEntidad':me.idEntidad,
              'nombreEntidad':me.nombreEntidad,
              'fechaEntrada':me.fechaEntrada,
              'expediente':me.expediente,
              'subcc':me.subcc,
              'costePersonal':me.costePersonal,
              'costeDietas':me.costeDietas,
              'subvencionPersonal':me.subvencionPersonal,
              'subvencionDietas':me.subvencionDietas
              
                  
                }).then(function(response){
                  me.close();
                  me.listar();
                }).catch(function(error){
                  me.close();
                  me.listar();
                  console.log(error);
                });
                
                setTimeout(this.cambioCarga,1000);
                
        },

        borrar(id) {
          this.close();
          let me = this;
                this.cargando=1;
                axios.delete('/api/solicitud/'+id).then(function(response){
                  me.close();
                  me.listar();
                  
                }).catch(function(error){
                  
                  me.close();
                  me.listar();
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);
          
          
        }
  

    }
}
</script>


