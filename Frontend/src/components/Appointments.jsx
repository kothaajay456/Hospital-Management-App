import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';
import './AppointmantCard.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);

  // Fetch available doctors when date or time changes
  useEffect(() => {
  const datetime = isEditMode
    ? selectedAppointment?.datetime
    : newAppointment.datetime;

  if (datetime) {
    axios
      .get(`http://localhost:5000/doctors/available`, {
        params: { datetime }
      })
      .then(res => setAvailableDoctors(res.data))
      .catch(err => console.error('Error fetching available doctors:', err));
  }
}, [newAppointment.datetime, selectedAppointment?.datetime]);


  const handleChange = (field, value) => {
    if (isEditMode) {
      setSelectedAppointment(prev => ({ ...prev, [field]: value }));
    } else {
      setNewAppointment(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/appointments/add', newAppointment)
      .then(res => {
        setAppointments([...appointments, res.data]);
        setNewAppointment({ patientName: '', doctorName: '', date: '', time: '' });
      })
      .catch(err => console.error('Error adding appointment:', err));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/appointments/update/${id}`, selectedAppointment)
      .then(res => {
        const updated = { ...selectedAppointment, _id: id };
        setAppointments(appointments.map(app => app._id === id ? updated : app));
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch(err => console.error('Error updating appointment:', err));
  };

  const handleDeleteAppointment = (id) => {
    axios.delete(`http://localhost:5000/appointments/delete/${id}`)
      .then(() => {
        setAppointments(appointments.filter(app => app._id !== id));
      })
      .catch(err => console.error('Error deleting appointment:', err));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  const formData = isEditMode ? selectedAppointment : newAppointment;

  return (
    <div className='flex-row' style={{ width: '100%' }}>
      <div className='flex-column'>
        <div className='add-form'>
          <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
          <form className="appointment-form" onSubmit={(e) => {
            isEditMode
              ? handleUpdateAppointment(selectedAppointment._id, e)
              : handleAddAppointment(e);
          }}>
            <label>Patient Name:</label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
            />

            <input
  type="datetime-local"
  value={isEditMode ? selectedAppointment.datetime : newAppointment.datetime}
  onChange={(e) => {
    const value = e.target.value;
    isEditMode
      ? setSelectedAppointment({ ...selectedAppointment, datetime: value })
      : setNewAppointment({ ...newAppointment, datetime: value });
  }}
/>

            <label>Doctor:</label>
            <select
              value={formData.doctorName}
              onChange={(e) => handleChange('doctorName', e.target.value)}
            >
              <option value="">-- Select Doctor --</option>
              {availableDoctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>

            <button type="submit">
              {isEditMode ? 'Update Appointment' : 'Add Appointment'}
            </button>
          </form>
        </div>
      </div>

      <div className='appointments'>
        <h3>Appointments ({appointments.length})</h3>
        <div className="appointment-list">
          {appointments.map(app => (
            <AppointmentCard
              key={app._id}
              appointment={app}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
