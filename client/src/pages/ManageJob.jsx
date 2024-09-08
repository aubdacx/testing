import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function ManageJob() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    Axios.get('/api/job-postings/fetch')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
          setJobs([]); 
        }
      })
      .catch((error) => {
        console.error('Error fetching jobs', error);
        setJobs([]); 
      });
  }, []);
  
  const handleDelete = (id) => {
    Axios.delete(`/api/job-postings/${id}`)
      .then(() => {
        setJobs(jobs.filter((job) => job._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting job', error);
      });
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <h4>Manage Job Positions</h4>
        {jobs.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Plantillia No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.no}</td>
                  <td>{job.positionTitle}</td>
                  <td>{job.plantilliaItemNo}</td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/edit-job/${job._id}`} className="btn btn-secondary me-2">
                      Edit
                    </Link>
                    <Link to={`/view-applicant/${job._id}`} className="btn btn-primary">
                      View Applicants
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No job postings available</p>
        )}
      </div>
    </div>
  );
}

export default ManageJob;
