<template>
    <div class="posts">
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>email</th>
                <th>phone</th>
            </tr>
            <tr v-for="data in jsonData.data" :key="data.id">
                <td>{{ data.id }}</td> 
                <td>{{ data.name }}</td> 
                <td>{{ data.username }}</td> 
                <td>{{ data.email }}</td> 
                <td>{{ data.phone }}</td> 
            </tr>
        </table>
    </div>
</template>

<script lang="ts">

import {Vue, Component, Prop} from 'vue-property-decorator'
import axios from 'axios'
export default{
    name: 'UserApi', 
    data () {
        return {
            jsonData: {},
        }
    }, 
    mounted(){
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                this.jsonData = response;
            })
            .catch(error => {
                console.error(error)
            })
    }
}


</script>