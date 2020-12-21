import {deserialize, serialize, Deserialize, Serialize } from 'cerialize'
import * as lodash from 'lodash'
import { isArray, isObject, isObjectLike } from 'lodash';


export default abstract class baseEntity {
    @serialize
    @deserialize
    public id:number = 0;

    public serialize(){
        return Serialize(this);
    }

    public static instanceFrom(param:any){
        return Deserialize(param, this);
    }
    public static OnSerialized(instance: baseEntity, json:any){
        baseEntity.OnNormalize(json)
    }
    public static OnDeserialized(instance: baseEntity, json:any){
        baseEntity.OnNormalize(instance)
    }

    public static OnNormalize(param:Object){
        const invalid: Function = (p: any) => {
            if(lodash.isString(p)|| lodash.isObject(p) && !lodash.isDate(p)){
                return lodash.isEmpty(p);
            }

            if(lodash.isNumber(p)){
                return p <= 0;
            }

            return lodash.isNil(p);
        }
        const parse: any = (p: any)=> {
            if(!invalid(p)){
                Object.keys(p).forEach((k: string) => {
                    if(invalid(p[k])){
                        delete p[k];
                    }
                    else if(isArray(p[k])){
                        p[k]= p[k].map(parse);
                    }
                    else if(isObject(p[k])){
                        p[k] = parse(p[k]);
                    }
                })
            }
            return p;
        }
        return Array.isArray(param) ? param.map(parse) : parse(param);
    }
}