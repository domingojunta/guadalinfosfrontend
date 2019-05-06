<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        
          
            <v-icon color="blue">account_balance</v-icon>
            <v-toolbar-title class="primary--text">Comunicaciones</v-toolbar-title>
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

        <!-- Ventana Emergente PDF-->
        <v-dialog v-model="dialogModificar" max-width="80%">
         
          <v-card>
            <v-card-title>
              <span class="headline blue--text">Imprimir Comunicación</span>
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

                  <v-flex xs3>
                    <v-text-field autofocus type="date" v-model="fechaComunicacionEntrada" label="Comunicación Entrada" :value="fechaComunicacionEntrada"></v-text-field>
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
              <v-btn color="blue darken-1" flat @click="modificar">
                <v-icon large>print</v-icon>
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
              <v-icon class="rm-2 blue--text" @click="pdfItem(props.item)">edit</v-icon>
              <v-icon class="green--text" @click="imprimirPDF(props.item)">picture_as_pdf</v-icon>

              
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
import jsPDF from 'jspdf'

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
            fechaComunicacionEntrada:'',
            
            
            
        }
    },
    
    watch: {
        dialog (val) {
        val || this.close()
        }
    },
    
    

    

    
    mounted() {
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
      }
    },
    
    methods: {

        crearPDF() {
          var doc = new jsPDF("p","mm","a4");
          doc.setFont("Times New Roman");
          doc.setFontSize(12);
          let imagenFondo = 'data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbFfZpWdbftT8bNzriNTOo5IckZpFKdl/m3o11yd1PKX00ua6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';
          doc.addImage(imagenFondo, 'PNG', 10, 15,185,275);
          let linea1 ='';
          let me=this;
          if (me.entidad[0].tipoEntidad =='ayuntamiento') {
            linea1 = 'Ayuntamiento de '+me.nombreEntidad;
          } else {
            linea1 = 'ELA de '+me.nombreEntidad;
          }
          doc.text(linea1,115,45);
          let linea2 = this.entidad[0].direccion;
          doc.text(linea2,115,50);
          let linea3 = this.entidad[0].codigoPostal + " "+ this.nombreEntidad;
          doc.text(linea3,115,55);
          let linea4 = this.entidad[0].provincia;
          doc.text(linea4,115,60);
          let linea5 = 'N/Ref.: Desarrollo Tecnológico DO/al\nFecha: la de la firma\nAsunto: Comunicación entrada solicitud\nExpediente: RAPI '+ this.expediente+'/'+this.yearConvocatoria;
          doc.text(linea5,25,70);
          doc.setFontSize(10);
          let parrafo1='De conformidad con la obligación establecida en el artículo 21.4 de la Ley 39/2015 de 1 de octubre, Ley de Procedimiento Administrativo Común de las Administraciones Públicas (BOE número 236 de 2 de octubre del 2015) y del artículo 13 de la Orden de 25 de enero del 2016 de la Consejería de Empleo, Empresa y Comercio, por la que se establecen las bases reguladoras para la concesión de subvenciones destinadas a la dinamización de la red de Centros de Acceso Público a Internet en Municipios, Zonas Necesitadas de Transformación Social, Entidades Locales Autónomas de Andalucía y Puntos de Acceso Público a Internet, BOJA número 29 de 29 de enero del 2016, en la redacción dada por la Orden de 20 de enero del 2017 que modifica parcialmente la anterior, se le informa que el pasado '+new Date(this.fechaEntrada).toLocaleDateString()+' tuvo entrada en el Registro de éste órgano su solicitud de subvención presentada al amparo de la Orden anteriormente citada, en su convocatoria para el año 2019, en virtud de la Resolución de 12 de noviembre del 2018 de la Dirección General de Telecomunicaciones y Sociedad de la Información, por la que se convoca en el año 2018 la concesión de subvenciones para Centros de Acceso Público a Internet al amparo de la Orden de 25 de enero del 2016 (BOJA número 220 de 14 de noviembre del 2018).';
          doc.text(parrafo1,25,95,{maxWidth: 160, align: "justify"});
          let parrafo2 = 'De conformidad con el artículo 9 de la citada Orden, la presente solicitud inicia un procedimiento administrativo que se tramitará y resolverá en régimen de concurrencia no competitiva por esta Delegación Territorial, siendo el plazo máximo para resolver y notificar de seis meses a computar desde que la solicitud haya tenido entrada en el registro de esta Delegación Territorial, (artículo 19.3 de la Orden).';
          doc.text(parrafo2,25,155,{maxWidth: 160, align: "justify"});
          let parrafo3='De conformidad con el artículo 19.4 de la Orden, deberá entender desestimada su solicitud al vencer el plazo máximo anteriormente citado, sin que se hubiese notificado la resolución expresa.';
          doc.text(parrafo3,25,180,{maxWidth: 160, align: "justify"});
          let firma='EL JEFE DE SERVICIO DE COOPERACIÓN ECONÓMICA Y DESARROLLO TECNOLÓGICO\nFdo.: Domingo José Orta Pacheco.';
          doc.text(firma,25,200);
          
          
          
          let nombreFichero = "comunicacion RAPI "+this.yearConvocatoria+" "+this.nombreEntidad+".pdf"
          console.log("El nombre del fichero es: "+nombreFichero);
          doc.save(nombreFichero);
        },

        pedirPDFAlServidor(idSolicitud, yearConvocatoria, nombreEntidad){
          
          let me = this;
          this.cargando=1;
          //let direccion = '/reporte/comunicacionEntrada/'+idSolicitud;
          //console.log("Voy a hacer una petición get a:"+direccion);
          
          axios('/reporte/comunicacionEntrada/'+idSolicitud, {
            method: 'GET',
            responseType: 'blob'
          }).then(function(response){
            const file = new Blob(
              [response.data],
              {type: 'application/x-download'}
            );
            
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            let nombreFichero = 'Comunicacion_de_Entrada_RAPI_'+yearConvocatoria+'_'+nombreEntidad+'.pdf';
            link.setAttribute('download',nombreFichero);
            document.body.appendChild(link);
            link.click();
            //window.open(fileURL);
            
          }).catch(function(error){
            
            console.log("Error: "+error);
          });

          setTimeout(this.cambioCarga,1000);
        }, 

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
            this.fechaComunicacionEntrada=item.fechaComunicacionEntrada;
            this.entidad = this.entidades.filter(
              (item) => item.idEntidad === this.idEntidad
            ).map(function(x){
              return {
                'idEntidad':x.idEntidad,
                'direccion':x.direccion,
                'codigoPostal': x.codigoPostal,
                'municipio':x.municipio,
                'provincia':x.provincia,
                'tipoEntidad':x.tipoEntidad
              }
            });
            
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


        pdfItem(item) {
            this.dialogModificar = true;
            this.asiginarValores(item);
        },

        imprimirPDF(item) {
            
            this.asiginarValores(item);
            if (this.fechaEntrada==null || this.fechaEntrada=='') {
              alert("Antes de imprimir debes de rellenar los campos");
            } else {
              this.pedirPDFAlServidor(item.idSolicitud, item.yearConvocatoria, item.nombreEntidad);
              //this.crearPDF();
              this.limpiar();
            }
            
        },

        validar() {
          this.valida=0;
          this.validaMensaje=[];
          
          if (this.fechaComunicacionEntrada == null) {
            this.validaMensaje.push("La fecha de comunicación no puede ser nula");
            this.valida=1;
          } 
          return this.valida;
          
        },

       

        close() {
           
            this.dialogModificar = false;
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
            this.fechaComunicacionEntrada='';
            
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
              'subvencionDietas':me.subvencionDietas,
              'fechaComunicacionEntrada':me.fechaComunicacionEntrada
              
                  
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

  

    }
}
</script>


