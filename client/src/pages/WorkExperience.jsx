import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function WorkExperience() {
  const [formData, setFormData] = useState({
    workExperience: [
      {
        from: '',
        to: '',
        positionTitle: '',
        department: '',
        monthlySalary: '',
        salaryGrade: '',
        statusOfAppointment: '',
        govService: '',
      },
    ],
  });

  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.workExperience];
    updatedExperience[index][name] = value;
    setFormData({ ...formData, workExperience: updatedExperience });
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
          govService: '',
        },
      ],
    });
  };

  const validateForm = () => {
    for (const experience of formData.workExperience) {
      if (
        !experience.from ||
        !experience.to ||
        !experience.positionTitle ||
        !experience.department ||
        !experience.monthlySalary ||
        !experience.salaryGrade ||
        !experience.statusOfAppointment ||
        !experience.govService
      ) {
        return false;
      }
    }
    return true;
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    if (validateForm()) {
      navigate('/VoluntaryWork'); // Update this route with the actual next page
    } else {
      alert('Please fill in all required fields for each work experience entry.');
    }
  };

  const handlePreviousClick = () => {
    navigate('/Eligibility'); // Update this route with the actual previous page
  };

  return (
    <div className="container mt-4">
      <div className="border p-4">
        <h4><i>V. WORK EXPERIENCE</i></h4>
        {formData.workExperience.map((experience, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-12">
              <div className="border p-3 mb-3" style={{ borderRadius: '5px' }}>
                <div className="row mb-3">
                  <div className="col-md-2 mb-3">
                    <label className="form-label">28. From</label>
                    <input
                      type="date"
                      className="form-control"
                      name="from"
                      value={experience.from}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">To</label>
                    <input
                      type="date"
                      className="form-control"
                      name="to"
                      value={experience.to}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Position Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="positionTitle"
                      value={experience.positionTitle}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Department/Agency/Office/Company</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={experience.department}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Monthly Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      name="monthlySalary"
                      value={experience.monthlySalary}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Salary/Job/Pay Grade & Step </label>
                    <input
                      type="text"
                      className="form-control"
                      name="salaryGrade"
                      value={experience.salaryGrade}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                      placeholder="Format 00-0"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Status of Appointment</label>
                    <input
                      type="text"
                      className="form-control"
                      name="statusOfAppointment"
                      value={experience.statusOfAppointment}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Gov't Service (Y/N)</label>
                    <select
                      className="form-select"
                      name="govService"
                      value={experience.govService}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    >
                      <option value="">Select</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddWorkExperience}>
          Add Work Experience
        </button>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>
            Previous
          </button>
          <button type="button" className="btn btn-primary" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkExperience;
