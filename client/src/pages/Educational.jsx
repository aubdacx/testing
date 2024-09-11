import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Educational() {
  const [formData, setFormData] = useState({
    education: [
      { level: 'Elementary', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' },
      { level: 'Secondary', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' },
      { level: 'Vocational/Trade Course', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' },
      { level: 'College', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' },
      { level: 'Graduate Studies', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' },
    ],
  });

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = value;
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const validateForm = () => {
    for (const education of formData.education) {
      if (
        !education.schoolName ||
        !education.degree ||
        !education.attendanceFrom ||
        !education.attendanceTo ||
        !education.unitsEarned ||
        !education.yearGraduated
      ) {
        return false;
      }
    }
    return true;
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    if (validateForm()) {
      navigate('/Eligibility'); // Ensure the path is correct
    } else {
      alert('Please fill in all required fields for each education level.');
    }
  };

  const handlePreviousClick = () => {
    navigate('/Family'); // Ensure the path is correct
  };

  return (
    <div className="container mt-4">
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
