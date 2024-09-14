import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { BsFillPersonPlusFill, BsFillFileEarmarkTextFill } from 'react-icons/bs'; 

const iconStyle = {
  fontSize: '1.5rem',
  color: '#000', 
};

const textStyle = {
  fontSize: '0.75rem', 
  color: '#000', 
  textAlign: 'center', 
  marginTop: '0.5rem',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center', 
  marginRight: '1rem',
};

const DailyTimeRecord = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newEmployee, setNewEmployee] = useState({ userId: '', name: '', file: null });
  const [dtrData, setDTRData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      const mappedData = response.data.map(employee => ({
        id: employee._id,
        userId: employee.userId,
        name: employee.name
      }));
      setRows(mappedData);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchDTRData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dtr/${userId}`);
      setDTRData(response.data);
    } catch (error) {
      console.error('Error fetching DTR data:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewEmployee(prevState => ({
      ...prevState,
      [name]: value,
      file: files ? files[0] : prevState.file
    }));
  };

  const handleSubmit = async () => {
    if (!newEmployee.userId || !newEmployee.name) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('userId', newEmployee.userId);
      formData.append('name', newEmployee.name);
      if (newEmployee.file) {
        formData.append('file', newEmployee.file);
      }

      await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchData(); // Refresh the table data
      handleClose(); // Close the dialog
      setNewEmployee({ userId: '', name: '', file: null }); // Reset the form
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleViewDTR = async (userId) => {
    setSelectedUserId(userId);
    await fetchDTRData(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const computeDTRValues = () => {
    const amMinutesLate = dtrData.reduce((sum, dtr) => sum + (dtr.amMinutesLate || 0), 0);
    const pmMinutesLate = dtrData.reduce((sum, dtr) => sum + (dtr.pmMinutesLate || 0), 0);
    const totalMinutesLate = amMinutesLate + pmMinutesLate;
    const minutesUnderTime = dtrData.reduce((sum, dtr) => sum + (dtr.minutesUnderTime || 0), 0);

    return { amMinutesLate, pmMinutesLate, totalMinutesLate, minutesUnderTime };
  };

  const { amMinutesLate, pmMinutesLate, totalMinutesLate, minutesUnderTime } = computeDTRValues();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h3>Employee Daily Time Record</h3>
        <div className="d-flex justify-content-end mb-3 align-items-center">
        
          <div style={containerStyle}>
            <Button 
              variant="link" 
              onClick={() => setOpen(true)} 
              className="p-0"
              style={iconStyle}
            >
              <BsFillPersonPlusFill />
            </Button>
            <span style={textStyle}>Add Employee</span>
          </div>  

          <div style={containerStyle}>
            <label htmlFor="file-upload" className="p-0" style={{ cursor: 'pointer' }}>
              <BsFillFileEarmarkTextFill style={iconStyle} />
            </label>
            <span style={textStyle}>Upload File</span>
            <input
              id="file-upload"
              type="file"
              name="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
          </div>
          
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.userId}</td>
                <td>{employee.name}</td>
                <td>
                  <Button variant="primary" onClick={() => handleViewDTR(employee.userId)}>
                    View DTR
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Adding Employee */}
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={newEmployee.userId}
                  onChange={handleChange}
                  placeholder="Enter User ID"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Upload File</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Viewing DTR */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Daily Time Record for User ID: {selectedUserId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row mb-4">
                <div className="col-md-3">
                  <h5>Computed DTR Data</h5>
                  <p><strong>AM Minutes Late:</strong> {amMinutesLate}</p>
                  <p><strong>PM Minutes Late:</strong> {pmMinutesLate}</p>
                  <p><strong>Total Minutes Late:</strong> {totalMinutesLate}</p>
                  <p><strong>Minutes of Under Time:</strong> {minutesUnderTime}</p>
                </div>
              </div>

              {/* Table displaying DTR data with scroll bar */}
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dtrData.map((dtr, index) => (
                      <tr key={index}>
                        <td>{dtr.date}</td>
                        <td>{dtr.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => console.log('Save DTR Changes')}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DailyTimeRecord;
