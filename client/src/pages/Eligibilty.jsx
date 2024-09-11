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
    if (validateForm()) {
      navigate('/WorkExperience'); // Ensure the path is correct
    } else {
      alert('Please fill in all required fields for each eligibility entry.');
    }
  };

  const handlePreviousClick = () => {
    navigate('/Educational'); // Ensure the path is correct
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
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primar me-2" onClick={handlePreviousClick}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Eligibility;
