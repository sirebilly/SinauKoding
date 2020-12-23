<template>
    <div v-if="status=='login'" class="login">
        <SignIn @go-regis="SwitchRegis" @auth="doSubmit" :user="this.user"/>
    </div>
    <div v-else-if="status=='register'" class="register">   
        <Regis @go-login="SwitchLogin" @regist="doSubmit" :user="this.user"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {get} from 'lodash'
import SignIn from '@/components/SignIn.vue'
import Regis from '@/components/Register.vue'
import User from '@/entity/User'
import StatusCode from '@/common/StatusCodes'
import Session from '@/common/Session'
import axios, { AxiosResponse, AxiosError } from 'axios'


@Component({
    components:{
        SignIn, 
        Regis,
    },
})

export default class LoginView extends Vue {
    protected status:'login'|'register' ='login';
    public user:User = new User();
    public SwitchRegis():void{
        this.status = 'register';
        this.doReset();
    }
    public SwitchLogin():void{
        this.status = 'login';
        this.doReset();
    }
    public doReset():void{
        this.user = new User();
    }

    public doSubmit(){
        console.log(this.user)
        let valid:boolean = this.user.username != "" && this.user.password != "";
        if (this.status == 'register'){
            valid = valid && this.user.profileName != "";
        }
        if (valid){
            const baseURL:string = "http://202.152.159.164:8088/perpus/";
            const url:string = `${baseURL}auth/${(this.status=='register') ? 'do-register' : 'do-login'}`;

            axios.post(url, this.user.serialize(), {responseType: 'json'}).then((response: AxiosResponse)=> {
                console.log(response);
                let st_code:StatusCode = get(response, "data.status");
                if(st_code === StatusCode.SAVE_SUCCESS){
                    this.status='login'   
                }
                if(st_code === StatusCode.LOGIN_SUCCESS){
                    //Set session User
                    Session.set(response.data.data);
                    this.$router.push('/home');
                }
                //notify

                // console.log(response.data.data)
                this.$notify({
                    group: 'StatusCodes', 
                    text: st_code === StatusCode.SAVE_SUCCESS ? "User Created" : "Logged in"
                })
            })
            .catch((error: AxiosError) => {
                console.error(error);

            })
            .finally(()=>{
                //do something
            });
        }
            
    }
    protected mounted(){
        // console.log(this.user);
        this.doReset();
    }
}
</script>