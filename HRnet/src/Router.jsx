import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import EmployeeList from "./pages/employeeList/EmployeeList";

function Router() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/employee-list" element={<EmployeeList />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
}

export default Router;