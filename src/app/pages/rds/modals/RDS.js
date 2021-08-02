import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { API_URL } from '../../../config'
import { useSelector } from 'react-redux'

export default function ({ show, onHide, edit = false, data, onSuccess }) {
  const { authToken } = useSelector((state) => state.auth)

  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [hostName, setHostName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isDefault, setIsDefault] = useState('0')
  // const [databaseName, setDatabaseName] = useState('')

  useEffect(() => {
    if (data) {
      setName(data.name)
      setSize(data.size)
      setHostName(data.hostname)
      setUsername(data.username)
      setPassword(data.password)
      setIsDefault(data.is_default)
      // window.alert(data.id)
      // setDatabaseName(data.db_name)
    }
  }, [data])

  const onSubmit = () => {
    if (
      !name ||
      !size ||
      !hostName ||
      !username ||
      !password
      // || !databaseName
    ) {
      let err = {}
      let message = 'This field is required!'
      err['name'] = !name ? message : false
      err['size'] = !size ? message : false
      err['hostName'] = !hostName ? message : false
      err['username'] = !username ? message : false
      err['password'] = !password ? message : false
      // err['databaseName'] = !databaseName ? message : false
      // console.log(err)
      setErrors(err)
    } else {
      setSending(true)
      const body = {
        name,
        size,
        hostname: hostName,
        username,
        password,
        is_default: isDefault,
      }
      // console.log('object', body)

      fetch(`${API_URL}rds${data ? '/' + data.id : ''}`, {
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
            window.alert(res.message)
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
          {edit ? 'Edit' : 'Add'} RDS
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
              <label>Size</label>
              <input
                type="text"
                className="form-control"
                value={size}
                onChange={(e) => {
                  handleInputChange('size')
                  setSize(e.target.value)
                }}
              />
            </div>
            {errors['size'] && (
              <span className="invalid-feedback">{errors['size']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Host Name</label>
              <input
                type="text"
                className="form-control"
                value={hostName}
                onChange={(e) => {
                  handleInputChange('hostName')
                  setHostName(e.target.value)
                }}
              />
            </div>
            {errors['hostName'] && (
              <span className="invalid-feedback">{errors['hostName']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => {
                  handleInputChange('username')
                  setUsername(e.target.value)
                }}
              />
            </div>
            {errors['username'] && (
              <span className="invalid-feedback">{errors['username']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  handleInputChange('password')
                  setPassword(e.target.value)
                }}
              />
            </div>
            {errors['password'] && (
              <span className="invalid-feedback">{errors['password']}</span>
            )}
          </div>
          {/* <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Database Name</label>
              <input
                type="text"
                className="form-control"
                value={databaseName}
                onChange={(e) => {
                  handleInputChange('databaseName')
                  setDatabaseName(e.target.value)
                }}
              />
            </div>
            {errors['databaseName'] && (
              <span className="invalid-feedback">{errors['databaseName']}</span>
            )}
          </div> */}
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Is Default</label>
              <select
                className="form-control"
                onChange={(e) => {
                  setIsDefault(e.target.value)
                }}
              >
                <option value="0" selected={isDefault == '0' && true}>
                  No
                </option>
                <option value="1" selected={isDefault == '1' && true}>
                  Yes
                </option>
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
          {edit ? 'Edit' : 'Add'} RDS
          {sending && <Spinner animation="border" size="sm" className="ml-1" />}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
