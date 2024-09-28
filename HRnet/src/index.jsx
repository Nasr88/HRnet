// import React from 'react';
import { createRoot } from 'react-dom/client'; // Importer createRoot
import { Provider } from 'react-redux';
import { store, persistor  } from './redux/store';  // Import du store
import Router from './Router'; // Importer ton fichier Router
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';  // Pour gérer la persistance


// Sélectionner la div avec l'ID 'root'
const container = document.getElementById('root');

// Créer une instance de root
const root = createRoot(container); // Le point d'entrée principal de l'application

// Utiliser root.render pour afficher ton application
root.render(
  <Provider store={store}>
    {/* PersistGate retarde le rendu de l'UI jusqu'à ce que la restauration du store soit complète */}
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
  </Provider>
);
