import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle the category
  };

  return (
    <div className="sidebar">
      <h4>Man-Talavaho</h4>
      <br /><br />

      <NavLink to="/" exact className="nav-link" activeClassName="active">

        HOME
      </NavLink>

      {/* Section for Employee */}
      <div className="category-container">
        <h5 onClick={() => handleCategoryClick('employee')} className="clickable-h5">
          Employee
        </h5>
        {selectedCategory === 'employee' && (
          <ul className="links-container">
            <li>
              <NavLink to="/manage-employee" className="nav-link" activeClassName="active">
               View Earned Leave Creadits
              </NavLink>
            </li>
            <li>
              <NavLink to="/leave-manage" className="nav-link" activeClassName="active">
               Manage Employee
              </NavLink>
            </li>
            <li>
              <NavLink to="/leave-manage" className="nav-link" activeClassName="active">
               View Daily Time Records
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Section for Internal */}
      <div className="category-container">
        <h5 onClick={() => handleCategoryClick('internal')} className="clickable-h5">
          Internal
        </h5>
        {selectedCategory === 'internal' && (
          <ul className="links-container">
            <li>
              <NavLink to="/leave-application" className="nav-link" activeClassName="active">
                Leave Application
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-training-seminars" className="nav-link" activeClassName="active">
                Manage Training Seminars
              </NavLink>
            </li>
            <li>
              <NavLink to="/leave-credits" className="nav-link" activeClassName="active">
                Application for Leave Credits
              </NavLink>
            </li>
            <li>
              <NavLink to="/issuance-documents" className="nav-link" activeClassName="active">
                Issuance of Documents
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Section for External */}
      <div className="category-container">
        <h5 onClick={() => handleCategoryClick('external')} className="clickable-h5">
          External
        </h5>
        {selectedCategory === 'external' && (
          <ul className="links-container">
            <li>
              <NavLink to="/certification-employment" className="nav-link" activeClassName="active">
                Certification of Employment
              </NavLink>
            </li>
            <li>
              <NavLink to="/AddPosition" className="nav-link" activeClassName="active">
                Add Job Position
              </NavLink>
            </li>
            <li>
              <NavLink to="/ManageJob" className="nav-link" activeClassName="active">
                Manage Job Posting
              </NavLink>
            </li>
            <li>
              <NavLink to="/ViewApplicant" className="nav-link" activeClassName="active">
                Add Applicant
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
