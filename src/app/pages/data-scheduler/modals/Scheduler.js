import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { API_URL } from '../../../config'

export default function ({ show, onHide, edit = false, data, onSuccess }) {
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [hostName, setHostName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [databaseName, setDatabaseName] = useState('')

  useEffect(() => {
    if (data) {
      setName(data.name)
      setSize(data.size)
      setHostName(data.hostname)
      setUsername(data.username)
      setPassword(data.password)
      setDatabaseName(data.db_name)
    }
  }, [data])

  const onSubmit = () => {
    if (
      !name ||
      !size ||
      !hostName ||
      !username ||
      !password ||
      !databaseName
    ) {
      let err = {}
      let message = 'This field is required!'
      err['name'] = !name ? message : false
      err['size'] = !size ? message : false
      err['hostName'] = !hostName ? message : false
      err['username'] = !username ? message : false
      err['password'] = !password ? message : false
      err['databaseName'] = !databaseName ? message : false
      console.log(err)
      setErrors(err)
    } else {
      setSending(true)
      const body = {
        name: 'rds-aalacart',
        size: 'db.t3.medium',
        hostname: 'aalacart.cnvmots5yjcs.us-east-2.rds.amazonaws.com',
        username: 'admin',
        password: 'F5pF9wBn7IYHYWNA',
        is_default: 1,
      }
      console.log('object', body)
      fetch(`${API_URL}rds`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          setSending(false)
          onHide()
          onSuccess(name)
          console.log(res)
        })
        .catch((err) => {
          setSending(false)
          onHide()
          onSuccess(name)
          console.log(err)
        })
    }
  }

  const handleInputChange = (name) => {
    const errs = errors
    if (errs[name]) errs[name] = false
    setErrors(errs)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Schedule</Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor>Select Channel</label>
              <select name className="form-control" id>
                <option value selected>
                  Amazon
                </option>
                <option value>Walmart</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor>Marketplace</label>
              <select name className="form-control" id>
                <option value selected>
                  Select Marketplace
                </option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor>Report / Data Type</label>
              <select name className="form-control" id>
                <option value selected>
                  FBA_ALL_ORDER_REPORTS
                </option>
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor>Report / Data Name</label>
              <select name className="form-control" id>
                <option value selected disabled>
                  Select Report
                </option>
                <option value>Financial Report</option>
                <option value="Order">Order Report</option>
                <option value>Sponsored Products</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-0">
              <label htmlFor>Time Interval</label>
              <select name className="form-control" id>
                <option value>1 hour</option>
                <option value>2 hour</option>
                <option value>3 hour</option>
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
          {edit ? 'Edit' : 'Add'} Report/Data
          {sending && <Spinner animation="border" size="sm" className="ml-1" />}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
