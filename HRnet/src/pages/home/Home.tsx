import { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import React from "react";
import './style.css';
import DropdownComponent from "../../components/dropdownComponent/DropdownComponent";
import { states } from "../../datas/states";
import { departments } from "../../datas/departments";


export default function Home() {
  // Initialise l'état avec un objet de type IEmployee ou null
  const [employee, setEmployee] = useState<IEmployee | null>(null);

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

  // Fonction pour créer ou traiter l'employé
  const createEmployee = () => {
    if (employee) {
      console.log(employee);
    }
  };

// useEffect(()=>{
// console.log(employee)
// },[employee])


  return (
  <div className="container">
    <form action="#"  id="create-employee">
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

      <label htmlFor="date-of-birth">Date of Birth</label>
      <input
        id="date-of-birth"
        type="date"
        onChange={(e) => {
          if (employee) {
            setEmployee({
              ...employee,
              BirthDate: new Date(e.target.value)
            });
          }
        }}
        value={employee ? employee?.BirthDate?.toISOString().split("T")[0] : ""} 
      />

      <label htmlFor="start-date">Start Date</label>
      <input
        id="start-date"
        type="date"
        onChange={(e) => {
          if (employee) {
            setEmployee({
              ...employee,
              StartDate: new Date(e.target.value)
            });
          }
        }}
        value={employee ? employee?.StartDate?.toISOString().split("T")[0] : ""}
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

        
        {/* <select
          name="state"
          id="state"
          onChange={(e) => {
            if (employee) {
              setEmployee({
                ...employee,
                Adress: {
                  ...employee.Adress,
                  State: e.target.value,
                },
              });
            }
          }}
          value={employee?.Adress?.State || ""}
        >
          {states.map((state) => (
            <option key={state.abbreviation} value={state.name}>
              {state.name}
            </option>
          ))}
        </select> */}
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
      <button type="button" onClick={createEmployee}>TEST</button>
    </form>
  </div>
  );
}

