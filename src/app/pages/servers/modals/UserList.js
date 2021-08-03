import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { API_URL } from '../../../config'
import Loader from '../../../components/Loader'

export default function ({ show, onHide, authToken, id }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    if (id) {
      setLoading(true)
      getTableRecords()
    }
  }, [id])

  const getTableRecords = () => {
    fetch(`${API_URL}server/assigned/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        console.log(res)
        if (res.code === '200') {
          setData(res.data)
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>All Users</Modal.Title>
        <button type="button" className="close ml-auto" onClick={onHide}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : (
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
              {data.length > 0 ? (
                <>
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.avg_sku}</td>
                          <td>{item.avg_order_per_day}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={2}>Total</th>
                      <th>0</th>
                      <th>0</th>
                    </tr>
                  </tfoot>
                </>
              ) : (
                <p>No records found</p>
              )}
            </table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
