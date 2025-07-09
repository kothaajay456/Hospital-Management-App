import React from 'react';
import './PatientCard.css';

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="patient-card">
      <h4>{patient.name}</h4>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>

      <div className="btn-container" style={{ width: '100%' }}>
        <button onClick={() => onEdit(patient)} aria-label={`Edit ${patient.name}`}>
          Edit
        </button>
        <button onClick={() => onDelete(patient._id)} aria-label={`Delete ${patient.name}`}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
