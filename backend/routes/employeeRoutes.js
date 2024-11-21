const express = require('express');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send( 'Unauthorized' );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send('Invalid token' );
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send( 'Access denied' );
  }
  next();
};

// Get All Employees
router.get('/', authenticate, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message );
  }
});

// Create Employee
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  const { name, designation, location, salary } = req.body;

  try {
    const newEmployee = new Employee({ name, designation, location, salary });
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (error) {
    res.status(400).send( error.message );
  }
});

// Update Employee-http://localhost:3000/api/employees/id
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).send( 'Employee not found' );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Employee
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return res.status(404).send('Employee not found' );
    res.send( 'Employee deleted successfully' );
  } catch (error) {
    res.status(400).send( error.message );
  }
});

module.exports = router;
