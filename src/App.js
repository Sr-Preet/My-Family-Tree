import React, { useState, useEffect } from 'react';
import FamilyTree from './components/FamilyTree';
import Modal from './components/Modal';
import PersonForm from './components/PersonForm';
import familyDataJson from './data/familyData.json';
import './App.css';

function App() {
  const [familyData, setFamilyData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'delete'
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [parentPerson, setParentPerson] = useState(null);

  useEffect(() => {
    // Load family data from JSON file
    setFamilyData(familyDataJson);
  }, []);

  const findPersonById = (data, id) => {
    if (data.id === id) return data;
    
    if (data.children) {
      for (let child of data.children) {
        const found = findPersonById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentById = (data, id, parent = null) => {
    if (data.id === id) return parent;
    
    if (data.children) {
      for (let child of data.children) {
        if (child.id === id) return data;
        const found = findParentById(child, id, data);
        if (found) return found;
      }
    }
    return null;
  };

  const updateFamilyData = (newData) => {
    setFamilyData({ ...newData });
    // In a real app, you would save this to a backend or localStorage
    console.log('Updated family data:', newData);
  };

  const handleAddPerson = (parentId) => {
    const parent = findPersonById(familyData, parentId);
    setParentPerson(parent);
    setSelectedPerson(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditPerson = (personId) => {
    const person = findPersonById(familyData, personId);
    setSelectedPerson(person);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeletePerson = (personId) => {
    setSelectedPerson(findPersonById(familyData, personId));
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (modalMode === 'add') {
      addNewPerson(formData);
    } else if (modalMode === 'edit') {
      editPerson(formData);
    } else if (modalMode === 'delete') {
      deletePerson();
    }
    setIsModalOpen(false);
  };

  const addNewPerson = (formData) => {
    const newPerson = {
      id: `person_${Date.now()}`,
      name: formData.name,
      gender: formData.gender,
      status: formData.status,
      children: []
    };

    const updatedData = { ...familyData };
    const parent = findPersonById(updatedData, parentPerson.id);
    
    if (formData.relationship === 'child') {
      parent.children.push(newPerson);
    }

    updateFamilyData(updatedData);
  };

  const editPerson = (formData) => {
    const updatedData = { ...familyData };
    const person = findPersonById(updatedData, selectedPerson.id);
    
    person.name = formData.name;
    person.gender = formData.gender;
    person.status = formData.status;

    updateFamilyData(updatedData);
  };

  const deletePerson = () => {
    if (selectedPerson.id === familyData.id) {
      alert("Cannot delete the root person of the family tree");
      return;
    }

    const updatedData = { ...familyData };
    const parent = findParentById(updatedData, selectedPerson.id);
    
    if (parent) {
      parent.children = parent.children.filter(child => child.id !== selectedPerson.id);
    }

    updateFamilyData(updatedData);
  };

  if (!familyData) {
    return <div className="loading">Loading family tree...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Family Tree</h1>
        <p>Hover over family members to see options</p>
      </header>
      
      <div className="family-tree-container">
        <FamilyTree
          data={familyData}
          onAddPerson={handleAddPerson}
          onEditPerson={handleEditPerson}
          onDeletePerson={handleDeletePerson}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PersonForm
          mode={modalMode}
          person={selectedPerson}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;