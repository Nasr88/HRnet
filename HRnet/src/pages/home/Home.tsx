import { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import React from "react";
import './style.css';
import DropdownComponent from "../../components/dropdownComponent/DropdownComponent";
import { states } from "../../datas/states";
import { departments } from "../../datas/departments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import {fr} from "date-fns/locale/fr";  // Importe la localisation française
import { storageManagement } from '../../helper/storageManagement'; // Importez la classe
import AlertModal from "../../components/alertModal/AlertModal";
import { differenceInYears } from "date-fns";

 // Instance de la classe storageManagement
 const storage = new storageManagement();

// Enregistre la localisation française
registerLocale("fr", fr);

export default function Home() {
  // Initialise l'état avec un objet de type IEmployee ou null
  const [employee, setEmployee] = useState<IEmployee | null>(null);

  const [modalMessage, setModalMessage] = useState(''); 


  /******************pour vérifier que l'employee a min 18 ans****************/
  const [errorMessage, setErrorMessage] = useState('');

  const handleBirthDateChange = (date) => {
    const today = new Date();
    const age = differenceInYears(today, date);

    // Vérifier si l'âge est inférieur à 18 ans
    if (age < 18) {
      setErrorMessage("L'employé doit avoir au moins 18 ans.");
    } else {
      setErrorMessage(""); // Réinitialiser le message d'erreur s'il a plus de 18 ans
      setEmployee({
        ...employee,
        BirthDate: date
      });
    }
  };
/*******************************************************************************/
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

  // Fonction pour créer ou ajouter un employé au localStorage
  const createEmployee = () => {
    storage.addEmployee(employee); // Ajoute l'employé au localStorage
    console.log("Employee saved successfully!");
    setModalMessage("Employee saved successfully!"); // Affiche la modal
    setEmployee(null);
  };

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
        required
      />

      <label htmlFor="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        onChange={onChangeLastName}
        value={employee?.LastName || ""}
        required
      />

      <label>Date of Birth</label>
      <DatePicker className="startDate"
        selected={employee?.BirthDate || null}
        onChange={handleBirthDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Sélectionner une date"
        isClearable={true}
        locale="fr"  // Applique la localisation française
        required
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
        dateFormat="dd/MM/yyyy"
        placeholderText="Sélectionner une date"
        isClearable={true}
        locale="fr"  // Applique la localisation française
        required
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
          required
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
          required
        />

        <label>State</label>
        <DropdownComponent 
        options={states} 
        onSelect={(selected) => {
          setEmployee({
            ...employee,
            Adress: {
              ...employee?.Adress,
              State: selected.name
            }
          });
        }} 
        required={true}
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
        required={true}
      />
      <button type="submit">Save</button>
      
    </form>
    <AlertModal message={modalMessage} onClose={closeModal} />
  </div>
  );
}

