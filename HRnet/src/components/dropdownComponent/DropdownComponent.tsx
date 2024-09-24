import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import './dropdown.css';

const Dropdown = ({ options, onSelect, required }) => {
  // État pour suivre si le menu déroulant est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false); 
  
   // État pour stocker l'option sélectionnée
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);// Inverser l'état d'ouverture (ouvrir si fermé, fermer si ouvert)
  };

  const handleSelect = (option) => {
    setSelectedOption(option); // Met à jour l'option sélectionnée
    setIsOpen(false); // Ferme la liste après sélection
    onSelect(option); // Appeler la fonction  passée en prop pour informer le parent de la sélection
  };

  return (
    <div className="dropdown-container">
    
    <div className="dropdown" onClick={handleToggle}>
      <div className="dropdown-selected">
        {selectedOption ? selectedOption.name : 'Select a state'}
      </div>
      <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>&#9662;</span>
    </div>

    {isOpen && (
      <ul className="dropdown-menu">
        {options.map((option, index) => (
          <li key={index} onClick={() => handleSelect(option)}>
            {option.name}
          </li>
        ))}
      </ul>
    )}

  </div>
);
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired, // options doit être un tableau de chaînes de caractères
  onSelect: PropTypes.func.isRequired,                    // onSelect doit être une fonction
};

export default Dropdown;
