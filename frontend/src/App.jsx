import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  
  return (
    <div>
      {!isLoginPage && <Navbar/>}
    
      <Routes>
        <Route path="/" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-employee" element={<EmployeeForm />} />
      </Routes>
    
    </div>
  );
}

export default App;
