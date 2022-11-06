import React, { Component }  from 'react';
import Entry from './entry';
import Main from './Main';
import { Route, Routes } from "react-router-dom"
import Header from './components/header';
function App() {
  return (
    <>
    <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/entry" element={<Entry />} />
        </Routes>
      </div>
      
    </>
  )
}

export default App