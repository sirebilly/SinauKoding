import {Role} from './Role'
import BaseUser from './BaseUser'

export default class Mahasiswa extends BaseUser{
    public nim : number = 1 ;
    protected role : Role = Role.MAHASISWA;
    
}