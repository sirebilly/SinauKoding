<template>
    <div v-if="status=='login'" class="login">
        <SignIn @go-regis="SwitchRegis"/>
    </div>
    <div v-else-if="status=='register'" class="register">   
        <Regis @go-login="SwitchLogin"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SignIn from '@/components/SignIn.vue'
import Regis from '@/components/Register.vue'

@Component({
    components:{
        SignIn, 
        Regis,
    },
})

export default class LoginView extends Vue {
    protected status:'login'|'register' ='login';
    
    public SwitchRegis():void{
        this.status = 'register'
    }
    public SwitchLogin():void{
        this.status = 'login'
    }
}
</script>