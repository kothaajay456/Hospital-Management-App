const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/add', async (req, res) => {
  try {
    console.log('Received patient data:', req.body); // ✅ log this
    const { name, age, gender } = req.body;
    const newPatient = new Patient({ name, age, gender });
    const savedPatient = await newPatient.save();
    res.json(savedPatient);
  } catch (err) {
    console.error('Error saving patient:', err); // ✅ log error
    res.status(400).json('Error: ' + err);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json('Patient not found');

    patient.name = req.body.name;
    patient.age = req.body.age;
    patient.gender = req.body.gender;
    await patient.save();
    res.json('Patient updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json('Patient not found');
    res.json('Patient deleted!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
