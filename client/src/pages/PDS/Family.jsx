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

  const [currentPage, setCurrentPage] = useState(2); 
    const totalPages = 11; 

  const handleNavigation = (path) => {
        navigate(path);
      };

  return (
    <div className="container mt-5">
       
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
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Personalnfo/:applicantId')}>
              &lt;
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Personalnfo/:applicantId')}>1</button>
          </li>
          <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Family')}>2</button>
          </li>
          <li className={`page-item ${currentPage === 3 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Educational')}>3</button>
          </li>
          <li className={`page-item ${currentPage === 4 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Eligibilty')}>4</button>
          </li>
          <li className={`page-item ${currentPage === 5 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/WorkExperience')}>5</button>
          </li>
          <li className={`page-item ${currentPage === 6 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/VoluntaryWork')}>6</button>
          </li>
          <li className={`page-item ${currentPage === 7 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/LearningDev')}>7</button>
          </li>
          <li className={`page-item ${currentPage === 8 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/OtherInfo')}>8</button>
          </li>
          <li className={`page-item ${currentPage === 9 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/RelationshipInfo')}>9</button>
          </li>
          <li className={`page-item ${currentPage === 10 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/References')}>10</button>
          </li>
          <li className={`page-item ${currentPage === 11 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Declaration')}>11</button>
          </li>
          <li className="page-item">
            <button className="page-link"  onClick={() => handleNavigation('/Educational')}>
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Family;
