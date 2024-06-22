import React ,  { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function StudentModal({ show, handleClose, addStudent, editingStudent }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState('REACT N13');
  const [doesWork, setDoesWork] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFirstName(editingStudent.firstName);
      setLastName(editingStudent.lastName);
      setGroup(editingStudent.group);
      setDoesWork(editingStudent.doesWork);
    } else {
      setFirstName('');
      setLastName('');
      setGroup('REACT N13');
      setDoesWork(false);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({ firstName, lastName, group, doesWork });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingStudent ? 'Edit Student' : 'Adding student'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroup">
            <Form.Label>Select group</Form.Label>
            <Form.Control
              as="select"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="REACT N1">REACT N1</option>
              <option value="REACT N11">REACT N11</option>
              <option value="REACT N13">REACT N13</option>
              <option value="REACT N15">REACT N15</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDoesWork">
            <Form.Check
              type="checkbox"
              label="Does work?"
              checked={doesWork}
              onChange={(e) => setDoesWork(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {editingStudent ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default StudentModal;
