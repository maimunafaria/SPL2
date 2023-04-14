import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function MyModal({ show, onHide }) {
  const [barcode, setBarcode] = useState('');

  const handleFinish = (e) => {
    e.preventDefault()
    console.log(barcode);
    axios.post('http://localhost:12280/barcode',
      { barcode: barcode })
      .then(response => {
        console.log("hi");
        console.log(response.data);
        setBarcode('');
      })
      .catch(error => {
        console.error(error);
      });

  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Finish the Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFinish}>
          <Form.Group controlId="formFinishClass">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control type="text" placeholder="Registration Number" value={barcode} required onChange={(e) => setBarcode(e.target.value)} autoFocus />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Finish</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;