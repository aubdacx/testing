import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function References() {
    const [formData, setFormData] = useState({
        personId:'',
        references: [{ name: '', address: '', telNo: '' }],
    });

    const navigate = useNavigate();

    const handleArrayChange = (section, index, field, value) => {
        const updatedReferences = [...formData[section]];
        updatedReferences[index][field] = value;
        setFormData({
            ...formData,
            [section]: updatedReferences,
        });
    };

    const handlePreviousClick = () => {
        navigate('/OtherInfo');
    };

    const handleNextClick = () => {
        const isFormValid = formData.references.every((reference) => 
            reference.name.trim() !== '' && 
            reference.address.trim() !== '' && 
            reference.telNo.trim() !== ''
        );

        if (isFormValid) {
            sessionStorage.setItem("References", JSON.stringify(formData));
            navigate('/Declaration');
        } else {
            alert('Please fill out all reference fields before proceeding.');
        }
    };

//     const handleNavigation = (page) => {
//       navigate(page);
//   };

  const [currentPage, setCurrentPage] = useState(10); 
  const totalPages = 11; 

const handleNavigation = (path) => {
      navigate(path);
    };


    return (
        <div className="container mt-4">
            <div className="border p-4">
                {/* <h4 className="mt-4"><i>VIII. OTHER INFORMATION</i></h4> */}
                <label>
                    41. References (Person not related by consanguinity or affinity to applicant/appointee)
                </label>
                
                {formData.references.map((reference, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={reference.name}
                                onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                value={reference.address}
                                onChange={(e) => handleArrayChange('references', index, 'address', e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Telephone"
                                value={reference.telNo}
                                onChange={(e) => handleArrayChange('references', index, 'telNo', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                
                <button
                    type="button"
                    className="btn btn-secondary mb-4"
                    onClick={() => setFormData({
                        ...formData,
                        references: [...formData.references, { name: '', address: '', telNo: '' }]
                    })}
                >
                    Add Reference
                </button>

                {/* <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>
                        Previous
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNextClick}>
                        Next
                    </button>
                </div> */}

                <div className="mb-4">
            <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/RelationshipInfo')}>
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
            <button className="page-link"  onClick={() => handleNavigation('/Declaration')}>
              &gt;
            </button>
          </li>
        </ul>
      </nav>
            </div>
            </div>
        </div>
    );
}

export default References;
