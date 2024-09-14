import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Eligibility() {
  const [formData, setFormData] = useState({
    civilServiceEligibility: [
      {
        careerService: '',
        rating: '',
        dateOfExamination: '',
        placeOfExamination: '',
        licenseNumber: '',
        dateOfValidity: '',
      }
    ]
  });

  const handleCivilServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEligibility = [...formData.civilServiceEligibility];
    updatedEligibility[index][name] = value;
    setFormData({ ...formData, civilServiceEligibility: updatedEligibility });
  };

  const handleAddCivilService = () => {
    setFormData({
      ...formData,
      civilServiceEligibility: [
        ...formData.civilServiceEligibility,
        {
          careerService: '',
          rating: '',
          dateOfExamination: '',
          placeOfExamination: '',
          licenseNumber: '',
          dateOfValidity: ''
        }
      ]
    });
  };

  const validateForm = () => {
    for (const eligibility of formData.civilServiceEligibility) {
      if (
        !eligibility.careerService ||
        !eligibility.rating ||
        !eligibility.dateOfExamination ||
        !eligibility.placeOfExamination ||
        !eligibility.licenseNumber ||
        !eligibility.dateOfValidity
      ) {
        return false;
      }
    }
    return true;
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    sessionStorage.setItem("Eligibility", JSON.stringify(formData));
      navigate('/WorkExperience'); // Ensure the path is correct
    // if (validateForm()) {
      
    // } else {
    //   alert('Please fill in all required fields for each eligibility entry.');
    // }
  };

  const handlePreviousClick = () => {
    navigate('/Educational'); // Ensure the path is correct
  };

  const [currentPage, setCurrentPage] = useState(4); 
  const totalPages = 11; 

const handleNavigation = (path) => {
      navigate(path);
    };

  return (
    <div className="container mt-4">

      <div className="border p-4">
        <h4><i>IV. CIVIL SERVICE ELIGIBILITY</i></h4>
        {formData.civilServiceEligibility.map((eligibility, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">27. Career Service/RA 1080/Board/Bar under Special Laws/CES/CSEE Barangay Eligibility/Drivers License</label>
              <input
                type="text"
                className="form-control"
                name="careerService"
                value={eligibility.careerService}
                onChange={(e) => handleCivilServiceChange(index, e)}
                style={{ border: '1px solid #ced4da' }} // Border style
              />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Rating</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                value={eligibility.rating}
                onChange={(e) => handleCivilServiceChange(index, e)}
                style={{ border: '1px solid #ced4da' }} // Border style
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Date of Examination/Conferment</label>
              <input
                type="date"
                className="form-control"
                name="dateOfExamination"
                value={eligibility.dateOfExamination}
                onChange={(e) => handleCivilServiceChange(index, e)}
                style={{ border: '1px solid #ced4da' }} // Border style
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Place of Examination/Conferment</label>
              <input
                type="text"
                className="form-control"
                name="placeOfExamination"
                value={eligibility.placeOfExamination}
                onChange={(e) => handleCivilServiceChange(index, e)}
                style={{ border: '1px solid #ced4da' }} // Border style
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">License Number</label>
              <input
                type="text"
                className="form-control"
                name="licenseNumber"
                value={eligibility.licenseNumber}
                onChange={(e) => handleCivilServiceChange(index, e)}
                style={{ border: '1px solid #ced4da' }} // Border style
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Date of Validity</label>
              <input
                type="date"
                className="form-control"
                name="dateOfValidity"
                value={eligibility.dateOfValidity}
                onChange={(e) => handleCivilServiceChange(index, e)}
                style={{ border: '1px solid #ced4da' }} // Border style
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddCivilService}>Add Eligibility</button>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Educational')}>
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
            <button className="page-link"  onClick={() => handleNavigation('/WorkExperience')}>
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Eligibility;
