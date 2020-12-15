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
import Mahasiswa from '../entity/Mahasiswa'
import Admin from '../entity/Admin'
import {Role} from '../entity/Role'

var userlist:any = [];
export default{
    name: 'SinauKoding',
    methods:{
        testClick: function(){
            let id = document.getElementById('user_id') as HTMLInputElement;
            let name = document.getElementById('user_name') as HTMLInputElement;
            let ni = document.getElementById('user_ni') as HTMLInputElement;
            let role = document.getElementById('type') as HTMLSelectElement;
            let user
            if (isNaN(parseInt(ni.value)) || isNaN(parseInt(id.value))){
                alert("ID and NIM/NIP must be a number");
                return;
            }

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
            userlist.push(user);
            localStorage.setItem('user', JSON.stringify(userlist));
            this.$notify({
                group:'foo',
                title:'Success!',
                text:'User added.'
            });
        }
    }, 
    mounted(){
        if(localStorage.user) {
            userlist = JSON.parse(localStorage.getItem('user')!)
        }
        console.log(userlist);
    },
    props:['msg']
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