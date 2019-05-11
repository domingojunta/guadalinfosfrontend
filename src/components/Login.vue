<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-icon color="white">person</v-icon>
                    <v-toolbar-title color="white">
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field autofocus type="text" label="email" required
                    v-model="email">
                    </v-text-field>
                    <v-text-field type="password" label="Contraseña" required
                    v-model="password">
                    </v-text-field>
                    <v-flex class="red--text" v-if="error">
                        <v-icon color="red">error</v-icon>
                        {{error}}
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-flex text-xs-right>
                        <v-btn color="primary" @click="acceder">Acceder</v-btn>
                    </v-flex>
                </v-card-actions>    
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            email:'',
            password:'',
            headers: null,
            token:null,
            error: null
        }
    },
    methods: {
        acceder() {
            let me = this;
            me.error = null;
            axios.post('/login',
                {
                    "nombreUsuario": me.email,
                    "password": me.password
                })
                .then(function(response) {
                    //console.log(response.status);
                    //console.log("Voy a leer los headers...");
                    me.headers = response.headers;
                    me.token = me.headers['authorization'];
                    //console.log("Voy a guardar el token...");
                    me.$store.dispatch("guardarToken", me.token);
                    //console.log("voy a reenviar a home...");
                    me.$router.push({name: 'home'});
                })
                .catch(function(err) {
                        //console.log("Estoy dentro del catch...");
                        me.error ="Los datos introducidos no son correctos...";
                })
                   
                    
        }
    }
}
</script>

