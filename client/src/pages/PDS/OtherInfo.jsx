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

  const [currentPage, setCurrentPage] = useState(8); 
  const totalPages = 11; 

const handleNavigation = (path) => {
      navigate(path);
    };

    return (
        <div className="container mt-4">
           
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
                <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/LearningDev')}>
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
            <button className="page-link"  onClick={() => handleNavigation('/RelationshipInfo')}>
              &gt;
            </button>
          </li>
        </ul>
            </div>
        </div>
    );
}

export default OtherInfo;
