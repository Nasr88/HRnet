import { IEmployee } from "../models/IEmployee";

export class storageManagement {

    storage_key :string = "HRnet-Employees-List";

    addEmployee = (employee: IEmployee): any => {
        const storedEmployees = localStorage.getItem(this.storage_key);
    
        // Vérifier si des employés existent déjà dans localStorage
        if (storedEmployees) {
            try {
                // Récupérer et parser les employés existants
                const Employees = JSON.parse(storedEmployees) as IEmployee[] || [];
    
                // S'assurer que "Employees" est bien un tableau
                if (Array.isArray(Employees)) {
                    // Ajouter le nouvel employé au tableau sans écraser les anciens
                    Employees.push(employee);
                    localStorage.setItem(this.storage_key, JSON.stringify(Employees));
                } else {
                    // Si pour une raison quelconque "Employees" n'est pas un tableau, on le réinitialise
                    localStorage.setItem(this.storage_key, JSON.stringify([employee]));
                }
            } catch (error) {
                console.error("Erreur lors de la récupération ou du parsing des employés:", error);
                // Si une erreur survient, réinitialiser avec un tableau contenant le nouvel employé
                localStorage.setItem(this.storage_key, JSON.stringify([employee]));
            }
        } else {
            // Si aucun employé n'existe, créer un tableau avec le premier employé
            localStorage.setItem(this.storage_key, JSON.stringify([employee]));
        }
    }
    
    
     getEmployeeList = () : IEmployee[] =>{
       return JSON.parse (localStorage.getItem(this.storage_key)) as IEmployee[]
    }

}