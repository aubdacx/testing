import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const DTRTable = ({ open, onClose, userId }) => {
  const [dtrRecords, setDtrRecords] = useState([]);
  const [lateMinutes, setLateMinutes] = useState({
    amLateMinutes: '00:00:00',
    pmLateMinutes: '00:00:00',
    totalLateMinutes: '00:00:00'
  });

  const fetchDTRRecords = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/dtr/${userId}`);
        const mappedData = response.data.map(record => ({
          id: record._id,
          userId: record.userId,
          dateTime: new Date(record.date).toLocaleString(), // Format date
        }));
        setDtrRecords(mappedData);
      } catch (error) {
        console.error('Error fetching DTR records:', error);
      }
    }
  }, [userId]);

  const fetchLateMinutes = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/late-minutes/${userId}`);
        setLateMinutes(response.data);
      } catch (error) {
        console.error('Error fetching late minutes:', error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchDTRRecords();
    fetchLateMinutes();
  }, [fetchDTRRecords, fetchLateMinutes]);

  return (
    <Modal show={open} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>DTR Records for User ID: {userId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {dtrRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.userId}</td>
                  <td>{record.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="mb-4">
          <Form.Group controlId="formAMLateMinutes">
            <Form.Label>AM Late Minutes</Form.Label>
            <Form.Control type="text" readOnly value={lateMinutes.amLateMinutes} />
          </Form.Group>
          <Form.Group controlId="formPMLateMinutes">
            <Form.Label>PM Late Minutes</Form.Label>
            <Form.Control type="text" readOnly value={lateMinutes.pmLateMinutes} />
          </Form.Group>
          <Form.Group controlId="formTotalLateMinutes">
            <Form.Label>Total Late Minutes</Form.Label>
            <Form.Control type="text" readOnly value={lateMinutes.totalLateMinutes} />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DTRTable;
