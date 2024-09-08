import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Sidebar from './Sidebar';

function ViewApplicant() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    Axios.get(`/api/job-postings/${jobId}/applicants`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setApplicants(response.data);
        } else {
          console.error('Expected an array, got:', response.data);
          setApplicants([]); 
        }
      })
      .catch((error) => {
        console.error('Error fetching applicants', error);
      });
  }, [jobId]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        <h4 className="mb-4">Applicants</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(applicants) && applicants.length > 0 ? (
              applicants.map((applicant) => (
                <tr key={applicant._id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.experience}</td>
                  <td>
                    <button className="btn btn-primary">View Resume</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No applicants found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewApplicant;
