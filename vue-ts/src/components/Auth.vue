<template> 
    <div class="auth">
        <table>
            <tr>
                <td>
                    <label for="username">Username:</label>
                </td>
                <td>
                    <input type="text" name="username" id="username">
                </td>
            </tr>
            <tr>
                <td>
                    <label for="password">Password:</label>
                </td>
                <td>
                    <input type="password" name="password" id="password">
                </td>
            </tr>
            <tr>
                <button @click="test">Login</button>
            </tr>
            <tr> 
                <a href="/register">Register</a>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

export default{
    name: 'Auth',
    methods:{
        test: function (){
            let logged_in:boolean = true;
            localStorage.logged_in =  logged_in;
            window.location.href = '/';
        }
    },
}
</script>