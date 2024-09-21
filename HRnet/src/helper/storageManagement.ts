import { IEmployee } from "../models/IEmployee";

export class storageManagement {

    storage_key :string = "HRnet-Employees-List";

     addEmployee = (employee : IEmployee) : any => {
        
        if(localStorage.getItem(this.storage_key))
        {
            const  Employees = JSON.parse(localStorage.getItem(this.storage_key)) as IEmployee[]
            localStorage.setItem(this.storage_key,JSON.stringify([...Employees,employee]));

        }
        else
        localStorage.setItem(this.storage_key,JSON.stringify(employee));
       
    }
     getEmployeeList = () : IEmployee[] =>{
       return JSON.parse (localStorage.getItem(this.storage_key)) as IEmployee[]
    }

}