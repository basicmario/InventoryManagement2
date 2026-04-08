import React from 'react'
import '../inventorymanagement/src/App.css'
import Salesmanagement from './Salesmanagement';
import Backup from './Backup';
import Inventorycontrol from './src/Inventorycontrol';
import Report from './src/Report'
import Usermanagement from './src/Usermanagement'
import { Routes, useNavigate } from 'react-router-dom'
import { Route } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate();

 

    const clicked = (value) => {
    if (value === "salesmanagement") {
      navigate("/dashboard/salesmanagement");
    } else if (value === "backup") {
      navigate("/dashboard/backup");
    } else if (value === "inventorycontrol") {
      navigate("/dashboard/inventorycontrol");
    } else if (value === "report") {
      navigate("/dashboard/report");
    } else {
      navigate("/dashboard/usermanagement");
    }
  };

  


  return (
    <>
        <div className="dashboard">
          <div className="sidebar">

            <p className='storetitle'> Mars <br></br>Wholesale</p>
            <button onClick={()=>clicked("salesmanagement")}>Sales Management</button>
            <button onClick={()=>clicked("inventorycontrol")}>Inventory Control</button>
            <button onClick={()=>clicked("report")}>Report & Analysis</button>
            <button onClick={()=>clicked("backup")}>Backup & Recovery</button>
            
          </div>

          <div className="mainbox">
            <Routes>
              <Route path="/" element={<Salesmanagement />} />
              <Route path="salesmanagement" element={<Salesmanagement />} />
              <Route path="backup" element={<Backup />} />
              <Route path="inventorycontrol" element={<Inventorycontrol />} />
              <Route path="report" element={<Report />} />
              <Route path="usermanagement" element={<Usermanagement />} />
            </Routes>
          </div>
        </div>

        
    </>
  )
}

export default Dashboard











