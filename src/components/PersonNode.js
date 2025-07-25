import React, { useState } from 'react';
import { UserPlus, Edit, Trash2, Heart } from 'lucide-react';
import './PersonNode.css';

const PersonNode = ({ 
  person, 
  onAddPerson, 
  onEditPerson, 
  onDeletePerson, 
  canAddSpouse, 
  canAddChild 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAge = () => {
    const currentYear = new Date().getFullYear();
    const endYear = person.death_year || currentYear;
    return endYear - person.birth_year;
  };

  const getDisplayYears = () => {
    if (person.death_year) {
      return `${person.birth_year} - ${person.death_year}`;
    }
    return `${person.birth_year} - Present`;
  };

  return (
    <div 
      className={`person-node ${person.gender} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="person-info">
        <div className="person-avatar">
          {person.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="person-details">
          <h3 className="person-name">{person.name}</h3>
          <p className="person-years">{getDisplayYears()}</p>
          <p className="person-age">Age: {getAge()}</p>
        </div>
      </div>

      {isHovered && (
        <div className="person-actions">
          <button
            className="action-btn edit"
            onClick={() => onEditPerson(person.id)}
            title="Edit Person"
          >
            <Edit size={16} />
          </button>
          
          <button
            className="action-btn delete"
            onClick={() => onDeletePerson(person.id)}
            title="Delete Person"
          >
            <Trash2 size={16} />
          </button>

          {canAddChild && (
            <button
              className="action-btn add-child"
              onClick={() => onAddPerson(person.id, 'child')}
              title="Add Child"
            >
              <UserPlus size={16} />
            </button>
          )}

          {canAddSpouse && (
            <button
              className="action-btn add-spouse"
              onClick={() => onAddPerson(person.id, 'spouse')}
              title="Add Spouse"
            >
              <Heart size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonNode;