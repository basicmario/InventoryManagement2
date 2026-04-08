import { useNavigate } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom';
import Salesmanagement from '../Salesmanagement';
import Backup from '../Backup';
import Inventorycontrol from './Inventorycontrol';
import Report from './Report'
import Usermanagement from './Usermanagement'
import About from './About';

import './App.css'
import Dashboard from '../Dashboard'
import Webpage from './Webpage';
import { useState } from 'react'


function App() {

  

  return (
    <>
      <Routes>
        <Route path='/' element={<Webpage/>}/>
        <Route path='/Dashboard/*' element={<Dashboard/>}/>
        <Route path='/About' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
