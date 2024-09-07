import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <h4>Man-Talavaho</h4>
      <br /> <br />
      <h5>Applicant</h5>
      <NavLink to="/" exact className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/AddPosition" className="nav-link" activeClassName="active">
        Add Job Position
      </NavLink>
      <NavLink to="/ManageJob" className="nav-link" activeClassName="active">
        Manage Job
      </NavLink>
      <NavLink to="/ViewApplicant/1" className="nav-link" activeClassName="active">
        Add Applicants
      </NavLink>

      <br /> <br />
      <h5>Employee</h5>
      <NavLink to="/manage-employee" className="nav-link" activeClassName="active">
        Manage Employee
      </NavLink>
      <NavLink to="/leave-manage" className="nav-link" activeClassName="active">
        Leave Manage
      </NavLink>
    </div>
  );
}

export default Sidebar;
