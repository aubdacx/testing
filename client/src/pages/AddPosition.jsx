import React from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPosition() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <div className="container">
          <h4 className="mb-4">Add New Job Position</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="positionTitle" className="form-label">Position Title</label>
              <input type="text" className="form-control" id="positionTitle" placeholder='e.g. "IT Support"' />
            </div>

            <div className="mb-3">
              <label htmlFor="positionDescription" className="form-label">Position Description</label>
              <textarea className="form-control" id="positionDescription" placeholder="Provide a description about the position." rows="3"></textarea>
            </div>


            <div className="col-md-4 mb-3">
              <label htmlFor="plantillaNo" className="form-label">Plantilla Item No.</label>
              <input type="text" className="form-control" id="plantillaNo"  />
            </div>

            <div className="col-md-4 mb-3"  >
              <label htmlFor="payGrade" className="form-label">Salary Job/Pay Grade</label>
              <input type="text" className="form-control" id="payGrade"  />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="monthlySalary" className="form-label">Monthly Salary</label>
              <input type="text" className="form-control" id="monthlySalary"  />
            </div>

            <div className="mb-3">
              <label className="form-label">Qualification Standards</label>
              <div className="row">
                <div className="col-md-2 mb-2">
                  <label htmlFor="education" className="form-label">Education</label>
                  <input type="text" className="form-control" id="education"  />
                </div>
                <div className="col-md-2 mb-2">
                  <label htmlFor="training" className="form-label">Training</label>
                  <input type="text" className="form-control" id="training" />
                </div>
                <div className="col-md-2 mb-2">
                  <label htmlFor="experience" className="form-label">Experience</label>
                  <input type="text" className="form-control" id="experience"  />
                </div>
                <div className="col-md-3 mb-2">
                  <label htmlFor="eligibility" className="form-label">Eligibility</label>
                  <input type="text" className="form-control" id="eligibility"  />
                </div>
                <div className="col-md-3 mb-2">
                  <label htmlFor="competence" className="form-label">Competence</label>
                  <input type="text" className="form-control" id="competence" />
                </div>
              </div>
            </div>


            <div className="mb-3">
              <label htmlFor="placeOfAssignment" className="form-label">Place of Assignment</label>
              <input type="text" className="form-control" id="placeOfAssignment" />
            </div>

            <button type="submit" className="btn btn-primary">Post Job</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPosition;
