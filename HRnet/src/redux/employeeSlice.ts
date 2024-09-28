// src/redux/employeeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../models/IEmployee';

interface EmployeeState {
  employees: IEmployee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Action pour ajouter un employé
    addEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.employees.push(action.payload);
    },
      // Action pour définir tous les employés (utile lors d'une récupération d'API ou du localStorage)
      setEmployees: (state, action: PayloadAction<IEmployee[]>) => {
        state.employees = action.payload;
      },
  },
});

// Exporter les actions
export const { addEmployee, setEmployees } = employeeSlice.actions;
// Exporter le reducer
export default employeeSlice.reducer;
