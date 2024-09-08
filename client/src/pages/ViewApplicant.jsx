import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const dummyApplicants = {
  1: [
    { id: 1, name: 'Emjay', email: 'emjay.com', appliedAt: '2024-09-01' },
    { id: 2, name: 'Kerty', email: 'kert.com', appliedAt: '2024-09-02' },
  ],
  2: [
    { id: 3, name: 'aub', email: 'aub@gmail.com', appliedAt: '2024-09-03' },
    { id: 4, name: 'emjay', email: 'emjay.com', appliedAt: '2024-09-04' },
  ],
};

function ViewApplicant() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const applicants = dummyApplicants[jobId] || [];

  const handleDelete = (applicantId) => {
    console.log(`Deleting applicant with ID ${applicantId}`);
  };

  const handleHire = (applicantId) => {
    console.log(`Hiring applicant with ID ${applicantId}`);
    navigate(`/Personalnfo/${applicantId}`);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <div className="container">
          <h4 className="mb-4">Job Applicants</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Applied At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(applicant => (
                <tr key={applicant.id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.appliedAt}</td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(applicant.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleHire(applicant.id)}
                    >
                      Hire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewApplicant;
