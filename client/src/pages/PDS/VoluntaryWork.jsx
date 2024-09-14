import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this import is correct
import "bootstrap/dist/css/bootstrap.min.css";

function VoluntaryWork() {
  const [formData, setFormData] = useState({
    voluntaryWork: [
      {
        personId: "",
        organizationName: "",
        organizationAddress: "",
        duration: {
          from: "",
          to: "",
        },
        numberOfHours: "",
        positionOrNatureOfWork: "",
      },
    ],
  });

  // Define navigate using the useNavigate hook
  const navigate = useNavigate();

  const handleVoluntaryWorkChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updatedVoluntaryWork = [...formData.voluntaryWork];

    if (name.startsWith("duration")) {
      const key = name.split(".")[1];
      updatedVoluntaryWork[index].duration = {
        ...updatedVoluntaryWork[index].duration,
        [key]: value,
      };
    } else if (type === "checkbox") {
      updatedVoluntaryWork[index][name] = checked;
    } else {
      updatedVoluntaryWork[index][name] = value;
    }

    setFormData({
      ...formData,
      voluntaryWork: updatedVoluntaryWork,
    });
  };

  const handleAddVoluntaryWork = () => {
    setFormData({
      ...formData,
      voluntaryWork: [
        ...formData.voluntaryWork,
        {
          personId: "",
          organizationName: "",
          organizationAddress: "",
          duration: {
            from: "",
            to: "",
          },
          numberOfHours: "",
          positionOrNatureOfWork: "",
        },
      ],
    });
  };

  // Ensure navigate function is used correctly
  const handleNextClick = () => {
    sessionStorage.setItem("VoluntaryWork", JSON.stringify(formData));
    navigate("/LearningDev"); // Ensure this route is correct
  };

  const handlePreviousClick = () => {
    navigate("/WorkExperience"); // Ensure this route is correct
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
        <h4>
          <i>
            VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE
            / VOLUNTARY ORGANIZATION/S
          </i>
        </h4>
        {formData.voluntaryWork.map((work, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-12">
              <div className="border p-3 mb-3" style={{ borderRadius: "5px" }}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor={`organizationName-${index}`}
                      className="form-label"
                    >
                      29. Name & Address of Organization
                    </label>
                    <input
                      type="text"
                      id={`organizationName-${index}`}
                      className="form-control"
                      name="organizationName"
                      value={work.organizationName}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label
                      htmlFor={`inclusiveDatesFrom-${index}`}
                      className="form-label"
                    >
                      From
                    </label>
                    <input
                      type="date"
                      id={`inclusiveDatesFrom-${index}`}
                      className="form-control"
                      name="duration.from"
                      value={work.duration.from}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label
                      htmlFor={`inclusiveDatesTo-${index}`}
                      className="form-label"
                    >
                      To
                    </label>
                    <input
                      type="date"
                      id={`inclusiveDatesTo-${index}`}
                      className="form-control"
                      name="duration.to"
                      value={work.duration.to}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label
                      htmlFor={`numberOfHours-${index}`}
                      className="form-label"
                    >
                      Number of Hours
                    </label>
                    <input
                      type="number"
                      id={`numberOfHours-${index}`}
                      className="form-control"
                      name="numberOfHours"
                      value={work.numberOfHours}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor={`position-${index}`} className="form-label">
                      Position / Nature of Work
                    </label>
                    <input
                      type="text"
                      id={`position-${index}`}
                      className="form-control"
                      name="positionOrNatureOfWork"
                      value={work.positionOrNatureOfWork}
                      onChange={(e) => handleVoluntaryWorkChange(index, e)}
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddVoluntaryWork}
        >
          Add Voluntary Work
        </button>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoluntaryWork;
