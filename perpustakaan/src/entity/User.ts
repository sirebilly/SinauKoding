import {deserialize, inheritSerialization, serialize} from "cerialize"

import baseEntity from '@/entity/BaseEntity'
import {Role} from '@/common/Role'

@inheritSerialization(baseEntity)
export default class User extends baseEntity {
    @serialize
    @deserialize
    public username:string = "";

    @serialize
    @deserialize
    public password:string = "";

    @serialize
    @deserialize
    public profileName:string = "";

    @serialize
    @deserialize
    public address:string = "";
    
    @serialize
    @deserialize
    public role:Role = Role.USER;
    
    @serialize
    @deserialize
    public token:string = "";

    public get isAdmin(){
        return this.role === Role.ADMIN;
    }
}