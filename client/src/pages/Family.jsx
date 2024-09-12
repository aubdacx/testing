import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Family() {
  const [formData, setFormData] = useState({
    personId: "",
    spouse: {
      surname: "",
      firstName: "",
      middleName: "",
      nameExtension: "",
      occupation: "",
      employerBusinessName: "",
      businessAddress: "",
      telephoneNo: "",
    },
    children: [{ name: "", dateOfBirth: "" }],
    father: {
      surname: "",
      firstName: "",
      middleName: "",
      nameExtension: "",
    },
    mother: {
      maidenName: {
        surname: "",
        firstName: "",
        middleName: "",
      },
    },
  });

  // Handle changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nested objects
    if (name.startsWith("spouse")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        spouse: {
          ...formData.spouse,
          [key]: value,
        },
      });
    } else if (name.startsWith("father")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        father: {
          ...formData.father,
          [key]: value,
        },
      });
    } else if (name.startsWith("mother")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        mother: {
          maidenName: {
            ...formData.mother.maidenName,
            [key]: value,
          },
        },
      });
    } else {
      // Handle top-level fields like personId
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle changes for children array elements
  const handleChildrenChange = (index, e) => {
    const { name, value } = e.target;
    const newChildren = [...formData.children];
    newChildren[index][name] = value;
    setFormData({
      ...formData,
      children: newChildren,
    });
  };

  // Add a new child to the children array
  const handleAddChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { name: "", dateOfBirth: "" }],
    });
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    sessionStorage.setItem("FamilyBG", JSON.stringify(formData));
    navigate("/Educational");
  };

  const handlePreviousClick = () => {
    navigate("/PersonalInfo");
  };

  return (
    <div className="container mt-5">
      <div className="border p-4">
        <h4>
          <i>II. FAMILY BACKGROUND</i>
        </h4>
        {/* Spouse Information */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>22. Spouse's Surname</label>
            <input
              type="text"
              className="form-control"
              name="spouseSurname"
              value={formData.spouseSurname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="spouseFirstName"
              value={formData.spouseFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="spouseMiddleName"
              value={formData.spouseMiddleName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Name Extension (e.g., Jr., Sr.)</label>
            <input
              type="text"
              className="form-control"
              name="spouseNameExtension"
              value={formData.spouseNameExtension}
              onChange={handleChange}
            />
          </div>
          <div></div>
          <div className="col-md-4 mb-3">
            <label>Occupation</label>
            <input
              type="text"
              className="form-control"
              name="spouseOccupation"
              value={formData.spouseOccupation}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Employer/Business Name</label>
            <input
              type="text"
              className="form-control"
              name="spouseEmployer"
              value={formData.spouseEmployer}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Business Address</label>
            <input
              type="text"
              className="form-control"
              name="spouseBusinessAddress"
              value={formData.spouseBusinessAddress}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Telephone No.</label>
            <input
              type="text"
              className="form-control"
              name="spouseTelephone"
              value={formData.spouseTelephone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Children Information */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>23. Name of Children (Write full name and list all)</label>
            {formData.children.map((child, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Child's Name"
                    value={child.name}
                    onChange={(e) => handleChildrenChange(index, e)}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={child.dateOfBirth}
                    onChange={(e) => handleChildrenChange(index, e)}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddChild}
            >
              Add Child
            </button>
          </div>
        </div>

        {/* Father's Information */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>24. Father's Surname</label>
            <input
              type="text"
              className="form-control"
              name="fatherSurname"
              value={formData.fatherSurname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherFirstName"
              value={formData.fatherFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherMiddleName"
              value={formData.fatherMiddleName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Name Extension (e.g., Jr., Sr.)</label>
            <input
              type="text"
              className="form-control"
              name="fatherNameExtension"
              value={formData.fatherNameExtension}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Mother's Information */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>25. Mother's Maiden Name</label>
            <input
              type="text"
              className="form-control"
              name="motherMaiden"
              value={formData.motherMaiden}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Surname</label>
            <input
              type="text"
              className="form-control"
              name="motherSurname"
              value={formData.motherSurname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="motherFirstName"
              value={formData.motherFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="motherMiddleName"
              value={formData.motherMiddleName}
              onChange={handleChange}
            />
          </div>
        </div>
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

export default Family;
