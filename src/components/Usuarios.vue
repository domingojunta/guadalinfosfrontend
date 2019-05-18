<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-icon color="blue">person</v-icon>
        <v-toolbar-title class="primary--text">Usuarios</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="palabraBusqueda" 
          append-icon="search" 
          label="Búsqueda" single-line hide-details>
        </v-text-field>
        <v-spacer></v-spacer>
 
        
        <!-- Diálogo Crear -->
        <v-dialog v-model="dialogCrear" max-width="80%">
          <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2 blue" v-on="on" icon >
                <v-icon>add</v-icon>
                     
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline blue--text">Crear Usuario</span>
            </v-card-title>
             

            <v-card-text>
              <v-container grid-list-md>
                

                <v-layout wrap>
                  
                  
                  <v-flex xs12 sm12 md12>
                    <v-text-field autofocus v-model="nombreUsuario" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field 
                      :type="mostrar ? 'text' : 'password'" 
                      v-model="password" 
                      label="Contraseña"
                      :append-icon="mostrar ? 'visibility' : 'visibility_off'"
                      
                      @click:append="mostrar = !mostrar"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field 
                      :type="mostrar ? 'text' : 'password'" 
                      v-model="password2" 
                      label="Repite la Contraseña"
                      :append-icon="mostrar ? 'visibility' : 'visibility_off'"
                      @click:append="mostrar = !mostrar"
                    ></v-text-field></v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-select
                        v-model="rol"
                        :items="roles"
                        label="Rol"
                        single-line
                    ></v-select>
                    
                  </v-flex>
                  
                  <v-flex xs6 sm6 md6>
                    <v-select
                        v-model="activo"
                        :items= "estadosUsuario"
                        label="Activo"
                        single-line
                    ></v-select>
                    
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
              <v-btn color="blue darken-1" flat @click="crearItem">
                <v-icon large>save</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        

        <v-dialog v-model="dialogEditar" max-width="80%">
          <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2 blue" v-on="on" icon >
                <v-icon>add</v-icon>
                     
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline blue--text">Editar Usuario</span>
            </v-card-title>
             

            <v-card-text>
              <v-container grid-list-md>
                

                <v-layout wrap>
                  
                  <v-flex xs4 sm4 md4 v-if="editedIndex != -1">
                    <v-text-field disabled v-model="idUsuario" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field autofocus v-model="nombreUsuario" label="Nombre"></v-text-field>
                  
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

<!--        
        <v-dialog v-model="dialogBorrar" max-width="80%">
          
          <v-card>
            <v-card-title>
              
              <span class="headline red--text">¿Seguro que quiere borrar el siguiente registro?</span>
            </v-card-title>
             

            <v-card-text>
              <v-container grid-list-md>
                

                <v-layout wrap>

                  
                  
                  <v-flex xs4 sm4 md4>
                    <v-text-field disabled v-model="idEntidad" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="nombreEntidad" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field disabled v-model="acreedorGIRO" label="GIRO"></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field disabled v-model="cif" label="CIF"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="direccion" label="Dirección"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field disabled v-model="codigoPostal" label="Código Postal"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field  disabled v-model="municipio" label="Municipio"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field  disabled v-model="provincia" label="Provincia"></v-text-field>
                    
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="emailAyuntamiento" label="Email Ayuntamiento"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="emailCentro" label="Email Centro"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field  disabled v-model="tipoEntidad" label="Tipo"></v-text-field>
                    
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field  disabled v-model="grupoEntidad" label="Grupo"></v-text-field>
                    
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field disabled v-model="posicionIBAN" label="Posición IBAN"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="iban" label="IBAN"></v-text-field>
                  </v-flex>
                  
                  
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">
                <v-icon large>cancel</v-icon>
              </v-btn>
              <v-btn color="red darken-1" flat @click="borrar(idEntidad)">
                <v-icon large>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      
       -->
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
          :items="usuarios" 
          class="elevation-1" 
          :search="palabraBusqueda"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          >

        <template v-slot:items="props">
          
          <td class="justify-center layout px-0">
            <v-icon  class="mr-2 blue--text" >edit</v-icon>
            <v-icon  class="red--text" >delete</v-icon>
          </td>
          <td class="text-xs-left">{{ props.item.nombreUsuario }}</td>
          <td class="text-xs-center">{{ props.item.idUsuario }}</td>
          
          <td class="text-xs-center">{{ props.item.rol }}</td>
          <td class="text-xs-center">
            <v-icon 
              v-if="props.item.activo" 
              large color="green"
              @click="desactivarUsuario(props.item)" >
              toggle_on
            </v-icon>
            <v-icon v-else large color="red"
            @click="activarUsuario(props.item)" >
              toggle_off
            </v-icon>
          
          </td>
          
          
        </template>
        <template v-slot:no-data>
          <td>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
                outline 
              >
                No se han podido cargar los datos desde el servidor
              </v-alert>
          </td>
          <td>
              <v-btn color="primary" @click="irInicio">Ir a inicio</v-btn>
          </td>
          
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
            
            idUsuario: null,
            nombreUsuario: null,
            password: null,
            password2: null,
            rawPassword: null,
            rol: null,
            roles: ['ADMINISTRADOR','USUARIO','LECTOR'],
            activo: null,
            usuarios: [],
            usuario: null,
            estadosUsuario: [true,false],
            mostrar: 0,
            cargando: 0,
            valida: 0,
            validaMensaje: [],
            
            dialogCrear: false,
            dialogEditar: false,
            dialogBorrar: false,
            rowsPerPageItems: [5,10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
            pagination: {
              rowsPerPage: 10
            },
            headers: [
              { text: 'Opciones', value: 'opciones', sortable: false, class: 'primary--text' },
              { text: 'Nombre', align: 'center', sortable: true, value: 'nombreUsuario', class: 'primary--text' },
              { text: 'Id', align: 'center', sortable: true, value: 'idUsuario', class: 'primary--text' },
              { text: 'Rol', align: 'center', sortable: true, value: 'rol', class: 'primary--text' },
              { text: 'Activo', align: 'center', sortable: true, value: 'activo', class: 'primary--text' },
            ],
            palabraBusqueda:'',
            token: null,
            header: null,
            configuration: null,
            validaMensaje: null,
            valida: null,
            
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

    
    mounted(){
        this.token = this.$store.state.token;
        this.header = {"Authorization" : "Bearer "+this.token};
        this.configuration = {headers : this.header};
        this.listar();
    },

    methods: {

        cambioCarga() {
          this.cargando=0;
        },

        listar() {
          let me = this;
          this.cargando=1;
          axios.get('/api/usuarios',me.configuration).then(function(response){
            me.usuarios = response.data;
          }).catch(function(error){
            //alert("No se han podido descargar los datos del servidor.");
            console.log("Error: "+ error);
          });
          
          setTimeout(this.cambioCarga,1000);
        },


        editItem (item) {
            
            this.dialogEditar = true;
            
         
        },
        validar() {
          this.valida=0;
          this.validaMensaje=[];

          if (this.nombreUsuario!=null) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (pattern.test(this.nombreUsuario)) {
              this.valida=0;
            } else {
              this.validaMensaje.push("El nombre introducido no es un email válido");
              this.valida=1;
            }
          } else {
              this.validaMensaje.push("El nombre introducido no es un email válido");
              this.valida=1;
          }

           
          if (this.password ==null || this.password =='') {
            this.validaMensaje.push("Debe indicar una contraseña...");
            this.valida=1;
            
          }

          if (this.password!=this.password2) {
            this.validaMensaje.push("Las contraseñas deben coincidir...");
            this.valida=1;
          }

          if (this.rol==null || this.rol=="") {
            this.validaMensaje.push("Debes indicar un rol para el usuario");
            this.valida=1;
            
          }

          if (!(this.activo=='activo'|| this.activo=='inactivo')) {
            this.validaMensaje.push("El valor sólo puede ser activo/inactivo");
            this.valida=1;
            
          }
          return this.valida;
          
        },

        crearItem(){
          this.validar();
          this.crearUsuarioEnServidor();
          
        },

        crearUsuarioEnServidor() {
          let me = this;
          this.cargando=1;
          if (me.activo=='activo') {
            me.activo=1;
          } else {
            me.activo=0;
          }
          axios.post('/api/usuario',{
              'nombreUsuario': me.nombreUsuario,
              'password': me.password,
              'rol': me.rol,
              'activo': me.activo
                  
                },me.configuration)
                .then(function(response){
                  me.close();
                  me.listar();
                }).catch(function(error){
                  me.close();
                  me.listar();
                  
                });
                
                setTimeout(this.cambioCarga,1000);
                
       
        },

        activarUsuario(item) {
          
          this.idUsuario=item.idUsuario;
          this.activo = 1;
          this.activarDesactivarUsuario();
        },

        desactivarUsuario(item) {
          
          this.idUsuario=item.idUsuario;
          this.activo = 0;
          this.activarDesactivarUsuario();
        },
        
        activarDesactivarUsuario(){
          let me = this;
          axios.put('/api/activoInactivoUsuario',{
              'idUsuario': me.idUsuario,
              'activo': me.activo
                  
                },me.configuration)
                .then(function(response){
                  me.close();
                  me.listar();
                }).catch(function(error){
                  me.close();
                  me.listar();
                  
                });
                
                setTimeout(this.cambioCarga,1000);

        
        },
          
    
        
        deleteItem (item) {
            
            this.dialogBorrar = true;
            
        },

        close () {
            this.dialogCrear = false;
            this.dialogEditar=false;
            this.dialogBorrar=false;
            this.limpiar();
            
            
        },

        limpiar() {
            this.idUsuario=null;
            this.nombreUsuario=null;
            this.password=null;
            this.password2=null;
            this.rol=null;
            this.activo=null;
            this.usuario=null;
            
        },

        

        borrar(id) {
          this.close();
          let me = this;
                this.cargando=1;
                axios.delete('/usuario/'+id,me.configuration).then(function(response){
                  me.close();
                  
                  me.listar();
                  
                }).catch(function(error){
                  
                  me.close();
                  
                  console.log(error);
                });
                setTimeout(this.cambioCarga,1000);
          
          
        },

        irInicio() {
          this.$router.push({name: 'home'})
        }
  

    },
     
}
</script>


