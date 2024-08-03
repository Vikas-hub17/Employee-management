import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              {employee.name} ({employee.emp_id})
              <Link to={`/employee/${employee.id}`}>Details</Link>
              <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add">Add Employee</Link>
    </div>
  );
};

export default EmployeeList;
