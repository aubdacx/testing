import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';

function Eligibility() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    civilServiceEligibility: [
      {
        careerService: '',
        rating: '',
        dateOfExamination: '',
        placeOfExamination: '',
        licenseNumber: '',
        dateOfValidity: ''
      }
    ],
    workExperience: [
      {
        from: '',
        to: '',
        positionTitle: '',
        department: '',
        monthlySalary: '',
        salaryGrade: '',
        statusOfAppointment: '',
        govService: ''
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

  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.workExperience];
    updatedExperience[index][name] = value;
    setFormData({ ...formData, workExperience: updatedExperience });
  };

  const handleNextClick = () => {
    navigate('/PDS');
  };
  const handleAddWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          from: '',
          to: '',
          positionTitle: '',
          department: '',
          monthlySalary: '',
          salaryGrade: '',
          statusOfAppointment: '',
          govService: ''
        }
      ]
    });
  };

  return (

    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <div className="container mt-4">
          <h4><i>IV. CIVIL SERVICE ELIGIBILITY</i></h4>
          <div className="row">
            <div className="col-md-12 mb-3">
              {formData.civilServiceEligibility.map((eligibility, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Career Service/RA 1080/Board/Bar under Special Laws/CES/CSEE Barangay Eligibility/Drivers License</label>
                    <input type="text" className="form-control" name="careerService" value={eligibility.careerService} onChange={(e) => handleCivilServiceChange(index, e)} />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Rating</label>
                    <input type="text" className="form-control" name="rating" value={eligibility.rating} onChange={(e) => handleCivilServiceChange(index, e)} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date of Examination/Conferment</label>
                    <input type="date" className="form-control" name="dateOfExamination" value={eligibility.dateOfExamination} onChange={(e) => handleCivilServiceChange(index, e)} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Place of Examination/Conferment</label>
                    <input type="text" className="form-control" name="placeOfExamination" value={eligibility.placeOfExamination} onChange={(e) => handleCivilServiceChange(index, e)} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">License Number</label>
                    <input type="text" className="form-control" name="licenseNumber" value={eligibility.licenseNumber} onChange={(e) => handleCivilServiceChange(index, e)} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Date of Validity</label>
                    <input type="date" className="form-control" name="dateOfValidity" value={eligibility.dateOfValidity} onChange={(e) => handleCivilServiceChange(index, e)} />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddCivilService}>Add Eligibility</button>
            </div>
          </div>

          <h4 className="mt-4"><i>V. WORK EXPERIENCE</i></h4>
          <div className="row">
            <div className="col-md-12 mb-3">
              {formData.workExperience.map((experience, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-2 mb-3">
                    <label className="form-label">From</label>
                    <input type="date" className="form-control" name="from" value={experience.from} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">To</label>
                    <input type="date" className="form-control" name="to" value={experience.to} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Position Title</label>
                    <input type="text" className="form-control" name="positionTitle" value={experience.positionTitle} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Department/Agency/Office/Company</label>
                    <input type="text" className="form-control" name="department" value={experience.department} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Monthly Salary</label>
                    <input type="text" className="form-control" name="monthlySalary" value={experience.monthlySalary} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Salary/Job/Pay Grade & Step</label>
                    <input type="text" className="form-control" name="salaryGrade" value={experience.salaryGrade} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Status of Appointment</label>
                    <input type="text" className="form-control" name="statusOfAppointment" value={experience.statusOfAppointment} onChange={(e) => handleWorkExperienceChange(index, e)} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Gov't Service (Y/N)</label>
                    <select className="form-select" name="govService" value={experience.govService} onChange={(e) => handleWorkExperienceChange(index, e)}>
                      <option value="">Select</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddWorkExperience}>Add Work Experience</button>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextClick}
              >
                Previous
              </button>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eligibility;
