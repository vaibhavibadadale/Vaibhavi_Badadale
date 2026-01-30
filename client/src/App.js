import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserList from './pages/UserList'; 
import Register from './pages/Register';
import UserDetails from './pages/UserDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 1. Listing view page (Table screen) */}
          <Route path="/" element={<UserList />} />
          
          {/* 2. Add details form page */}
          <Route path="/register" element={<Register />} />
          
          {/* 3. Edit details form page */}
          <Route path="/edit/:id" element={<Register isEdit={true} />} />
          
          {/* 4. View details page (Your creativity) */}
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;