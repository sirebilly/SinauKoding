import Book from "./Book"
import baseEntity from "./BaseEntity";
import User from "./User";
import { Deserialize, deserialize, deserializeAs, inheritSerialization, serialize, serializeAs } from "cerialize";

enum Status{
    BORROWED = "BORROWED",
    RETURNED = "RETURNED",
}

@inheritSerialization(baseEntity)
export default class Loan extends baseEntity{
    @serializeAs(Book)
    @deserializeAs(Book)
    public book:Book = new Book();

    @deserialize
    public duration:number = 0;

    @deserialize
    public loanDate:Date = new Date();

    @deserialize
    public numberIdentity:number = 0;

    @deserialize
    public returnDate:Date = new Date();

    @serialize
    @deserialize
    public status:Status = Status.BORROWED;

    @deserialize
    public typeIdentity:string = "";

    @deserialize
    public user:User = new User();
}