import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Family() {
  const [formData, setFormData] = useState({
    spouseSurname: '',
    spouseFirstName: '',
    spouseMiddleName: '',
    spouseNameExtension: '', 
    spouseOccupation: '',
    spouseEmployer: '',
    spouseBusinessAddress: '',
    spouseTelephone: '',
    children: [{ name: '', dateOfBirth: '' }],
    fatherSurname: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherNameExtension: '', 
    motherSurname: '',
    motherFirstName: '',
    motherMiddleName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChildrenChange = (index, e) => {
    const { name, value } = e.target;
    const newChildren = [...formData.children];
    newChildren[index][name] = value;
    setFormData({
      ...formData,
      children: newChildren,
    });
  };

  const handleAddChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { name: '', dateOfBirth: '' }],
    });
  };

  const validateForm = () => {
    if (
      !formData.spouseSurname ||
      !formData.spouseFirstName ||
      !formData.spouseMiddleName ||
      !formData.spouseOccupation ||
      !formData.spouseEmployer ||
      !formData.spouseBusinessAddress ||
      !formData.spouseTelephone
    ) {
      return false;
    }

    for (const child of formData.children) {
      if (!child.name || !child.dateOfBirth) {
        return false;
      }
    }

    if (
      !formData.fatherSurname ||
      !formData.fatherFirstName ||
      !formData.fatherMiddleName
    ) {
      return false;
    }

    if (
      !formData.motherSurname ||
      !formData.motherFirstName ||
      !formData.motherMiddleName
    ) {
      return false;
    }

    return true;
  };

  const navigate = useNavigate(); 

  const handleNextClick = () => {
    if (validateForm()) {
      navigate('/Educational'); 
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handlePreviousClick = () => {
    navigate('/PersonalInfo/:applicantId'); 
  };

  const handleNavigation = (page) => {
    navigate(page);
};
  return (
    <div className="container mt-5">
       {/* Navigation Bar */}
       <div className="mb-4">
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Personalnfo/:applicantId')}>Page 1</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Family')}>Page 2</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Educational')}>Page 3</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Eligibilty')}>Page 4</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/WorkExperience')}>Page 5</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/VoluntaryWork')}>Page 6</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/LearningDev')}>Page 7</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/OtherInfo')}>Page 8</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/RelationshipInfo')}>Page 9</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/References')}>Page 10</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Declaration')}>Page 11</button>
                        </li>
                    </ul>
                </nav>
            </div>
      <div className="border p-4">
        <h4><i>II. FAMILY BACKGROUND</i></h4>
        {/* Spouse Information */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>22. Spouse's Surname</label>
            <input
              type="text"
              className="form-control"
              name="spouseSurname"
              value={formData.spouseSurname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="spouseFirstName"
              value={formData.spouseFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="spouseMiddleName"
              value={formData.spouseMiddleName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
  <label>Name Extension (e.g., Jr., Sr.)</label>
  <input
    type="text"
    className="form-control"
    name="spouseNameExtension"
    value={formData.spouseNameExtension}
    onChange={handleChange}
  />
</div>
<div></div>
          <div className="col-md-4 mb-3">
            <label>Occupation</label>
            <input
              type="text"
              className="form-control"
              name="spouseOccupation"
              value={formData.spouseOccupation}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Employer/Business Name</label>
            <input
              type="text"
              className="form-control"
              name="spouseEmployer"
              value={formData.spouseEmployer}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Business Address</label>
            <input
              type="text"
              className="form-control"
              name="spouseBusinessAddress"
              value={formData.spouseBusinessAddress}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Telephone No.</label>
            <input
              type="text"
              className="form-control"
              name="spouseTelephone"
              value={formData.spouseTelephone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Children Information */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>23. Name of Children (Write full name and list all)</label>
            {formData.children.map((child, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Child's Name"
                    value={child.name}
                    onChange={(e) => handleChildrenChange(index, e)}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={child.dateOfBirth}
                    onChange={(e) => handleChildrenChange(index, e)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={handleAddChild}>Add Child</button>
          </div>
        </div>

        {/* Father's Information */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>24. Father's Surname</label>
            <input
              type="text"
              className="form-control"
              name="fatherSurname"
              value={formData.fatherSurname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherFirstName"
              value={formData.fatherFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherMiddleName"
              value={formData.fatherMiddleName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
  <label>Name Extension  (e.g., Jr., Sr.)</label>
  <input
    type="text"
    className="form-control"
    name="fatherNameExtension"
    value={formData.fatherNameExtension}
    onChange={handleChange}
  />
</div>

        </div>

        {/* Mother's Information */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>25. Mother's Maiden Name</label>
            <input
              type="text"
              className="form-control"
              name="motherMaiden"
              value={formData.motherMaiden}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Surname</label>
            <input
              type="text"
              className="form-control"
              name="motherSurname"
              value={formData.motherSurname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="motherFirstName"
              value={formData.motherFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="motherMiddleName"
              value={formData.motherMiddleName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Family;
