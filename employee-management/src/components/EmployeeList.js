import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://api.cosmocloud.io/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`https://api.cosmocloud.io/employees/${id}`)
      .then(() => setEmployees(employees.filter(employee => employee.id !== id)))
      .catch(error => console.error('Error deleting employee:', error));
  };

  return (
    <div className="container">
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul className="employee-list">
          {employees.map(employee => (
            <li key={employee.id} className="employee-item">
              {employee.name} ({employee.emp_id})
              <div>
                <Link to={`/employee/${employee.id}`}>Details</Link>
                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add" className="add-employee-link">Add Employee</Link>
    </div>
  );
};

export default EmployeeList;
