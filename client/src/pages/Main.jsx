import React from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'; 

function Main() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1">
       
        <div className="top-header d-flex justify-content-between align-items-center p-4">
          <div className="welcome-text">
            <h5>Welcome back, Admin 👋</h5>
            <h1>Dashboard</h1>
          </div>
          <div className="profile-section d-flex align-items-center">
            <i className="bi bi-search mx-3"></i>
            <i className="bi bi-bell mx-3"></i>
            <div className="profile d-flex align-items-center">
              <img
                src="https://via.placeholder.com/40" 
                alt="Profile" 
                className="rounded-circle"
              />
              <span className="ms-2">HR Head</span>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Main;
