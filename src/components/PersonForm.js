import React, { useState, useEffect } from 'react';
import './PersonForm.css';

const PersonForm = ({ mode, person, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    status: 'alive',
    relationship: 'child'
  });

  useEffect(() => {
    if (mode === 'edit' && person) {
      setFormData({
        name: person.name || '',
        gender: person.gender || 'male',
        status: person.status || 'alive',
        relationship: 'child'
      });
    }
  }, [mode, person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'delete') {
      onSubmit();
      return;
    }

    if (!formData.name.trim()) {
      alert('Please enter a name');
      return;
    }

    onSubmit(formData);
  };

  const getTitle = () => {
    switch (mode) {
      case 'add': return 'Add New Family Member';
      case 'edit': return 'Edit Family Member';
      case 'delete': return 'Delete Family Member';
      default: return 'Family Member';
    }
  };

  if (mode === 'delete') {
    return (
      <div className="person-form">
        <h2>{getTitle()}</h2>
        <p>Are you sure you want to delete <strong>{person?.name}</strong>?</p>
        <p className="warning">This action cannot be undone and will also remove all descendants.</p>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="person-form">
      <h2>{getTitle()}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
          </select>
        </div>

        {mode === 'add' && (
          <div className="form-group">
            <label htmlFor="relationship">Add as</label>
            <select
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
            >
              <option value="child">Child</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {mode === 'add' ? 'Add' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;