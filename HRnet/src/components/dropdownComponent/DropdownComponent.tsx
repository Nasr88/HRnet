import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); //Gérer l'état d'ouverture/fermeture du dropdown
  const [selectedOption, setSelectedOption] = useState(null);// Stocker l'option sélectionnée

  const handleToggle = () => {
    setIsOpen(!isOpen);// Inverser l'état d'ouverture (ouvrir si fermé, fermer si ouvert)
  };

  const handleSelect = (option) => {
    setSelectedOption(option); // Met à jour l'option sélectionnée
    setIsOpen(false); // Ferme la liste après sélection
    onSelect(option); // Appeler la fonction  passée en prop pour informer le parent de la sélection
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
        {selectedOption || 'Select an option'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option.abreviation)}>
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
