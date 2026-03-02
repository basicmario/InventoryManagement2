import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import './App.css'



function Webpage() {

    let navigate = useNavigate();
 
    const [clicked, setclicked] = useState(false);
    const [ dashboard, setdashboard] = useState(false);

    console.log("clicked: ",clicked);


    const getinfo = () => {

        const user = document.getElementById("userbox").value;
        const pass = document.getElementById("passbox").value;

        if( user == "admin" && pass == "123"){
        setdashboard(true);
        navigate("/Dashboard");
        }

    }


  return (
    <>
        <div className="mainbox">
        <div className="navbar">
          <div className="title">
            <p>Inventory Management</p>
          </div>

          <div className="navbuttons">
            <button onClick={()=>setclicked(!clicked)}>Login</button>
          </div>
        </div>

        {clicked == true ? 
          <div className="loginbox">
            <div className="innerlogin">
              <div className="logintitle">
              <p>I just want to know if this works or not that's all</p>
            </div>

            <div className="section">
              <p>Username</p>
              <input id='userbox'type='text' placeholder='Enter the username'></input>
            </div>

            <div className="section">
              <p>Password</p>
              <input id='passbox' type='password' placeholder='Enter the password'></input>
            </div>

            <div className="loginbtn">
              <button onClick={()=>getinfo()}>Submit</button>
            </div>
            </div>
          </div>

          :

          <div className="herobox">
            <div className="innerhero">
              <p>All you need to manage your inventory</p>
            </div>

            
            
            <div className="herobtn">
              <button onClick={()=>setclicked(!clicked)}>Login</button>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Webpage