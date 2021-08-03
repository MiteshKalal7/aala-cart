import React, { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { API_URL } from '../../../config'

export default function ({
  show,
  onHide,
  data,
  onSuccess,
  onError,
  authToken,
  rdsList = [],
  serverList = [],
  edit = false,
}) {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentStatus, setCurrentStatus] = useState('1')
  const [sellerName, setSellerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [RDS, setRDS] = useState('')
  const [server, setServer] = useState('')

  useEffect(() => {
    if (data) {
      setName(data.name)
      setEmail(data.email)
      setSellerName(data.seller_name)
      setPassword(data.password)
      setContactNumber(data.contact_no)
      setRDS(data.rds_credential_id)
      setServer(data.server_credential_id)
      console.log(data)
    }
  }, [data])

  const onSubmit = () => {
    if (!name || !email || !sellerName || !contactNumber || !RDS || !server) {
      let err = {}
      let message = 'This field is required!'
      err['name'] = !name ? message : false
      err['email'] = !email ? message : false
      err['sellerName'] = !sellerName ? message : false
      err['contactNumber'] = !contactNumber ? message : false
      err['RDS'] = !RDS ? message : false
      err['server'] = !server ? message : false
      console.log(err)
      setErrors(err)
    } else {
      setSending(true)
      const body = {
        name,
        rds_credential_id: parseInt(RDS),
        server_credential_id: parseInt(server),
        seller_name: sellerName,
        email: email,
        password: password,
        photo: null,
        contact_no: contactNumber,
        status: currentStatus,
      }

      fetch(`${API_URL}user${data ? '/' + data.id : ''}`, {
        method: data ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          setSending(false)
          onHide()
          if (res.status) {
            onSuccess(res.message, res.data)
          } else {
            onError(res.message)
          }
        })
        .catch((err) => {
          setSending(false)
          // onHide()
        })
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
              <select
                name
                className="form-control"
                onChange={(e) => {
                  setCurrentStatus(e.target.value)
                }}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
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
              {edit ? (
                <p>{data.rdsCredential && data.rdsCredential.name}</p>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => {
                    handleInputChange('RDS')
                    setRDS(e.target.value)
                  }}
                >
                  <option value="">Select RDS</option>
                  {rdsList.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              )}
            </div>
            {errors['RDS'] && (
              <span className="invalid-feedback">{errors['RDS']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Server</label>
              {edit ? (
                <p>{data.serverCredential && data.serverCredential.name}</p>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => {
                    handleInputChange('server')
                    setServer(e.target.value)
                  }}
                >
                  <option value="">Select Server</option>
                  {serverList.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              )}
            </div>
            {errors['server'] && (
              <span className="invalid-feedback">{errors['server']}</span>
            )}
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
