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
import {get} from 'lodash'
import SignIn from '@/components/SignIn.vue'
import Regis from '@/components/Register.vue'
import User from '@/entity/User'
import StatusCode from '@/common/StatusCodes'
import axios, { AxiosResponse, AxiosError } from 'axios'


@Component({
    components:{
        SignIn, 
        Regis,
    },
})

export default class LoginView extends Vue {
    protected status:'login'|'register' ='login';
    protected user: User = new User();
    public SwitchRegis():void{
        this.status = 'register'
    }
    public SwitchLogin():void{
        this.status = 'login'
    }

    public doSubmit(){
        let valid:boolean = this.user.username != "" && this.user.password != "";
        if (this.status == 'register'){
            valid = valid && this.user.profileName != "";
        }
        if (valid){
            const baseURL:string = "http://202.152.159.164:8088/perpus/";
            const url:string = "${baseURL}auth/${(this.status=='register') ? 'do-register' : 'do-login'}";
            axios.post(url, this.user.serialize(), {responseType: 'json'}).then((response: AxiosResponse)=> {
                let st_code:StatusCode = get(response, "data.status")
                if(st_code === StatusCode.SAVE_SUCCESS){
                    this.$router.push('/');
                }
                if(st_code === StatusCode.LOGIN_SUCCESS){
                    //Set session User
                    this.$router.push('/home');
                }
                //notify
            })
            .catch((error: AxiosError) => {
                console.error(error);

            })
            .finally(()=>{
                //do something
            });
        }    
    }
}
</script>