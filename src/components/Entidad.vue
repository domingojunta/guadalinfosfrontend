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
        <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field v-model="municipio" label="Municipio"></v-text-field>
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
                  
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

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
          <td class="text-xs-left">{{ props.item.tipoEntidad }}</td>
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

            provincias: ['Almería','Cádiz','Córdoba','Granada','Huelva','Jaén','Sevilla'],
            tipos: ['ayuntamiento','ELA'],
            grupos: ['A','B','C'],
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
            editedItem: {
              name: '',
              calories: 0,
              fat: 0,
              carbs: 0,
              protein: 0
            },
            
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
        console.log(this.entidades);
    },
    methods: {

        listar() {
          let me = this;
          axios.get('/api/entidades_listar').then(function(response){
            me.entidades = response.data;
            me.$store.dispatch('setEntidadesAsync',me.entidades);
            console.log("Acabo de actualizar los datos de entidades desde BBDD...");
          }).catch(function(error){
            console.log("Trabajaré con las entidades harcodeadas por defecto...");
           console.log("Error: "+error);
          });
          this.entidades= this.$store.getters.getEntidades;
        },
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close () {
            this.dialog = false
            
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
        },

        guardar () {
            if (this.editedIndex > -1) {
                // Código para editar
            } else {

                //Código para crear
                let me = this;
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
                })
            }
            this.close()
        }
  

    }
}
</script>
