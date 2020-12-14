import {Role} from './Role' 

interface User {
    id:number;
    name:string;
}

export default abstract class BaseUser implements User {
    public id : number = 0;
    public name : string = '';
    protected abstract role : Role;
}