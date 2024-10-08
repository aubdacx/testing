import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function WorkExperience() {
  const [formData, setFormData] = useState({
    workExperience: [
      {
        duration: {
          from: "",
          to: "",
        },
        positionTitle: "",
        department: "",
        immediateSupervisor: "",
        agencyOrganization: {
          name: "",
          location: "",
        },
        accomplishments: [""], // Default to an array with one empty string
        summaryOfDuties: "",
        monthlySalary: "",
        salaryGrade: "",
        statusOfAppointment: "",
        govService: false,
      },
    ],
  });

  const handleWorkExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperience = [...formData.workExperience];

    if (name.startsWith("duration")) {
      const key = name.split(".")[1];
      updatedExperience[index].duration = {
        ...updatedExperience[index].duration,
        [key]: value,
      };
    } else if (name.startsWith("agencyOrganization")) {
      const key = name.split(".")[1];
      updatedExperience[index].agencyOrganization = {
        ...updatedExperience[index].agencyOrganization,
        [key]: value,
      };
    } else if (type === "checkbox") {
      updatedExperience[index][name] = checked;
    } else {
      updatedExperience[index][name] = value;
    }

    setFormData({
      ...formData,
      workExperience: updatedExperience,
    });
  };

  const handleAddWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          personId: "",
          duration: {
            from: "",
            to: "",
          },
          positionTitle: "",
          department: "",
          immediateSupervisor: "",
          agencyOrganization: {
            name: "",
            location: "",
          },
          accomplishments: [""], // Default to an array with one empty string
          summaryOfDuties: "",
          monthlySalary: "",
          salaryGrade: "",
          statusOfAppointment: "",
          govService: false,
        },
      ],
    });
  };

  const validateForm = () => {
    for (const experience of formData.workExperience) {
      if (
        !experience.duration.from ||
        !experience.duration.to ||
        !experience.positionTitle ||
        !experience.department ||
        !experience.monthlySalary ||
        !experience.salaryGrade ||
        !experience.statusOfAppointment ||
        experience.govService === ""
      ) {
        return false;
      }
    }
    return true;
  };

  const navigate = useNavigate();

  const SaveToSession = () => {
    sessionStorage.setItem("WorkExperience", JSON.stringify(formData));
    navigate("/VoluntaryWork"); // Update this route with the actual next page
  };

  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 11;

  const handleNavigation = (path) => {
    SaveToSession()
    navigate(path);
  };


  return (
    <div className="container mt-4">

      <div className="border p-4">
        <h4>
          <i>V. WORK EXPERIENCE</i>
        </h4>
        {formData.workExperience.map((experience, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-12">
              <div className="border p-3 mb-3" style={{ borderRadius: "5px" }}>
                <div className="row mb-3">
                  <div className="col-md-2 mb-3">
                    <label className="form-label">28. From</label>
                    <input
                      type="date"
                      className="form-control"
                      name="from"
                      value={experience.from}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
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
                      style={{ border: "1px solid #ced4da" }}
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
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      Department/Agency/Office/Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={experience.department}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
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
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Salary/Job/Pay Grade & Step{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="salaryGrade"
                      value={experience.salaryGrade}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
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
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Gov't Service (Y/N)</label>
                    <select
                      className="form-select"
                      name="govService"
                      value={experience.govService}
                      onChange={(e) => handleWorkExperienceChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
                    >
                      <option value="">Select</option>
                      <option value={true}>Y</option>
                      <option value={false}>N</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddWorkExperience}
        >
          Add Work Experience
        </button>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Eligibility')}>
              &lt;
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/PersonalInfo')}>1</button>
          </li>
          <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Family')}>2</button>
          </li>
          <li className={`page-item ${currentPage === 3 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Educational')}>3</button>
          </li>
          <li className={`page-item ${currentPage === 4 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Eligibility')}>4</button>
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
            <button className="page-link" onClick={() => handleNavigation('/VoluntaryWork')}>
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WorkExperience;
