import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ({ show, onHide, data }) {
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data.report_data}</Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
            <thead>
              <tr className="text-left text-uppercase">
                <th>Date / Time</th>
                <th>Sync From</th>
                <th>Sync To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2/03/21 3:00 PM</td>
                <td>
                  <b>Amazon</b>
                </td>
                <td>
                  <b>Aalacart</b>
                </td>
                <td>
                  <div>
                    <a href className="mr-5">
                      <b>
                        <u>Created Row</u>
                      </b>
                    </a>
                    {/* <a href=""><b><u>Imported Data</u></b></a> */}
                  </div>
                </td>
              </tr>
              <tr>
                <td>2/03/21 3:00 PM</td>
                <td>
                  <b>Aalacart</b>
                </td>
                <td>
                  <b>Google Sheet</b>
                </td>
                <td>
                  <div>
                    <a href className="mr-5">
                      <b>
                        <u>Created Row</u>
                      </b>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2/03/21 3:00 PM</td>
                <td>
                  <b>Walmart</b>
                </td>
                <td>
                  <b>Aalacart</b>
                </td>
                <td>
                  <div>
                    <a href="#">
                      <b>
                        <u>Imported Data</u>
                      </b>
                    </a>
                  </div>
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
