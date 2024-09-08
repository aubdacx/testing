import React from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'; 
import Navbar from '../pages/Navbar'; // Adjust the path as necessary

// Placeholder component for charts/graphs
const ChartPlaceholder = ({ title }) => (
  <div className="chart-placeholder bg-light p-3 rounded">
    <h5>{title}</h5>
    <div className="chart-content">
      <p>Graph here</p>
    </div>
  </div>
);

function Main() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1">
        <Navbar />
        <div className="d-flex justify-content-between align-items-center p-4">
          <div className="welcome-text">
            <h5>Welcome back, Admin 👋</h5>
            <h1>Dashboard</h1>
          </div>
        </div>

        <div className="container-fluid p-4">
          <div className="row">
            {/* Total Applicants */}
            <div className="col-md-3 mb-4">
              <ChartPlaceholder title="Total Applicants" />
            </div>

            {/* Total Employees */}
            <div className="col-md-3 mb-4">
              <ChartPlaceholder title="Total Employees" />
            </div>

            {/* New Resignations */}
            <div className="col-md-3 mb-4">
              <ChartPlaceholder title="New Resignations" />
            </div>

            {/* Employee Performance */}
            <div className="col-md-3 mb-4">
              <ChartPlaceholder title="Employee Performance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
