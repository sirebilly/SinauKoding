<template>
    <div class="SinauKoding">
        <h1>{{msg}}</h1>
            <table>
                <tr>
                    <td><label> id :</label></td>
                    <td><input type="text" name="user_id" id="user_id" placeholder="User ID"></td>
                </tr>
                <tr>
                    <td><label> Name :</label></td>
                    <td><input type="text" name="user_name" id="user_name" placeholder="User Name"></td>
                </tr><tr>
                    <td><label> NIP/NIM :</label></td>
                    <td><input type="text" name="user_ni" id="user_ni" placeholder="NIP/NIM"></td>
                </tr>
                <tr> 
                    <td><label> Type :</label></td>
                    <td><select name="type" id="type">
                            <option value="ADMIN">Admin</option>
                            <option value="MAHASISWA">Mahasiswa</option>
                            <option value="DOSEN" disabled hidden>Dosen</option>
                        </select>
                    </td>

                </tr>
                <tr> 
                    <td> <button @click="testClick">Test</button> </td>
                </tr>
            </table>
            <!-- <p> {{data}} </p> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator'

interface User {
    id:number;
    name:string;
}

enum Role {
    ADMIN = 'ADMIN', 
    MAHASISWA = 'MAHASISWA',
    DOSEN = 'DOSEN',
}

abstract class BaseUser implements User {
    public id : number = 0;
    public name : string = '';
    protected abstract role : Role;
}

class Mahasiswa extends BaseUser{
    public nim : number = 1 ;
    protected role : Role = Role.MAHASISWA;
    
}

class Admin extends BaseUser{
    public nip : number = 1;
    protected role : Role = Role.ADMIN;
}

export default{
    name: 'SinauKoding',
    methods:{
        testClick: function(){
            let id = document.getElementById('user_id') as HTMLInputElement;
            let name = document.getElementById('user_name') as HTMLInputElement;
            let ni = document.getElementById('user_ni') as HTMLInputElement;
            let role = document.getElementById('type') as HTMLSelectElement;
            let user
            if (role.value == 'ADMIN' ){
                user = new Admin();
                user.id= parseInt(id.value);
                user.name = name.value;
                user.nip = parseInt(ni.value);
            }else if(role.value == 'MAHASISWA'){
                user = new Mahasiswa();
                user.id= parseInt(id.value);
                user.name = name.value;
                user.nim = parseInt(ni.value);
            }
            else{
                alert("Role not valid!");
                return;
            }

            console.log(user)
        }
    }, 
    props:['msg'],    
}

</script>

<style lang="scss" scoped>
label{
    float: right;
}
div#example{
    display: block;
}
</style>