<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-icon color="blue">account_balance</v-icon>
        <v-toolbar-title class="primary--text">Entidades</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="palabraBusqueda" 
          append-icon="search" 
          label="Búsqueda" single-line hide-details>
        </v-text-field>
        <v-spacer></v-spacer>

        <!-- Ventana Emergente -->

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
                    <v-text-field disabled v-model="idEntidad" label="Id"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field autofocus v-model="nombreEntidad" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field v-model="acreedorGIRO" label="GIRO"></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field v-model="cif" label="CIF"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="direccion" label="Dirección"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field v-model="codigoPostal" label="Código Postal"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field   v-model="municipio" label="Municipio"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                        v-model="provincia"
                        :items="provincias"
                        label="Provincia"
                        single-line
                    ></v-select>
                    
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="emailAyuntamiento" label="Email Ayuntamiento"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="emailCentro" label="Email Centro"></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                        v-model="tipoEntidad"
                        :items="tipos"
                        label="Tipo"
                        single-line
                    ></v-select>
                    
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                        v-model="grupoEntidad"
                        :items="grupos"
                        label="Grupo"
                        single-line
                    ></v-select>
                    
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field v-model="posicionIBAN" label="Posición IBAN"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="iban" label="IBAN"></v-text-field>
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

        <v-dialog v-model="dialog2" max-width="80%">
          
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
          :items="entidades" 
          class="elevation-1" 
          :search="palabraBusqueda">

        <template v-slot:items="props">
          
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2 blue--text" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="red--text" @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td class="text-xs-center">{{ props.item.idEntidad }}</td>
          <td class="text-xs-left">{{ props.item.nombreEntidad }}</td>
          <td class="text-xs-center">{{ props.item.cif }}</td>
          <td class="text-xs-left text-capitalize">{{ props.item.tipoEntidad }}</td>
          <td class="text-xs-center">{{ props.item.grupoEntidad }}</td>
          <td class="text-xs-left">{{ props.item.municipio }}</td>
          
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Resetear</v-btn>
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
            provincias: null,
            tipos: null,
            grupos: null,
            idEntidad: null,
            nombreEntidad: '',
            acreedorGIRO: '',
            cif: '',
            direccion:'',
            codigoPostal:'',
            municipio:'',
            provincia:'Córdoba',
            emailAyuntamiento:'',
            emailCentro:'',
            tipoEntidad:'',
            grupoEntidad:'',
            posicionIBAN:'',
            iban:'',

            entidades: null,
            dialog: false,
            dialog2: false,
            headers: [
              { text: 'Opciones', value: 'opciones', sortable: false, class: 'primary--text' },
              { text: 'id', align: 'center', sortable: true, value: 'idEntidad', class: 'primary--text' },
              { text: 'Nombre', align: 'center', sortable: true, value: 'nombreEntidad', class: 'primary--text' },
              { text: 'CIF', align: 'center', sortable: true, value: 'cif', class: 'primary--text' },
              { text: 'Tipo', align: 'center', sortable: true, value: 'tipoEntidad', class: 'primary--text' },
              { text: 'Grupo', align: 'center', sortable: true, value: 'grupoEntidad', class: 'primary--text' },
              { text: 'Municipio', align: 'center', sortable: false, value: 'municipio', class: 'primary--text' },
            ],
            palabraBusqueda:'',
            editedIndex: -1,
            
        }
    },
    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'Crear Entidad' : 'Editar Entidad'
        }
        
    },

    watch: {
        dialog (val) {
        val || this.close()
        }
    },

    

    created () {
        
        this.entidades= this.$store.getters.getEntidades;
        this.provincias= this.$store.getters.getProvincias;
        this.grupos= this.$store.getters.getGrupos;
        this.tipos= this.$store.getters.getTipos;
        
        
    },
    methods: {

        cambioCarga() {
          this.cargando=0;
        },

        listar() {
          let me = this;
          this.cargando=1;
          axios.get('/api/entidades_listar').then(function(response){
            me.entidades = response.data;
            me.$store.dispatch('setEntidadesAsync',me.entidades);
            console.log("Acabo de actualizar los datos de entidades desde BBDD...");
          }).catch(function(error){
            console.log("Trabajaré con las entidades harcodeadas por defecto...");
           console.log("Error: "+error);
          });
          this.entidades= this.$store.getters.getEntidades;
          setTimeout(this.cambioCarga,1000);
        },
        editItem (item) {
            this.editedIndex=1;
            this.dialog = true;
            this.idEntidad=item.idEntidad;
            this.nombreEntidad=item.nombreEntidad;
            this.acreedorGIRO=item.acreedorGIRO;
            this.cif=item.cif;
            this.direccion=item.direccion;
            this.codigoPostal=item.codigoPostal;
            this.municipio=item.municipio;
            this.provincia=item.provincia;
            this.emailAyuntamiento=item.emailAyuntamiento;
            this.emailCentro=item.emailCentro;
            this.tipoEntidad=item.tipoEntidad;
            this.grupoEntidad=item.grupoEntidad;
            this.posicionIBAN=item.posicionIBAN;
            this.iban=item.iban;
         
        },
        validar() {
          this.valida=0;
          this.validaMensaje=[];
          if (this.nombreEntidad.length<3 || this.nombreEntidad.length>45) {
            this.validaMensaje.push("El nombre debe tener mas de 3 caracteres y menos de 45");
            this.valida=1;
            
          }

          if (this.cif.length<9 || this.cif.length>10) {
            this.validaMensaje.push("El cif debe tener entre 9 y 10 caracteres");
            this.valida=1;
            
          }
          return this.valida;
          
        },

        deleteItem (item) {
            
            this.dialog2 = true;
            this.idEntidad=item.idEntidad;
            this.nombreEntidad=item.nombreEntidad;
            this.acreedorGIRO=item.acreedorGIRO;
            this.cif=item.cif;
            this.direccion=item.direccion;
            this.codigoPostal=item.codigoPostal;
            this.municipio=item.municipio;
            this.provincia=item.provincia;
            this.emailAyuntamiento=item.emailAyuntamiento;
            this.emailCentro=item.emailCentro;
            this.tipoEntidad=item.tipoEntidad;
            this.grupoEntidad=item.grupoEntidad;
            this.posicionIBAN=item.posicionIBAN;
            this.iban=item.iban;
        },

        close () {
            this.dialog = false;
            this.dialog2=false;
            this.limpiar();
            
            
        },

        limpiar() {
            this.idEntidad= null;
            this.nombreEntidad= '';
            this.acreedorGIRO= '';
            this.cif= '';
            this.direccion='';
            this.codigoPostal='';
            this.municipio='';
            this.provincia='Córdoba';
            this.emailAyuntamiento='';
            this.emailCentro='';
            this.tipoEntidad='';
            this.grupoEntidad='';
            this.posicionIBAN='';
            this.iban='';
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
                axios.put('/api/entidad',{
                  'idEntidad': me.idEntidad,
                  'nombreEntidad': me.nombreEntidad,
                  'acreedorGIRO': me.acreedorGIRO,
                  'cif': me.cif,
                  'direccion': me.direccion,
                  'codigoPostal': me.codigoPostal,
                  'municipio': me.municipio,
                  'provincia': me.provincia,
                  'emailAyuntamiento': me.emailAyuntamiento,
                  'emailCentro': me.emailCentro,
                  'tipoEntidad': me.tipoEntidad,
                  'grupoEntidad': me.grupoEntidad,
                  'posicionIBAN': me.posicionIBAN,
                  'iban': me.iban
                }).then(function(response){
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
                axios.post('/api/entidad',{
                  'nombreEntidad': me.nombreEntidad,
                  'acreedorGIRO': me.acreedorGIRO,
                  'cif': me.cif,
                  'direccion': me.direccion,
                  'codigoPostal': me.codigoPostal,
                  'municipio': me.municipio,
                  'provincia': me.provincia,
                  'emailAyuntamiento': me.emailAyuntamiento,
                  'emailCentro': me.emailCentro,
                  'tipoEntidad': me.tipoEntidad,
                  'grupoEntidad': me.grupoEntidad,
                  'posicionIBAN': me.posicionIBAN,
                  'iban': me.iban
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
            }
            this.close()
        },

        borrar(id) {
          this.close();
          let me = this;
                this.cargando=1;
                axios.delete('/api/entidad/'+id).then(function(response){
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


