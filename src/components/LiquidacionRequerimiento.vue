<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        
          
            <v-icon color="blue">account_balance</v-icon>
            <v-toolbar-title class="primary--text">Requerimiento</v-toolbar-title>
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
              <span class="headline blue--text">Imprimir Requerimiento</span>
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
                    <v-text-field type="date" v-model="fechaComunicacionEntrada" label="Comunicación Entrada"
                    :value="fechaComunicacionEntrada"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaAeat" label="Fecha AEAT"
                    :value="fechaAeat"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaAtrian" label="Fecha ATRIAN"
                    :value="fechaAtrian"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="date" v-model="fechaSeguridadSocial" label="Fecha S.Social"
                    :value="fechaSeguridadSocial"></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field type="date" v-model="fechaRequerimientoSolicitud" label="Fecha Requerimiento Solicitud"
                    :value="fechaRequerimientoSolicitud"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field type="date" v-model="fechaPropuestaConcesion" label="Fecha Propuesta Concesión"
                    :value="fechaPropuestaConcesion"></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field type="text" v-model="expedienteContableD" label="Expediente Contable D"
                    :value="expedienteContableD"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field type="text" v-model="numeroDocumentoD" label="Número documento D"
                    :value="numeroDocumentoD"></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field type="date" v-model="fechaResolucionConcesion" label="Fecha Resolución Concesión"
                    :value="fechaResolucionConcesion"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field type="date" v-model="fechaNotificacionResolucionConcesion" label="Fecha Notif. Res. Concesión"
                    :value="fechaNotificacionResolucionConcesion"></v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field type="date" v-model="fechaPropuestaOJ" label="Fecha propuesta OJ"
                    :value="fechaPropuestaOJ"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="expedienteContableOJ" label="Expediente OJ"
                    :value="expedienteContableOJ"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="numeroDocumentoOJ" label="Número doc. OJ"
                    :value="numeroDocumentoOJ"></v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field type="number" v-model="importeOJ" label="Importe OJ"
                    :value="importeOJ"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="date" v-model="fechaPagoMaterialOJ" label="Fecha pago OJ"
                    :value="fechaPagoMaterialOJ"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="text" v-model="numeroDocumentoOM" label="Número doc. OM"
                    :value="numeroDocumentoOM"></v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field type="number" v-model="numeroDiasFuncionamiento" label="Número días funcionamiento"
                    :value="numeroDiasFuncionamiento"></v-text-field>
                  </v-flex>
                  <v-flex xs8></v-flex>

                  <v-flex xs4>
                    <v-text-field type="number" v-model="objetivoNumeroActividades" label="Objetivo Num. Actividades"
                    :value="objetivoNumeroActividades"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="number" v-model="objetivoNumeroActividadesMarcadas" label="Objetivo Num. Activ. Marcadas"
                    :value="objetivoNumeroActividadesMarcadas"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="number" v-model="objetivoNumeroMeses" label="Objetivo número meses"
                    :value="objetivoNumeroMeses"></v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-text-field type="number" v-model="numeroActividadesAlcanzado" label="Número Actividades Alcanzado"
                    :value="objetivoNumeroActividades"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="number" v-model="numeroActividadesMarcadasAlcanzado" label="Num. Activ. Marcadas Alcanzado"
                    :value="numeroActividadesMarcadasAlcanzado"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="number" v-model="numeroMesesAlcanzado" label="Número meses alcanzado"
                    :value="numeroMesesAlcanzado"></v-text-field>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field type="number" v-model="importeJustificadoPersonal" label="Importe Justif. Personal"
                    :value="importeJustificadoPersonal"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field type="number" v-model="importeJustificadoDietas" label="Importe Jusif. Dietas"
                    :value="importeJustificadoDietas"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    
                  </v-flex>

                  <v-flex xs12>
                  <v-textarea
                    box
                    v-model="documentacionRequerida"
                    label="Documentación a Requerir"
                    value=""
                  ></v-textarea>
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
              <v-btn color="blue darken-1" flat @click="guardar">
                <v-icon large>save</v-icon>
              </v-btn>
              <v-btn color="blue darken-1" flat @click="imprimirPDF">
                <v-icon large>picture_as_pdf</v-icon>
              </v-btn>
              <v-btn color="blue darken-1" flat @click="imprimirRTF">
                <v-icon large>chrome_reader_mode</v-icon>
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
            fechaComunicacionEntrada:'',
            fechaAeat:'',
            fechaAtrian:'',
            fechaSeguridadSocial:'',
            fechaRequerimientoSolicitud:'',
            documentacionRequerida:'',
            fechaPropuestaConcesion:'',
            expedienteContableD:'',
            numeroDocumentoD:'',
            fechaResolucionConcesion:'',
            fechaNotificacionResolucionConcesion:'',

            fechaPropuestaOJ:'',
            expedienteContableOJ:'',
            numeroDocumentoOJ:'',
            importeOJ:'',
            fechaPagoMaterialOJ:'',
            numeroDocumentoOM:'',
            numeroDiasFuncionamiento:'',
            objetivoNumeroActividades:'',
            objetivoNumeroActividadesMarcadas:'',
            objetivoNumeroMeses:'',
            numeroActividadesAlcanzado:'',
            numeroActividadesMarcadasAlcanzado:'',
            numeroMesesAlcanzado:'',
            importeJustificadoPersonal:'',
            importeJustificadoDietas:'',
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

        
        pedirPDFAlServidor(idSolicitud, yearConvocatoria, nombreEntidad){
          
          let me = this;
          this.cargando=1;
          //let direccion = '/reporte/comunicacionEntrada/'+idSolicitud;
          //console.log("Voy a hacer una petición get a:"+direccion);
          
          axios('/reporte/requerimientoLiquidacion/', {
            method: 'PUT',
            responseType: 'blob',
            data: {
              'idSolicitud':me.idSolicitud,
              'documentacionRequerida':me.documentacionRequerida
            }
          }).then(function(response){
            const file = new Blob(
              [response.data],
              {type: 'application/x-download'}
            );
            
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            let nombreFichero = 'Requerimiento_Liquidacion_RAPI_'+yearConvocatoria+'_'+nombreEntidad+'.pdf';
            link.setAttribute('download',nombreFichero);
            document.body.appendChild(link);
            link.click();
            //window.open(fileURL);
            
          }).catch(function(error){
            
            console.log("Error: "+error);
          });

          setTimeout(this.cambioCarga,1000);
        },
        
        pedirRTFAlServidor(idSolicitud, yearConvocatoria, nombreEntidad){
          
          let me = this;
          this.cargando=1;
          //let direccion = '/reporte/comunicacionEntrada/'+idSolicitud;
          //console.log("Voy a hacer una petición get a:"+direccion);
          
          axios('/reporte/requerimientoLiquidacion/'+idSolicitud, {
            method: 'GET',
            responseType: 'blob',
            
          }).then(function(response){
            const file = new Blob(
              [response.data],
              {type: 'application/x-download'}
            );
            
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            let nombreFichero = 'Requerimiento_Liquidacion_RAPI_'+yearConvocatoria+'_'+nombreEntidad+'.rtf';
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
            this.fechaAeat=item.fechaAeat;
            this.fechaAtrian=item.fechaAtrian;
            this.fechaSeguridadSocial=item.fechaSeguridadSocial;
            this.fechaRequerimientoSolicitud=item.fechaRequerimientoSolicitud;
            this.fechaPropuestaConcesion=item.fechaPropuestaConcesion;
            this.expedienteContableD=item.expedienteContableD;
            this.numeroDocumentoD=item.numeroDocumentoD;
            this.fechaResolucionConcesion=item.fechaResolucionConcesion;
            this.fechaNotificacionResolucionConcesion= item.fechaNotificacionResolucionConcesion;

            this.fechaPropuestaOJ=item.fechaPropuestaOJ;
            this.expedienteContableOJ=item.expedienteContableOJ;
            this.numeroDocumentoOJ=item.numeroDocumentoOJ;
            this.importeOJ=item.importeOJ;
            this.fechaPagoMaterialOJ=item.fechaPagoMaterialOJ;
            this.numeroDocumentoOM=item.numeroDocumentoOM;
            this.numeroDiasFuncionamiento=item.numeroDiasFuncionamiento;
            this.objetivoNumeroActividades=item.objetivoNumeroActividades;
            this.objetivoNumeroActividadesMarcadas=item.objetivoNumeroActividadesMarcadas;
            this.objetivoNumeroMeses=item.objetivoNumeroMeses;
            this.numeroActividadesAlcanzado=item.numeroActividadesAlcanzado;
            this.numeroActividadesMarcadasAlcanzado=item.numeroActividadesMarcadasAlcanzado;
            this.numeroMesesAlcanzado=item.numeroMesesAlcanzado;
            this.importeJustificadoPersonal=item.importeJustificadoPersonal;
            this.importeJustificadoDietas=item.importeJustificadoDietas;
            
            
            
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

        imprimirPDF() {
           this.pedirPDFAlServidor(this.idSolicitud, this.yearConvocatoria, this.nombreEntidad);
            me.close();
            me.listar();

        },

        imprimirRTF() {
            this.pedirRTFAlServidor(this.idSolicitud, this.yearConvocatoria, this.nombreEntidad);
            me.close();
            me.listar();
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
            this.fechaAeat="";
            this.fechaAtrian="";
            this.fechaSeguridadSocial="";
            this.fechaRequerimientoSolicitud="";

            this.documentacionRequerida="";
            
            this.fechaPropuestaConcesion='';
            this.expedienteContableD='';
            this.numeroDocumentoD='';
            this.fechaResolucionConcesion='';
            this.fechaNotificacionResolucionConcesion='';

            this.fechaPropuestaOJ='';
            this.expedienteContableOJ='';
            this.numeroDocumentoOJ='';
            this.importeOJ='';
            this.fechaPagoMaterialOJ='';
            this.numeroDocumentoOM='';
            this.numeroDiasFuncionamiento='';
            this.objetivoNumeroActividades='';
            this.objetivoNumeroActividadesMarcadas='';
            this.objetivoNumeroMeses='';
            this.numeroActividadesAlcanzado='';
            this.numeroActividadesMarcadasAlcanzado='';
            this.numeroMesesAlcanzado='';
            this.importeJustificadoPersonal='';
            this.importeJustificadoDietas='';
            
            
        },

        guardar () {
            
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
              'fechaComunicacionEntrada':me.fechaComunicacionEntrada,
              'fechaAeat':me.fechaAeat,
              'fechaAtrian':me.fechaAtrian,
              'fechaSeguridadSocial': me.fechaSeguridadSocial,
              'fechaRequerimientoSolicitud':me.fechaRequerimientoSolicitud,
              'documentacionRequerida':me.documentacionRequerida,

              'fechaPropuestaConcesion':me.fechaPropuestaConcesion,
              'expedienteContableD':me.expedienteContableD,
              'numeroDocumentoD':me.numeroDocumentoD,
              'fechaResolucionConcesion':me.fechaResolucionConcesion,
              'fechaNotificacionResolucionConcesion':me.fechaNotificacionResolucionConcesion,

              'fechaPropuestaOJ':me.fechaPropuestaOJ,
              'expedienteContableOJ':me.expedienteContableOJ,
              'numeroDocumentoOJ':me.numeroDocumentoOJ,
              'importeOJ':me.importeOJ,
              'fechaPagoMaterialOJ':me.fechaPagoMaterialOJ,
              'numeroDocumentoOM':me.numeroDocumentoOM,
              'numeroDiasFuncionamiento':me.numeroDiasFuncionamiento,
              'objetivoNumeroActividades':me.objetivoNumeroActividades,
              'objetivoNumeroActividadesMarcadas':me.objetivoNumeroActividadesMarcadas,
              'objetivoNumeroMeses':me.objetivoNumeroMeses,
              'numeroActividadesAlcanzado':me.numeroActividadesAlcanzado,
              'numeroActividadesMarcadasAlcanzado':me.numeroActividadesMarcadasAlcanzado,
              'numeroMesesAlcanzado':me.numeroMesesAlcanzado,
              'importeJustificadoPersonal':me.importeJustificadoPersonal,
              'importeJustificadoDietas':me.importeJustificadoDietas
              
              
                  
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


