import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function ManageJob() {
  const [vacancies, setVacancies] = useState([]);

  // Fetch job postings from the backend
  useEffect(() => {
    Axios.get('http://localhost:3000/api/job-postings/fetch')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setVacancies(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
          setVacancies([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching jobs', error);
        setVacancies([]);
      });
  }, []);

  // Delete a job posting
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3000/api/job-postings/${id}`)
      .then(() => {
        setVacancies(vacancies.filter((job) => job._id !== id));
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
        {vacancies.length > 0 ? (
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
              {vacancies.map((vacancy) => (
                <tr key={vacancy._id}>
                  <td>{vacancy.no}</td>
                  <td>{vacancy.positionTitle}</td>
                  <td>{vacancy.plantilliaItemNo}</td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(vacancy._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/edit-job/${vacancy._id}`} className="btn btn-secondary me-2">
                      Edit
                    </Link>
                    <Link to={`/jobApplicants`} className="btn btn-primary">
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
