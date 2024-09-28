import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utiliser le localStorage pour la persistance
import { combineReducers } from 'redux';
import employeeReducer from './employeeSlice';

// Configuration de la persistance
const persistConfig = {
  key: 'root',
  storage,
};

// Combine tous les reducers ici
const rootReducer = combineReducers({
  employees: employeeReducer,
});

// Crée un persistReducer à partir du rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store avec le reducer persisté
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Nécessaire pour redux-persist
    }),
});

// Exportation du persistor
export const persistor = persistStore(store);

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
