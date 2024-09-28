import { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import React from "react";
import './style.css';
import DropdownComponent from "../../components/dropdownComponent/DropdownComponent";
import { states } from "../../datas/states";
import { departments } from "../../datas/departments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storageManagement } from '../../helper/storageManagement'; // Importez la classe
import AlertModal from "../../components/alertModal/AlertModal";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeSlice";

 // Instance de la classe storageManagement
 const storage = new storageManagement();



export default function Home() {
  // Initialise l'état avec un objet de type IEmployee ou null
  const [employee, setEmployee] = useState<IEmployee | null>(null);

  const [modalMessage, setModalMessage] = useState(''); 
  
  const dispatch = useDispatch();  // Hook Redux pour dispatcher les actions
  // Fonction pour gérer les changements dans le prénom
  const onChangeFirstName = (e) => {
    
      setEmployee({
        ...employee,
        FirstName: e.target.value
      });
    
  };

  // Fonction pour gérer les changements dans le nom de famille
  const onChangeLastName = (e) => {
    if (employee) {
      setEmployee({
        ...employee,
        LastName: e.target.value
      });
    }
  };

  const onSelectState = (selected)=>{
    
      setEmployee({
        ...employee,
        Adress: {
          ...employee?.Adress,
          State: selected.name
        }
      });
   
  }

  // Fonction pour créer ou ajouter un employé au localStorage
  const createEmployee = (e) => {
    // storage.addEmployee(employee); // Ajoute l'employé au localStorage
    // console.log("Employee saved successfully!");
    // setModalMessage("Employee saved successfully!"); // Affiche la modal
    // e.preventDefault();
    // setEmployee(null);
    e.preventDefault();
    if (employee) {
      dispatch(addEmployee(employee));  // Envoie l'action pour ajouter l'employé au store Redux
      console.log("Employee saved successfully!");
      setModalMessage("Employee saved successfully!");
      setEmployee(null);  // Réinitialise le formulaire
  };
}
  const closeModal = () => {
    setModalMessage(''); // Ferme la modal en effaçant le message
  };

  return (
  <div className="container">
    <form action="#"  id="create-employee" onSubmit= {createEmployee}>
      <label htmlFor="first-name">First Name</label>
      <input
        type="text"
        id="first-name"
        onChange={onChangeFirstName}
        value={employee?.FirstName || ""}
       
      />

      <label htmlFor="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        onChange={onChangeLastName}
        value={employee?.LastName || ""}
        
      />

      <label>Date of Birth</label>
      <DatePicker className="startDate"
        selected={employee?.BirthDate || null}
        onChange={(date: Date) => {
         
             setEmployee({
              ...employee,
              BirthDate: date
            });
          
        }}
        dateFormat="MM/dd/yyyy"
        placeholderText=""
        isClearable={true}
        showMonthDropdown             // Affiche un menu déroulant pour les mois
        showYearDropdown            // Affiche le menu déroulant pour les années
        yearDropdownItemNumber={7}  // Nombre d'années à afficher dans le dropdown
        scrollableYearDropdown      // Permet de rendre le dropdown d'année scrollable
        dropdownMode="select"         // Rend les dropdowns de mois et d'années en mode 'select'
      />

       <label>Start Date</label>
      <DatePicker className="startDate"
        selected={employee?.StartDate || null}
        onChange={(date: Date) => {
            setEmployee({
              ...employee,
              StartDate: date, // Met à jour avec une seule date
            });
        }}
        dateFormat="MM/dd/yyyy"
        placeholderText=""
        isClearable={true}
        showMonthDropdown             // Affiche un menu déroulant pour les mois
        showYearDropdown            // Affiche le menu déroulant pour les années
        yearDropdownItemNumber={7}  // Nombre d'années à afficher dans le dropdown
        scrollableYearDropdown      // Permet de rendre le dropdown d'année scrollable
        dropdownMode="select"         // Rend les dropdowns de mois et d'années en mode 'select'
    /> 

      <fieldset className="address">
        <legend>Address</legend>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={(e) => {
            if (employee) {
              setEmployee({
                ...employee,
                Adress: {
                  ...employee.Adress,
                  Street: e.target.value
                }
              });
            }
          }}
          value={employee?.Adress?.Street || ""}
         
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={(e) => {
            if (employee) {
              setEmployee({
                ...employee,
                Adress: {
                  ...employee.Adress,
                  City: e.target.value
                }
              });
            }
          }}
          value={employee?.Adress?.City || ""}
          
        />

        <label>State</label>
        <DropdownComponent 
          options={states} 
          onSelect={onSelectState} 
        />

<label htmlFor="zip-code">Zip Code</label>
        <input
          id="zip-code"
          type="number"
          onChange={(e) => {
            if (employee) {
              setEmployee({
                ...employee,
                Adress: {
                  ...employee.Adress,
                  ZipCode: e.target.value
                }
              });
            }
          }}
          value={employee?.Adress?.ZipCode || ""}
        />
      </fieldset>

      <label>Department</label>
      <DropdownComponent 
        options={departments} 
        onSelect={(selected) => {
          setEmployee({
            ...employee,
              Departement:selected.name
          });
        }} 
      />
      <button type="submit">Save</button>
      
    </form>
    <AlertModal message={modalMessage} onClose={closeModal} />
  </div>
  );
}

