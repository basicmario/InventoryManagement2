import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="mainbox">

      {/* NAVBAR */}
      <div className="navbar">
        <p>Inventory System</p>

        <div className="navbuttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/")}>Login</button>
          <button onClick={() => navigate("/about")}>About</button>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="herobox">
        <div className="innerhero">
          <h1>About Our System</h1>
          <p>
            The Inventory Management System is designed to help businesses
            efficiently manage their products, track stock levels, and monitor
            sales activities in real time.
          </p>
          <p>
            Our goal is to simplify inventory processes, reduce errors, and
            improve productivity through an easy-to-use interface.
          </p>
        </div>
      </div>

      {/* EXTRA INFO SECTION */}
      <div className="loginbox">
        <div className="innerlogin">
          <h2>Why Choose Us?</h2>

          <div className="section">
            <p>✔ Easy product tracking</p>
            <p>✔ Real-time inventory updates</p>
            <p>✔ User-friendly dashboard</p>
            <p>✔ Secure data management</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;