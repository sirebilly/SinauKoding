<template>
    <div class="signin w-25">
        <!-- <button @click="$emit('go-regis')">Register</button> -->
        <div class="card">
            <div class="card-header">
                <h5 id="cardHeader">Sign in</h5>
                <button type="button" class="btn btn-primary" @click="$emit('go-regis')" id="RegisterButton">Register</button>
            </div>
            <div class="card-content">
                <input type="text" name="username" id="username" placeholder="Username"><br>
                <input type="password" name="password" id="password" placeholder="Password"><br>
                <button class="btn btn-outline-primary" id="btn-login" @click="auth()">Login!</button>
            </div>
        </div>
        <!-- <button @click="$router.push('/home')">test</button> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SignIn extends Vue {
    public auth(){

    }
}

</script>

<style scoped>
button#RegisterButton {
    float: right;
}   
h5#cardHeader {
    display: inline-block;
    padding-top: 6px;
}

.signin{
    margin:auto;
}

.card-content{
    margin-top: 10px;
}
input#username, input#password, button#btn-login{
    margin-top: 15px;
}
button#btn-login{
    margin-bottom: 10px;
}


</style>