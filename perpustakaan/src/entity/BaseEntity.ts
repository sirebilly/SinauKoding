import {deserialize, serialize, Deserialize, Serialize } from 'cerialize'

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
        console.log('onSerialized', instance, json)
    }
    public static OnDeserialized(instance: baseEntity, json:any){
        
    }
}