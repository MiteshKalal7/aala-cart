import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { API_URL } from '../../../config'

export default function ({ id, show, onHide, authToken, onSuccess, onFailed }) {
  const [sending, setSending] = useState(false)

  const deleteCustomer = () => {
    setSending(true)
    fetch(`${API_URL}rds/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSending(false)
        // alert(JSON.stringify(res))
        if (res.code === '200') {
          onSuccess(res.message)
        } else {
          onFailed(res.message)
        }
        onHide()
      })
      .catch((err) => {
        setSending(false)
      })
    // onSuccess('delete sucess' + id)
    // server request for deleting customer by id
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">RDS Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure to permanently delete this RDS?</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCustomer}
            disabled={sending}
            className="btn btn-danger btn-elevate"
          >
            Delete
            {sending && (
              <Spinner animation="border" size="sm" className="ml-1" />
            )}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
