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

  const [currentPage, setCurrentPage] = useState(6); 
    const totalPages = 11; 

  const handleNavigation = (path) => {
        navigate(path);
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
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/WorkExperience')}>
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
            <button className="page-link"  onClick={() => handleNavigation('/LearningDev')}>
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VoluntaryWork;
