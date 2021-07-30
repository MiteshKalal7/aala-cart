import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ({ show, onHide, edit = false }) {
  return (
    <Modal size="md" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {edit ? 'Edit' : 'Add'} Coupon
        </Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="form-group">
            <label htmlFor>Coupon Code</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor>Plan Name</label>
            <select name className="form-control" id>
              <option value>Monthly</option>
              <option value>6 Monthly</option>
              <option value>Yearly</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor>Description</label>
            <textarea
              name
              className="form-control"
              id
              cols={30}
              rows={2}
              defaultValue={''}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary px-5"
          onClick={onHide}
          id="b3"
        >
          Add Plan
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
