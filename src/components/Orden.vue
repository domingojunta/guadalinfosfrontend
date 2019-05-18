<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-icon color="blue">account_balance</v-icon>
        <v-toolbar-title class="primary--text">Órdenes</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="palabraBusqueda" 
          append-icon="search" 
          label="Búsqueda" single-line hide-details>
        </v-text-field>
        <v-spacer></v-spacer>

        <!-- Ventana Emergente Crear/Editar-->

        <v-dialog v-model="dialog" max-width="80%">
          <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2 blue" v-on="on" icon >
                <v-icon>add</v-icon>
                     
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline blue--text">{{ formTitle }}</span>
            </v-card-title>
             

            <v-card-text>
              <v-container grid-list-md>
                

                <v-layout wrap>
                  
                  <v-flex xs4 sm4 md4 v-if="editedIndex != -1">
                    <v-text-field disabled v-model="idOrden" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      name="Nombre"
                      box
                      label="Nombre"
                      auto-grow
                      value=""
                      autofocus
                      v-model="nombreOrden"
                    ></v-textarea>
                    
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      name="Alias"
                      box
                      label="Alias"
                      auto-grow
                      value=""
                      autofocus
                      v-model="aliasOrden"
                    ></v-textarea>
                    
                  </v-flex>
                  
                  <v-flex xs12 sm12 md12 v-if="valida">
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
              <v-btn color="blue darken-1" flat @click="guardar">
                <v-icon large>save</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Ventana Emergente Borrar-->

        <v-dialog v-model="dialog2" max-width="80%">
          
          <v-card>
            <v-card-title>
              
              <span class="headline red--text">¿Seguro que quiere borrar el siguiente registro?</span>
            </v-card-title>
             

            <v-card-text>
              <v-container grid-list-md>
                

                <v-layout wrap>

                  
                  
                  <v-flex xs4 sm4 md4>
                    <v-text-field disabled v-model="idOrden" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="nombreOrden" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field disabled v-model="aliasOrden" label="Alias"></v-text-field>
                  </v-flex>
                  
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">
                <v-icon large>cancel</v-icon>
              </v-btn>
              <v-btn color="red darken-1" flat @click="borrar(idOrden)">
                <v-icon large>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-layout v-if="cargando">
                  <v-flex class="text-xs-center">
                      <!-- <div class="text-xs-center">
                        <v-progress-circular

                          :size= 120
                          indeterminate
                          color="primary">
                            Cargando...
                        </v-progress-circular>
                        </div>
                        -->
                        <img src="../assets/Cargando2.gif" alt="Cargando..." width="100px" height="auto" >
                      
                    </v-flex>
                </v-layout>

      <v-data-table 
          :headers="headers" 
          :items="ordenes" 
          class="elevation-1" 
          :search="palabraBusqueda">

        <template v-slot:items="props">
          
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2 blue--text" @click="editItem(props.item)">edit</v-icon>
              <v-icon small class="red--text" @click="deleteItem(props.item)">delete</v-icon>
            </td>
            <td class="text-xs-center align-start">{{ props.item.idOrden }}</td>
            <td class="text-xs-left" >{{ props.item.aliasOrden }}</td>
            <td class="text-xs-justify">{{ props.item.nombreOrden }}</td>
            
          
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
export default {


    data() {
        return {
            cargando: 0,
            valida: 0,
            validaMensaje: [],
            grupos: null,
            idOrden: null,
            nombreOrden: '',
            aliasOrden: '',
            ordenes: null,
            dialog: false,
            dialog2: false,
            headers: [
              { text: 'Opciones', value: 'opciones', sortable: false, class: 'primary--text' },
              { text: 'id', align: 'center', sortable: true, value: 'idOrden', class: 'primary--text' },
              { text: 'alias', align: 'center', sortable: true, value: 'aliasOrden', class: 'primary--text' },
              { text: 'Nombre', align: 'center', sortable: true, value: 'nombreOrden', class: 'primary--text' },
              
              ],
            palabraBusqueda:'',
            editedIndex: -1,
            token: null,
            header: null,
            configuration: null,
            
        }
    },
    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'Crear Orden' : 'Editar Orden'
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

    watch: {
        dialog (val) {
        val || this.close()
        }
    },

    created () {
        
        this.ordenes= this.$store.getters.getOrdenes;
        
    },

    mounted() {
      this.token = this.$store.state.token;
        this.header = {"Authorization" : "Bearer "+this.token};
        this.configuration = {headers : this.header};
    },
    methods: {

        cambioCarga() {
          this.cargando=0;
        },

        listar() {
          let me = this;
          this.cargando=1;
          axios.get('/api/ordenes_listar', me.configuration).then(function(response){
            me.ordenes = response.data;
            me.$store.dispatch('setOrdenesAsync',me.ordenes);
            console.log("Acabo de actualizar los datos de órdenes desde BBDD...");
          }).catch(function(error){
            console.log("Trabajaré con las órdenes harcodeadas por defecto...");
           console.log("Error: "+error);
          });
          this.ordenes= this.$store.getters.getOrdenes;
          setTimeout(this.cambioCarga,1000);
        },
        editItem (item) {
            this.editedIndex=1;
            this.dialog = true;
            this.idOrden=item.idOrden;
            this.nombreOrden=item.nombreOrden;
            this.aliasOrden=item.aliasOrden;
            
        },
        validar() {
          this.valida=0;
          this.validaMensaje=[];
          if (this.nombreOrden.length<3 || this.nombreOrden.length>355) {
            this.validaMensaje.push("El nombre debe tener mas de 3 caracteres y menos de 355");
            this.valida=1;
            
          }

          if (this.aliasOrden.length<5 || this.aliasOrden.length>45) {
            this.validaMensaje.push("El cif debe tener entre 5 y 45 caracteres");
            this.valida=1;
            
          }
          return this.valida;
          
        },

        deleteItem (item) {
            
            this.dialog2 = true;
            this.idOrden=item.idOrden;
            this.nombreOrden=item.nombreOrden;
            this.aliasOrden=item.aliasOrden;
            
        },

        close () {
            this.dialog = false;
            this.dialog2=false;
            this.limpiar();
            
            
        },

        limpiar() {
            this.idOrden= null;
            this.nombreOrden= '';
            this.aliasOrden= '';
            this.editedIndex= -1;
            this.palabraBusqueda='';
        },

        guardar () {
            
            if (this.validar()) {
              
              return;
            }

            if (this.editedIndex > -1) {
                // Código para editar
                let me = this;
                this.cargando=1;
                axios.put('/api/orden',{
                  'idOrden': me.idOrden,
                  'nombreOrden': me.nombreOrden,
                  'aliasOrden': me.aliasOrden,
                  
                }, me.configuration).then(function(response){
                  me.close();
                  
                  me.listar();
                  
                }).catch(function(error){
                  
                  me.close();
                  
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);

            } else {

                //Código para crear
                let me = this;
                this.cargando=1;
                axios.post('/api/orden',{
                  'nombreOrden': me.nombreOrden,
                  'aliasOrden': me.aliasOrden,
                  
                }, me.configuration).then(function(response){
                  me.close();
                  me.limpiar();
                  me.listar();
                }).catch(function(error){
                  
                  me.close();
                  me.limpiar();
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);
            }
            this.close()
        },

        borrar(id) {
          this.close();
          let me = this;
                this.cargando=1;
                axios.delete('/api/orden/'+id, me.configuration).then(function(response){
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


