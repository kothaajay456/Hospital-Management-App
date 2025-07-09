// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  datetime: { type: Date, required: true }, // 👈 Combine date & time
});

module.exports = mongoose.model('Appointment', appointmentSchema);
