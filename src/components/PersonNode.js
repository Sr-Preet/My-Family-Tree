import React, { useState } from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import './PersonNode.css';

const PersonNode = ({
  person,
  onAddPerson,
  onEditPerson,
  onDeletePerson,
  isCollapsed,
  onToggleCollapse
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusDisplay = () => {
    return person.status === 'deceased' ? '(D)' : '';
  };

  return (
    <div
      className={`person-node ${person.gender} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={person.children && person.children.length > 0 ? onToggleCollapse : undefined}
    >
      <div className="person-info">
        <div className="person-avatar">
          {person.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="person-details">
          <h3 className="person-name">{person.name} {getStatusDisplay()}</h3>
          <p className="person-gender">{person.gender}</p>
          <p className="person-status">{person.status}</p>
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

          {/* Only show Add Child for living individuals */}
          {person.status !== 'deceased' && (
            <button
              className="action-btn add-child"
              onClick={() => onAddPerson(person.id)}
              title="Add Child"
            >
              <UserPlus size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonNode;