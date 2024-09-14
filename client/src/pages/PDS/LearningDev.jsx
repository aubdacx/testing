import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LearningDev() {
  const [formData, setFormData] = useState({
    learningAndDevelopment: [
      {
        title: "",
        duration: {
          from: "",
          to: "",
        },
        numberOfHours: "",
        typeOfLD: "",
        conductedBy: "",
      },
    ],
  });

  const handleLearningAndDevelopmentChange = (index, e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split(".");

    setFormData((prevData) => {
      const updatedLearningAndDevelopment = [
        ...prevData.learningAndDevelopment,
      ];

      if (subfield) {
        // Handle nested fields like duration.from and duration.to
        updatedLearningAndDevelopment[index][field] = {
          ...updatedLearningAndDevelopment[index][field],
          [subfield]: value,
        };
      } else {
        // Handle flat fields like title, numberOfHours
        updatedLearningAndDevelopment[index][field] = value;
      }

      return {
        ...prevData,
        learningAndDevelopment: updatedLearningAndDevelopment,
      };
    });
  };

  const handleAddLearningAndDevelopment = () => {
    setFormData({
      ...formData,
      learningAndDevelopment: [
        ...formData.learningAndDevelopment,
        {
          title: "",
          duration: {
            from: "",
            to: "",
          },
          numberOfHours: "",
          typeOfLD: "",
          conductedBy: "",
        },
      ],
    });
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    sessionStorage.setItem("LearningDev", JSON.stringify(formData));
    navigate("/OtherInfo"); // Ensure this route is correct
  };

  const handlePreviousClick = () => {
    navigate("/VoluntaryWork"); // Ensure this route is correct
  };


const [currentPage, setCurrentPage] = useState(7); 
const totalPages = 11; 

const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container mt-4">
      
      <div className="border p-4">
        <h4 className="mt-4">
          <i>
            VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS
            ATTENDED
          </i>
        </h4>
        {formData.learningAndDevelopment.map((learning, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-12">
              <div className="border p-3 mb-3" style={{ borderRadius: "5px" }}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor={`title-${index}`} className="form-label">
                      30. Title of Learning and Development
                      Interventions/Training Programs
                    </label>
                    <input
                      type="text"
                      id={`title-${index}`}
                      className="form-control"
                      name="title"
                      value={learning.title}
                      onChange={(e) =>
                        handleLearningAndDevelopmentChange(index, e)
                      }
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
                      name="inclusiveDatesFrom"
                      value={learning.inclusiveDatesFrom}
                      onChange={(e) =>
                        handleLearningAndDevelopmentChange(index, e)
                      }
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
                      name="inclusiveDatesTo"
                      value={learning.inclusiveDatesTo}
                      onChange={(e) =>
                        handleLearningAndDevelopmentChange(index, e)
                      }
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
                      value={learning.numberOfHours}
                      onChange={(e) =>
                        handleLearningAndDevelopmentChange(index, e)
                      }
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`typeOfLD-${index}`} className="form-label">
                      Type of LD (Managerial/Supervisory/Technical/etc.)
                    </label>
                    <input
                      type="text"
                      id={`typeOfLD-${index}`}
                      className="form-control"
                      name="typeOfLD"
                      value={learning.typeOfLD}
                      onChange={(e) =>
                        handleLearningAndDevelopmentChange(index, e)
                      }
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor={`conductedBy-${index}`}
                      className="form-label"
                    >
                      Conducted/Sponsored By
                    </label>
                    <input
                      type="text"
                      id={`conductedBy-${index}`}
                      className="form-control"
                      name="conductedBy"
                      value={learning.conductedBy}
                      onChange={(e) =>
                        handleLearningAndDevelopmentChange(index, e)
                      }
                      style={{ border: "1px solid #ced4da" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddLearningAndDevelopment}>Add Learning & Development</button>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/VoluntaryWork')}>
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
            <button className="page-link"  onClick={() => handleNavigation('/OtherInfo')}>
              &gt;
            </button>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default LearningDev;
