import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch  } from 'react-redux';
import { store, AppDispatch } from './store';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './layout/dashboard/Dashboard';
import AboutPage from './pages/AboutPage/AboutPage';
import ConfigPage from './pages/ConfigPage/ConfigPage';
import { fetchObras } from './slices/obrasSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch]);

  return (
    <Routes>
      <Route 
        path="/home" 
        element={ <Dashboard />}
      >
        <Route index element={<HomePage />} />
        <Route path="acerca" element={<AboutPage />} />
        <Route path="config" element={<ConfigPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes> 
  );
};

const AppWrapper: React.FC = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default AppWrapper;