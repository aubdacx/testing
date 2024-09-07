
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const dummyJobs = [
  { id: 1, title: 'IT Support', description: 'Provide IT support to staff.' },
  { id: 2, title: 'Timpla Kape', description: 'Utusan' },
];

function ManageJob() {
  const [jobs, setJobs] = useState(dummyJobs);

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <div className="container">
          <h4 className="mb-4">Manage Job Positions</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.description}</td>
                  <td>
                    <button className="btn btn-danger me-2" onClick={() => handleDelete(job.id)}>Delete</button>
                    <Link to={`/ViewApplicant/${job.id}`} className="btn btn-primary me-2">View Applicants</Link>
                    <Link to={`/AddPosition/${job.id}`} className="btn btn-secondary">Edit</Link>

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

export default ManageJob;
