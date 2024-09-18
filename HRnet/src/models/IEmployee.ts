import  {IAddress}  from "./IAddress";

export  interface IEmployee {
    FirstName:string;
    LastName:string;
    BirthDate:Date;
    StartDate:Date;
    Adress:IAddress;
    Departement:string;
}