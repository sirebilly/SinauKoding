import { Role } from './Role'
import BaseUser from './BaseUser'

export default class Admin extends BaseUser{
    public nip : number = 1;
    protected role : Role = Role.ADMIN;
}
