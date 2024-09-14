import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Educational() {
  const [formData, setFormData] = useState({
    personId: "",
    education: [  // Initialize education as an array
      {
        level: "",
        schoolName: "",
        basicEducationDegreeCourse: "",
        periodOfAttendance: {
          from: "",
          to: ""
        },
        highestLevelUnitsEarned: "",
        yearGraduated: "",
        honorsReceived: ""
      }
    ]
  });

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];

    // Check if the field is a nested field
    if (name.startsWith('periodOfAttendance')) {
      const key = name.split('.')[1];
      newEducation[index].periodOfAttendance = {
        ...newEducation[index].periodOfAttendance,
        [key]: value,
      };
    } else {
      // Handle other fields
      newEducation[index][name] = value;
    }

    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    sessionStorage.setItem("EducationalBG", JSON.stringify(formData));
    navigate('/Eligibility');
  };

  const handlePreviousClick = () => {
    navigate('/Family'); // Ensure the path is correct
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
        <h4><i>III. EDUCATIONAL BACKGROUND</i></h4>
        {formData.education.map((education, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-12">
              <div className="border p-3 mb-3" style={{ borderRadius: '5px' }}>
                <h5 className="mb-3"><i>{education.level}</i></h5>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">26. School Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="schoolName"
                      value={education.schoolName}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Basic Education/Degree/Course</label>
                    <input
                      type="text"
                      className="form-control"
                      name="degree"
                      value={education.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Attendance From</label>
                    <input
                      type="text"
                      className="form-control"
                      name="attendanceFrom"
                      value={education.attendanceFrom}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Attendance To</label>
                    <input
                      type="text"
                      className="form-control"
                      name="attendanceTo"
                      value={education.attendanceTo}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Highest Level/Units Earned (if not graduated)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="unitsEarned"
                      value={education.unitsEarned}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Year Graduated</label>
                    <input
                      type="text"
                      className="form-control"
                      name="yearGraduated"
                      value={education.yearGraduated}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="form-label">Scholarship/Academic Honors </label>
                    <input
                      type="text"
                      className="form-control"
                      name="honors"
                      value={education.honors}
                      onChange={(e) => handleEducationChange(index, e)}
                      style={{ border: '1px solid #ced4da' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Educational;
