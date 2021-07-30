import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ({ show, onHide }) {
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>All Users</Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
            <thead>
              <tr className>
                <th>Name</th>
                <th>Email</th>
                <th>Avg SKU</th>
                <th>Avg Order Per Day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Brad Simmons</td>
                <td>bradsimmons@demo.com</td>
                <td>40</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Brad Simmons</td>
                <td>bradsimmons@demo.com</td>
                <td>40</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Brad Simmons</td>
                <td>bradsimmons@demo.com</td>
                <td>40</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Brad Simmons</td>
                <td>bradsimmons@demo.com</td>
                <td>40</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Brad Simmons</td>
                <td>bradsimmons@demo.com</td>
                <td>40</td>
                <td>13</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Total</th>
                <th>200</th>
                <th>65</th>
              </tr>
            </tfoot>
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
