import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip_code: '' });
  const [contacts, setContacts] = useState([{ contact_method: '', value: '' }]);

  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const addContactField = () => {
    setContacts([...contacts, { contact_method: '', value: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const employee = { name, address, contacts };
    axios.post('https://api.cosmocloud.io/employees', employee)
      .then(() => alert('Employee added successfully'))
      .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <h3>Address</h3>
          <label>Line 1: </label>
          <input type="text" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} required />
          <label>City: </label>
          <input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
          <label>Country: </label>
          <input type="text" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} required />
          <label>Zip Code: </label>
          <input type="text" value={address.zip_code} onChange={e => setAddress({ ...address, zip_code: e.target.value })} required />
        </div>
        <div>
          <h3>Contact Methods</h3>
          {contacts.map((contact, index) => (
            <div key={index}>
              <label>Contact Method: </label>
              <select value={contact.contact_method} onChange={e => handleContactChange(index, 'contact_method', e.target.value)} required>
                <option value="">Select</option>
                <option value="EMAIL">Email</option>
                <option value="PHONE">Phone</option>
              </select>
              <label>Value: </label>
              <input type="text" value={contact.value} onChange={e => handleContactChange(index, 'value', e.target.value)} required />
            </div>
          ))}
          <button type="button" onClick={addContactField}>Add Another Contact Method</button>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
