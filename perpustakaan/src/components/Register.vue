<template>
    <div class="register w-25">
        <div class="card">
            <div class="card-header">
                <h5 id="cardHeader">Register</h5>
                <button type="button" class="btn btn-primary" @click="$emit('go-login')" id="SignInButton">Login</button>
            </div>
            <div class="card-content">
                <input type="text" name="Name" id="name" placeholder="Name"><br>
                <input type="text" name="username" id="username" placeholder="Username"><br>
                <input type="text" name="address" id="address" placeholder="Address"><br>
                <input type="password" name="password" id="password" placeholder="Password"><br>
                <button class="btn btn-outline-primary" id="btn-login" @click="Regist()">Register</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import User from '@/entity/User'

@Component
export default class Regis extends Vue {
    @Prop() public user!:User;  
    public Regist(){
        console.log(this.user);
        let uname = document.getElementById('username') as HTMLInputElement;
        let passwd = document.getElementById('password') as HTMLInputElement;
        let addr = document.getElementById('address') as HTMLInputElement
        let name = document.getElementById('name') as HTMLInputElement

        this.user.username = uname.value;
        this.user.password = passwd.value;
        this.user.profileName = name.value;
        this.user.address = addr.value;

        console.log(this.user);
        this.$emit('regist');
    }
}

</script>

<style scoped>
button#SignInButton {
    float: right;
}   
h5#cardHeader {
    display: inline-block;
    padding-top: 6px;
}

.register{
    margin:auto;
    padding-top: 150px;
}

.card-content{
    margin-top: 10px;
}
input#username, input#password, input#address, input#name, button#btn-login{
    margin-top: 15px;
}
button#btn-login{
    margin-bottom: 10px;
}


</style>