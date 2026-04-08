import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Webpage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const getinfo = () => {
    const user = document.getElementById("userbox").value;
    const pass = document.getElementById("passbox").value;

    if (user === "admin" && pass === "123") {
      navigate("/Dashboard");
    }
  };

  return (
    <>
      <div className="mainbox">
        <div className="navbar">
          <p>Inventory System</p>
          <div className="navbuttons">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => setClicked(!clicked)}>Login</button>
            <button onClick={() => navigate("/about")}>About</button>
          </div>
        </div>

        {clicked ? (
          <div className="loginbox">
            <div className="innerlogin">
              <div className="section">
                <p>Username</p>
                <input id='userbox' type='text' placeholder='Enter the username' />
              </div>
              <div className="section">
                <p>Password</p>
                <input id='passbox' type='password' placeholder='Enter the password' />
              </div>
              <div className="loginbtn">
                <button onClick={getinfo}>Submit</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="herobox">
            <div className="innerhero">
              <h1>Welcome to Mars Wholesale Inventory Management System</h1>
              <p>Manage your stock, track products, and stay organized.</p>
            </div>
            <div className="herobtn">
              <button onClick={() => setClicked(true)}>Get Started</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Webpage;