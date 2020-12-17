import {get} from 'lodash';
import User from '@/entity/User';

export default class Session {
    private static KEY: string = "session";

    public static set(user :User){
        window.sessionStorage.setItem(Session.KEY, JSON.stringify(user));
    }

    public static get(key?: keyof User){
        const session:string | null = window.sessionStorage.getItem(Session.KEY);

        if(session){
            const user:User = User.instanceFrom(JSON.parse(session));
            
            if(user){
                if(key){
                    return user.hasOwnProperty(key) ? user[key] : null;
                }
                return User.instanceFrom(JSON.parse(session));
            }
        }
        return null;
    }

    public static isLoggedIn(){
        const user:User = Session.get();
        return user instanceof User && user.id > 0 && user.token.length > 10;
    }
}