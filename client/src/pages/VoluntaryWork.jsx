import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this import is correct
import 'bootstrap/dist/css/bootstrap.min.css';

function VoluntaryWork() {
  const [formData, setFormData] = useState({
    voluntaryWork: [
      {
        organizationName: '',
        inclusiveDatesFrom: '',
        inclusiveDatesTo: '',
        numberOfHours: '',
        position: '',
      },
    ],
  });

  // Define navigate using the useNavigate hook
  const navigate = useNavigate();

  const handleVoluntaryWorkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVoluntaryWork = [...formData.voluntaryWork];
    updatedVoluntaryWork[index][name] = value;
    setFormData({ ...formData, voluntaryWork: updatedVoluntaryWork });
  };

  const handleAddVoluntaryWork = () => {
    setFormData({
      ...formData,
      voluntaryWork: [
        ...formData.voluntaryWork,
        {
          organizationName: '',
          inclusiveDatesFrom: '',
          inclusiveDatesTo: '',
          numberOfHours: '',
          position: '',
        },
      ],
    });
  };

  // Ensure navigate function is used correctly
  const handleNextClick = () => {
    // Add validation check here before navigating
    const isValid = formData.voluntaryWork.every(work => 
      work.organizationName && work.inclusiveDatesFrom && work.inclusiveDatesTo && work.numberOfHours && work.position
    );
    
    if (isValid) {
      navigate('/LearningDev'); // Ensure this route is correct
    } else {
      alert('Please complete all fields before proceeding.');
    }
  };

  const handlePreviousClick = () => {
    navigate('/WorkExperience'); // Ensure this route is correct
  };

  return (
    <div className="container mt-4">
      <div className="border p-4">
        <h4><i>VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S</i></h4>
        {formData.voluntaryWork.map((work, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-12">
              <div className="border p-3 mb-3" style={{ borderRadius: '5px' }}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor={`organizationName-${index}`} className="form-label">29. Name & Address of Organization</label>
                    <input
                      type="text"
                      id={`organizationName-${index}`}
                      className="form-control"
                      name="organizationName"
                      value={work.organizationName}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor={`inclusiveDatesFrom-${index}`} className="form-label">From</label>
                    <input
                      type="date"
                      id={`inclusiveDatesFrom-${index}`}
                      className="form-control"
                      name="inclusiveDatesFrom"
                      value={work.inclusiveDatesFrom}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor={`inclusiveDatesTo-${index}`} className="form-label">To</label>
                    <input
                      type="date"
                      id={`inclusiveDatesTo-${index}`}
                      className="form-control"
                      name="inclusiveDatesTo"
                      value={work.inclusiveDatesTo}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor={`numberOfHours-${index}`} className="form-label">Number of Hours</label>
                    <input
                      type="number"
                      id={`numberOfHours-${index}`}
                      className="form-control"
                      name="numberOfHours"
                      value={work.numberOfHours}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor={`position-${index}`} className="form-label">Position / Nature of Work</label>
                    <input
                      type="text"
                      id={`position-${index}`}
                      className="form-control"
                      name="position"
                      value={work.position}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddVoluntaryWork}>Add Voluntary Work</button>
        <div className="d-flex justify-content-end">    
          <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default VoluntaryWork;
