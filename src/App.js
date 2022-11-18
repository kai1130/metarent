import React, { Component }  from 'react';
import Entry from './form';
import Main from './Main';
import { Route, Routes } from "react-router-dom"
import Header from './components/header';
import Dashboard from './Dashboard';
function App() {
  return (
    <>
    <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App