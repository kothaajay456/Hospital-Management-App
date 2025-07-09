// models/Patient.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    // Add more fields as needed
});
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;