const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { patientName, doctorName, datetime } = req.body;
    const newAppointment = new Appointment({ patientName, doctorName, datetime: new Date(datetime) });
    const saved = await newAppointment.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json('Appointment not found');

    appointment.patientName = req.body.patientName;
    appointment.doctorName = req.body.doctorName;
    appointment.datetime = new Date(req.body.datetime);
    await appointment.save();
    res.json('Appointment updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json('Appointment deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
