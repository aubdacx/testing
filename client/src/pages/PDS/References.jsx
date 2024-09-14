import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function References() {
    const [formData, setFormData] = useState({
        references: [{ name: '', address: '', telephone: '' }],
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
            reference.telephone.trim() !== ''
        );

        if (isFormValid) {
            navigate('/Declaration');
        } else {
            alert('Please fill out all reference fields before proceeding.');
        }
    };

    const handleNavigation = (page) => {
      navigate(page);
  };

    return (
        <div className="container mt-4">
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
                                value={reference.telephone}
                                onChange={(e) => handleArrayChange('references', index, 'telephone', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                
                <button
                    type="button"
                    className="btn btn-secondary mb-4"
                    onClick={() => setFormData({
                        ...formData,
                        references: [...formData.references, { name: '', address: '', telephone: '' }]
                    })}
                >
                    Add Reference
                </button>

                <div className="d-flex justify-content-end mt-3">
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

export default References;
