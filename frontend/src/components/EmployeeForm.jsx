import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:3000/api/employees',
        { name, designation, location, salary },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then((res) => console.log('Employee added:', res.data))
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;
