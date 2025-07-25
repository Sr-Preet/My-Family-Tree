import React from 'react';
import PersonNode from './PersonNode';
import './FamilyTree.css';

const FamilyTree = ({ data, onAddPerson, onEditPerson, onDeletePerson, level = 0 }) => {
  if (!data) return null;

  return (
    <div className={`family-tree level-${level}`}>
      <div className="generation">
        <div className="person-container">
          <PersonNode
            person={data}
            onAddPerson={onAddPerson}
            onEditPerson={onEditPerson}
            onDeletePerson={onDeletePerson}
          />
        </div>
        
        {data.children && data.children.length > 0 && (
          <div className="connection-line"></div>
        )}
      </div>

      {data.children && data.children.length > 0 && (
        <div className="children">
          {data.children.map((child, index) => (
            <div key={child.id} className="child-branch">
              <FamilyTree
                data={child}
                onAddPerson={onAddPerson}
                onEditPerson={onEditPerson}
                onDeletePerson={onDeletePerson}
                level={level + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyTree;