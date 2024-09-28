import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from 'react-redux'; // Importer useSelector
import "./employeeList.css";
import { states } from "../../datas/states";
import { RootState } from '../../redux/store';  // Assure-toi d'importer le bon RootState

function EmployeeList() {
   // Récupérer les employés depuis le Redux store
   const employees = useSelector((state: RootState) => state.employees.employees);
   const [searchText, setSearchText] = useState('');

  const columns = [
    { name: "First Name", selector: (row) => row.FirstName ?? '', sortable: true },
    { name: "Last Name", selector: (row) => row.LastName ?? '', sortable: true },
    { name: "Start Date", selector: (row) => new Date(row.StartDate).toLocaleDateString() ?? '', sortable: true },
    { name: "Department", selector: (row) => row.Departement, sortable: true }, 
    { name: "Date of Birth", selector: (row) => new Date(row.BirthDate).toLocaleDateString() ?? '', sortable: true },
    { name: "Street", selector: (row) => row.Adress?.Street ?? '', sortable: true },
    { name: "City", selector: (row) => row.Adress?.City ?? '', sortable: true },
    { name: "State",  selector: (row) => {
        const state = states.find(s => s.name === row.Adress?.State);
        return state?.abbreviation ?? 'AL'; 
      },
      sortable: true },
    { name: "Zip Code", selector: (row) => row.Adress?.ZipCode ?? '', sortable: true },    
  ];

  // Filtrer les données en fonction du texte de recherche
  const filteredData = employees.filter(employee => {
    const formattedBirthDate = employee?.BirthDate 
      ? new Date(employee.BirthDate).toLocaleDateString() 
      : '';
    const formattedStartDate = employee?.StartDate ? new Date(employee?.StartDate).toLocaleDateString() : '';
    const employeeData = `
      ${employee?.FirstName ?? ''} ${employee?.LastName ?? ''} ${employee?.Departement ?? ''} 
      ${employee?.Adress?.Street ?? ''} ${employee?.Adress?.City ?? ''} 
      ${states.find(s => s.name === employee.Adress?.State)?.abbreviation ?? ''} ${employee?.Adress?.ZipCode ?? ''}
    `.toLowerCase();

    return (
      employeeData.includes(searchText.toLowerCase()) ||
      formattedBirthDate.includes(searchText) || 
      formattedStartDate.includes(searchText)
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
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        noDataComponent={<div style={{ textAlign: 'center', padding: '10px' }}>No data available</div>}
      />
    </div>
  );
}

export default EmployeeList;
