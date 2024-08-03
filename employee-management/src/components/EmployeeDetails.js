import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`https://api.cosmocloud.io/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error('Error fetching employee:', error));
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <div className="details">
        <p>Name: {employee.name}</p>
        <p>Employee ID: {employee.emp_id}</p>
        <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip_code}</p>
        <div className="contact-methods">
          <h2>Contact Methods</h2>
          <ul>
            {employee.contacts.map((contact, index) => (
              <li key={index}>{contact.contact_method}: {contact.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
