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

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddLearningAndDevelopment}
        >
          Add Learning & Development
        </button>
        <div className="d-flex justify-content-end mt-3">
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

export default LearningDev;
