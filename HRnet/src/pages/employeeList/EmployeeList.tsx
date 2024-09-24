import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./employeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Récupérer les données du localStorage
    const storedEmployee = localStorage.getItem("HRnet-Employees-List");
    if (storedEmployee) {
      try {
        const parsedEmployee = JSON.parse(storedEmployee);

        // Vérifier si c'est un objet (un seul employé) ou un tableau
        if (Array.isArray(parsedEmployee)) {
          setEmployees(parsedEmployee);
        } else {
          // Si c'est un objet (un seul employé), le transformer en tableau
          setEmployees([parsedEmployee]);
        }
      } catch (error) {
        console.error("Erreur lors du parsing des données stockées:", error);
      }
    }
  }, []);

  const columns = [
    { name: "First Name", selector: (row) => row.FirstName, sortable: true },
    { name: "Last Name", selector: (row) => row.LastName, sortable: true },
    { name: "Date of Birth", selector: (row) => new Date(row.BirthDate).toLocaleDateString(), sortable: true },
    { name: "Start Date", selector: (row) => new Date(row.StartDate).toLocaleDateString(), sortable: true },
    { name: "Street", selector: (row) => row.Adress.Street, sortable: true },
    { name: "City", selector: (row) => row.Adress.City, sortable: true },
    { name: "State", selector: (row) => row.Adress.State, sortable: true },
    { name: "Zip Code", selector: (row) => row.Adress.ZipCode, sortable: true },
    { name: "Department", selector: (row) => row.Departement, sortable: true },
  ];

// regrouper toutes les valeurs de l'employé dans une seule chaîne et vérifier si le texte de recherche y est inclus.
  const filteredData = employees.filter(employee => {
    // convertir les dates stockées en chaînes de caractères:
    const formattedBirthDate = new Date(employee.BirthDate).toLocaleDateString();
    const formattedStartDate = new Date(employee.StartDate).toLocaleDateString();
    const employeeData = `
    ${employee.FirstName} ${employee.LastName} ${employee.Departement} 
    ${employee.Adress.Street} ${employee.Adress.City} ${employee.Adress.State} ${employee.Adress.ZipCode}
  `.toLowerCase();

  return (
  employeeData.includes(searchText.toLowerCase())||
  formattedBirthDate.includes(searchText) ||  // Comparaison avec la date de naissance
  formattedStartDate.includes(searchText)     // Comparaison avec la date de début
    );
  });


  return (
    <div>
        <input
        type="text"
        placeholder="Search in all fields"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="search"
      />
      <DataTable
        columns={columns} // Afficher les colonnes définies
        data={filteredData} // Utiliser les données parsées dans le tableau
        pagination
        noDataComponent={<div style={{ textAlign: 'center', padding: '10px' }}>No data available</div>} // Message personnalisé
      />
    </div>
  );
}

export default EmployeeList;
