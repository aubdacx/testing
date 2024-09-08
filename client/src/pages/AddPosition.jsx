import React, { useState } from 'react';
import Axios from 'axios';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPosition() {
  const [positionData, setPositionData] = useState({
    no: '', 
    positionTitle: '',
    plantilliaItemNo: '',
    salaryJobGrade: '',
    monthlySalary: '',
    qualificationStandards: {
      education: '',
      training: '',
      experience: '',
      eligibility: '',
      competency: ''
    },
    placeOfAssignment: '',
    isJobPostingOpen: true
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPositionData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleQualificationChange = (e) => {
    const { id, value } = e.target;
    setPositionData((prevState) => ({
      ...prevState,
      qualificationStandards: {
        ...prevState.qualificationStandards,
        [id]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const jobData = {
      positionTitle,
      plantilliaItemNo,
      salaryJobGrade,
      monthlySalary,
      qualificationStandards: {
        education,
        training,
        experience,
        eligibility,
        competency,
      },
      placeOfAssignment,
      isJobPostingOpen: true,
    };
  
    Axios.post('/api/job-postings/add', jobData)
      .then((response) => {
        console.log('Job posted successfully', response.data);
      })
      .catch((error) => {
        console.error('Error posting job', error);
      });
  };
  

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <h4>Add New Job Position</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="no" className="form-label">Job Posting No.</label>
            <input
              type="number"
              className="form-control"
              id="no"
              value={positionData.no}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="positionTitle" className="form-label">Position Title</label>
            <input
              type="text"
              className="form-control"
              id="positionTitle"
              value={positionData.positionTitle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="plantilliaItemNo" className="form-label">Plantillia Item No.</label>
            <input
              type="number"
              className="form-control"
              id="plantilliaItemNo"
              value={positionData.plantilliaItemNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salaryJobGrade" className="form-label">Salary Job Grade</label>
            <input
              type="text"
              className="form-control"
              id="salaryJobGrade"
              value={positionData.salaryJobGrade}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="monthlySalary" className="form-label">Monthly Salary</label>
            <input
              type="number"
              className="form-control"
              id="monthlySalary"
              value={positionData.monthlySalary}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <h5>Qualification Standards</h5>
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="education" className="form-label">Education</label>
                <input
                  type="text"
                  className="form-control"
                  id="education"
                  value={positionData.qualificationStandards.education}
                  onChange={handleQualificationChange}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="training" className="form-label">Training</label>
                <input
                  type="text"
                  className="form-control"
                  id="training"
                  value={positionData.qualificationStandards.training}
                  onChange={handleQualificationChange}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="experience" className="form-label">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  id="experience"
                  value={positionData.qualificationStandards.experience}
                  onChange={handleQualificationChange}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="eligibility" className="form-label">Eligibility</label>
                <input
                  type="text"
                  className="form-control"
                  id="eligibility"
                  value={positionData.qualificationStandards.eligibility}
                  onChange={handleQualificationChange}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="competency" className="form-label">Competency</label>
                <input
                  type="text"
                  className="form-control"
                  id="competency"
                  value={positionData.qualificationStandards.competency}
                  onChange={handleQualificationChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="placeOfAssignment" className="form-label">Place of Assignment</label>
            <input
              type="text"
              className="form-control"
              id="placeOfAssignment"
              value={positionData.placeOfAssignment}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default AddPosition;
