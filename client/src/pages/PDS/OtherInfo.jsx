import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function OtherInfo() {
    const [formData, setFormData] = useState({
        personId:'',
        otherInformation: {
            specialSkillsAndHobbies: [''],
            nonAcademicDistinctions: [''],
            memberships: ['']
        },
        photoUploaded: false
    });

    const navigate = useNavigate();

    const handleOtherInformationChange = (section, index, e) => {
        const { value } = e.target;
        const updatedFields = [...formData.otherInformation[section]];
        updatedFields[index] = value;
        setFormData({
            ...formData,
            otherInformation: {
                ...formData.otherInformation,
                [section]: updatedFields
            }
        });
    };

    const handleAddField = (section) => {
        setFormData({
            ...formData,
            otherInformation: {
                ...formData.otherInformation,
                [section]: [...formData.otherInformation[section], '']
            }
        });
    };

    const handlePreviousClick = () => {
        navigate('/LearningDev');
    };

    const handleNextClick = () => {
        // Validate that all fields are filled
        const isFormValid = Object.values(formData.otherInformation).every((fields) => 
            fields.every((field) => field.trim() !== '') // Check if all fields are non-empty
        );

        if (isFormValid) {
            sessionStorage.setItem("OtherInfo", JSON.stringify(formData));
            navigate('/RelationshipInfo');
        } else {
            alert("Please fill out all fields before proceeding.");
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
                            <button className="btn btn-link" onClick={() => handleNavigation('/PersonalInfo')}>Page 1</button>
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
                <h4 className="mt-4"><i>VIII. OTHER INFORMATION</i></h4>
                {Object.keys(formData.otherInformation).map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                        {formData.otherInformation[section].map((field, index) => (
                            <div key={index} className="row mb-3 align-items-center">
                                <div className="col-md-10">
                                    <label className="form-label">
                                        {section === 'specialSkills' ? '31. Special Skills and Hobbies' :
                                         section === 'nonAcademicDistinctions' ? '32. Non-Academic Distinctions/Recognition' :
                                         '33. Membership in Association/Organization'}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={field}
                                        onChange={(e) => handleOtherInformationChange(section, index, e)}
                                        style={{ border: '1px solid #ced4da' }}
                                    />
                                </div>
                                <div className="col-md-2 text-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleAddField(section)}
                                    >
                                        Add {section === 'specialSkills' ? 'Skill/Hobby' :
                                             section === 'nonAcademicDistinctions' ? 'Distinction' :
                                             'Membership'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>Previous</button>
                    <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default OtherInfo;
