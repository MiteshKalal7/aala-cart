import React, { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'

export default function ({ show, onHide, data, onSuccess, edit = false }) {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [email, setEmail] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [RDS, setRDS] = useState('')
  const [server, setServer] = useState('')

  useEffect(() => {
    if (data) {
      setName(data.name)
      setEmail(data.email)
      setSellerName(data.seller_name)
      setContactNumber(data.contact_no)
    }
  }, [data])

  const onSubmit = () => {
    if (!name || !email || !sellerName || !contactNumber) {
      let err = {}
      let message = 'This field is required!'
      err['name'] = !name ? message : false
      err['email'] = !email ? message : false
      err['sellerName'] = !sellerName ? message : false
      err['contactNumber'] = !contactNumber ? message : false
      console.log(err)
      setErrors(err)
    } else {
      setSending(true)

      setTimeout(() => {
        setSending(false)
        onHide()
        onSuccess(name)
      }, 2000)
    }
  }

  const handleInputChange = (name) => {
    const errs = errors
    if (errs[name]) errs[name] = false
    setErrors(errs)
  }

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {edit ? 'Edit' : 'Add'} User
        </Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  handleInputChange('name')
                  setName(e.target.value)
                }}
              />
            </div>
            {errors['name'] && (
              <span className="invalid-feedback">{errors['name']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Email id</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => {
                  handleInputChange('email')
                  setEmail(e.target.value)
                }}
              />
            </div>
            {errors['email'] && (
              <span className="invalid-feedback">{errors['email']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Profile Image</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose file
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Current Status</label>
              <select name className="form-control" id>
                <option value>Active</option>
                <option value>Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Seller Name</label>
              <input
                type="text"
                className="form-control"
                value={sellerName}
                onChange={(e) => {
                  handleInputChange('sellerName')
                  setSellerName(e.target.value)
                }}
              />
            </div>
            {errors['sellerName'] && (
              <span className="invalid-feedback">{errors['sellerName']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                value={contactNumber}
                onChange={(e) => {
                  handleInputChange('contactNumber')
                  setContactNumber(e.target.value)
                }}
              />
            </div>
            {errors['contactNumber'] && (
              <span className="invalid-feedback">
                {errors['contactNumber']}
              </span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>RDS</label>
              <select name className="form-control" id>
                <option value>Select RDS</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Server</label>
              <select name className="form-control" id>
                <option value>Select Server</option>
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary px-5"
          onClick={onSubmit}
          disabled={sending}
        >
          {edit ? 'Edit' : 'Add'} User
          {sending && <Spinner animation="border" size="sm" className="ml-1" />}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
