import React, { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { API_URL } from '../../../config'
import { useSelector } from 'react-redux'

export default function ({
  show,
  onHide,
  data,
  edit = false,
  onSuccess,
  onError,
}) {
  const { authToken } = useSelector((state) => state.auth)

  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  // const [alert, setAlert] = useState(null)
  const [name, setName] = useState('')
  const [ipAddress, setIpAddress] = useState('')
  const [instanceType, setInstanceType] = useState('')
  const [publicIpAddress, setPublicIpAddress] = useState('')
  const [platform, setPlatform] = useState('')
  const [isDefault, setIsDefault] = useState('')

  useEffect(() => {
    if (data) {
      setName(data.name)
      setIpAddress(data.ip_address)
      setInstanceType(data.instance_type)
      setPublicIpAddress(data.public_ip_address)
      setPlatform(data.platform)
      setIsDefault(data.is_default)
    }
  }, [data])

  const onSubmit = () => {
    if (!name || !ipAddress || !instanceType || !publicIpAddress || !platform) {
      let err = {}
      let message = 'This field is required!'
      err['name'] = !name ? message : false
      err['ipAddress'] = !ipAddress ? message : false
      err['instanceType'] = !instanceType ? message : false
      err['publicIpAddress'] = !publicIpAddress ? message : false
      err['platform'] = !platform ? message : false
      console.log(err)
      setErrors(err)
    } else {
      setSending(true)
      const body = {
        name: name,
        ip_address: ipAddress,
        public_ip_address: publicIpAddress,
        instance_type: instanceType,
        platform: platform,
        is_default: isDefault,
      }
      fetch(`${API_URL}server${data ? '/' + data.id : ''}`, {
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
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {edit ? 'Edit' : 'Add'} Server
        </Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Server Name</label>
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
              <label>IP address</label>
              <input
                type="text"
                className="form-control"
                value={ipAddress}
                onChange={(e) => {
                  handleInputChange('ipAddress')
                  setIpAddress(e.target.value)
                }}
              />
            </div>
            {errors['ipAddress'] && (
              <span className="invalid-feedback">{errors['ipAddress']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Instance Type</label>
              <input
                type="text"
                className="form-control"
                value={instanceType}
                onChange={(e) => {
                  handleInputChange('instanceType')
                  setInstanceType(e.target.value)
                }}
              />
            </div>
            {errors['instanceType'] && (
              <span className="invalid-feedback">{errors['instanceType']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Public IP Address</label>
              <input
                type="text"
                className="form-control"
                value={publicIpAddress}
                onChange={(e) => {
                  handleInputChange('publicIpAddress')
                  setPublicIpAddress(e.target.value)
                }}
              />
            </div>
            {errors['publicIpAddress'] && (
              <span className="invalid-feedback">
                {errors['publicIpAddress']}
              </span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Platform</label>
              <input
                type="text"
                className="form-control"
                value={platform}
                onChange={(e) => {
                  handleInputChange('platform')
                  setPlatform(e.target.value)
                }}
              />
            </div>
            {errors['platform'] && (
              <span className="invalid-feedback">{errors['platform']}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="form-group is-invalid mb-0 mt-5">
              <label>Is default</label>
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
          {edit ? 'Edit' : 'Add'} Server
          {sending && <Spinner animation="border" size="sm" className="ml-1" />}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
