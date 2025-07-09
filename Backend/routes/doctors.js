const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const newDoctor = new Doctor({ name, specialty });
    const savedDoctor = await newDoctor.save();
    res.json(savedDoctor);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json('Doctor not found');

    doctor.name = req.body.name;
    doctor.specialty = req.body.specialty;
    await doctor.save();
    res.json('Doctor updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json('Doctor not found');
    res.json('Doctor deleted!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get available doctors by datetime
router.get('/available', async (req, res) => {
  try {
    const { datetime } = req.query;
    if (!datetime) return res.status(400).json({ error: 'datetime is required' });

    const booked = await Appointment.find({ datetime: new Date(datetime) });
    const bookedNames = booked.map(a => a.doctorName);
    const available = await Doctor.find({ name: { $nin: bookedNames } });
    res.json(available);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
