import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ({ show, onHide }) {
  return (
    <Modal size="md" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Payment History</Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div class="table-responsive">
          <table class="table table-head-custom table-head-bg table-borderless table-vertical-center">
            <thead>
              <tr class="text-left text-uppercase">
                <th style={{ minWidth: '100px' }}>Date</th>
                <th style={{ minWidth: '100px' }}>Subscription</th>
                <th style={{ minWidth: '100px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7 May, 2021</td>
                <td>
                  <span class="label label-lg label-light-success label-inline">
                    <b>Pro</b>
                  </span>
                </td>
                <td>
                  <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                    $214
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
