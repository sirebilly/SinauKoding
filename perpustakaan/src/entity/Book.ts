import { inheritSerialization, serialize, deserialize } from "cerialize";
import baseEntity from "./BaseEntity";

@inheritSerialization(baseEntity)
export default class Book extends baseEntity{
    @serialize
    @deserialize
    public title : string = "";

    @serialize
    @deserialize
    public author : string = "";

    @serialize
    @deserialize
    public description: string = "";

    @serialize
    @deserialize
    public isbn: string = "";

    @serialize
    @deserialize
    public publisher: string = "";
}
    