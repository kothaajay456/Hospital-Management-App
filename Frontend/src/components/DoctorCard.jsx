// src/components/DoctorCard.js

import React from 'react';
import './DoctorCard.css';
const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="doctor-card">
      <p>
        <strong>{doctor.name}</strong> - {doctor.specialty}
      </p>
      <div className="btn-container">
        <button onClick={() => onEdit(doctor)}>Edit</button>
        <button onClick={() => onDelete(doctor._id)}>Delete</button>
      </div>
    </div>
  );
};

export default DoctorCard;
