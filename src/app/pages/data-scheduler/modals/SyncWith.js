import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../config'
import { Modal, Spinner, Button, Card, Accordion } from 'react-bootstrap'

export default function ({ show, onHide }) {
  const [activeId, setActiveId] = useState('0')
  const [isValid, setIsValid] = useState(false)

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  useEffect(() => {
    if (isValid) {
      let dt = document.getElementById('chooseAccount')
      dt.classList.remove('collapse')
      // window.alert('scucess')
      setActiveId('1')
    }
  }, [isValid])

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Sync With</Modal.Title>
        <div className="form-group d-flex ml-auto mb-0">
          <label className="col-form-label" style={{ width: '70px' }}>
            Sync On
          </label>
          <div className>
            <span className="switch switch-icon">
              <label>
                <input type="checkbox" defaultChecked="checked" name="select" />
                <span />
              </label>
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <Accordion className="accordion-solid accordion-toggle-plus">
              <Card>
                <Accordion.Toggle
                  className={`card-header ${
                    activeId === '0' ? 'show' : 'hide'
                  }`}
                  id="FirstToggle"
                  as={Button}
                  variant=""
                  eventKey="0"
                  onClick={() => toggleActive('0')}
                >
                  <div
                    className={`card-title ${
                      activeId === '0' ? 'expanded' : 'collapsed'
                    }`}
                  >
                    Choose Apps and Events
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse
                  eventKey="0"
                  className={`card-title ${activeId === '0' ? 'show' : ''}`}
                >
                  <Card.Body>
                    <div>
                      <label htmlFor>
                        <b>Choose App</b>
                      </label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-white">
                            <i className="flaticon-search" />
                          </span>
                        </div>
                        <select className="form-control selectpicker">
                          <option>Google Sheets</option>
                          <option>Google Studio</option>
                          <option>Airtable</option>
                          <option>Power BI</option>
                        </select>
                      </div>
                    </div>
                    <div className=" mt-5">
                      <label htmlFor>
                        <b>Choose Action</b>
                      </label>
                      <select className="form-control selectpicker ">
                        <option>Create New Row</option>
                        <option>Delete and Update Rows</option>
                      </select>
                    </div>
                    <div className="text-center mt-5">
                      <button
                        className="btn btn-primary px-15"
                        onClick={() => {
                          setIsValid(true)
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {isValid && (
                <Card>
                  <Accordion.Toggle
                    className={`card-header ${activeId === '1' && 'show'}`}
                    as={Button}
                    variant=""
                    eventKey={isValid ? '1' : '-'}
                    dis
                    onClick={() => toggleActive('1')}
                  >
                    <div
                      class={`card-title ${
                        activeId === '1' ? 'expanded' : 'collapsed'
                      }`}
                    >
                      Choose Accounts
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey="1"
                    id="chooseAccount"
                    className={`card-title ${activeId === '1' ? 'show' : ''}`}
                  >
                    <Card.Body>
                      <div className="card-body">
                        <div>
                          <label
                            className="d-flex justify-content-between"
                            htmlFor
                          >
                            <b>Accounts</b>{' '}
                            <span>
                              <a href="#">Managed Connected Accounts</a>
                            </span>
                          </label>
                          <select className="form-control selectpicker">
                            <option data-icon="la la-lock font-size-lg bs-icon">
                              Google Sheet Account James
                            </option>
                            <option data-icon="la la-lock font-size-lg bs-icon">
                              Google Sheet Account Admin
                            </option>
                          </select>
                        </div>
                        <div className="text-center mt-5">
                          <button className="btn btn-primary px-15">
                            Continue
                          </button>
                        </div>
                        <div className="mt-5 ">
                          <div className="form-group">
                            <label htmlFor>
                              <b>Drive</b>
                            </label>
                            <select
                              className="form-control selectpicker"
                              data-live-search="true"
                            >
                              <option data-tokens>Test 1</option>
                              <option data-tokens>Test 2</option>
                              <option data-tokens>Test 3</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor>
                              <b>Spredsheet</b>
                            </label>
                            <select
                              className="form-control selectpicker"
                              data-live-search="true"
                            >
                              <option data-tokens>Google Sheet Test 1</option>
                              <option data-tokens>Google Sheet Test 2</option>
                              <option data-tokens>Google Sheet Test 3</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor>
                              <b>Worksheet</b>
                            </label>
                            <select
                              className="form-control selectpicker"
                              data-live-search="true"
                            >
                              <option data-tokens>Sheet 1</option>
                              <option data-tokens>Sheet 2</option>
                              <option data-tokens>Sheet 3</option>
                            </select>
                          </div>
                        </div>
                        <div className="text-center mt-5">
                          <button className="btn btn-primary px-15">
                            Continue
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )}
            </Accordion>
          </div>
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
