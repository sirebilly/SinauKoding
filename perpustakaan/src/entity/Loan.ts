import Book from "./Book"
import baseEntity from "./BaseEntity";
import User from "./User";
import { deserialize, inheritSerialization, serialize } from "cerialize";

enum Status{
    BORROWED = "BORROWED",
    RETURNED = "RETURNED",
}

@inheritSerialization(baseEntity)
export default class Loan extends baseEntity{
    @serialize
    @deserialize
    public book:Book = new Book();

    @serialize
    @deserialize
    public duration:number = 0;

    @serialize
    @deserialize
    public loanDate:Date = new Date();

    @serialize
    @deserialize
    public numberIdentity:number = 0;

    @serialize
    @deserialize
    public returnDate:Date = new Date();

    @serialize
    @deserialize
    public status:Status = Status.BORROWED;

    @serialize
    @deserialize
    public typeIdentity:string = "";

    @serialize
    @deserialize
    public user:User = new User();
}