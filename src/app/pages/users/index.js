import React, { useState, useEffect } from 'react'
import Table from './Table/index'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from './../../../_metronic/_partials/controls'
import { UserModal } from './modals'
import TableFilter from './Table/Filter'
import { useSelector } from 'react-redux'
import { API_URL } from '../../config'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function () {
  const history = useHistory()

  const { authToken } = useSelector((state) => state.auth)
  const [userModal, setUserModal] = useState(false)
  const [rdsList, setRdsList] = useState([])
  const [serverList, setServerList] = useState([])
  const [createdSuccess, setCreatedSuccess] = useState(false)
  const [filters, setFilters] = useState({ search: '', filter: '' })

  useEffect(() => {
    getList('rds')
    getList('server')
  }, [])

  const getList = (api) => {
    fetch(`${API_URL}${api}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === '200') {
          if (api === 'rds') setRdsList(res.data)
          else if (api === 'server') setServerList(res.data)
        } else if (res.status === 401) {
          history.push('/logout')
        }
      })
  }

  return (
    <>
      <Toaster />

      <UserModal
        show={userModal}
        authToken={authToken}
        rdsList={rdsList}
        serverList={serverList}
        onSuccess={(message) => {
          setCreatedSuccess(true)
          toast.success(message)
        }}
        onError={(message) => {
          toast.error(message)
        }}
        onHide={() => setUserModal(!userModal)}
      />
      {/* <div className="row">
        <div class="col-md-12"> */}
      <div>
        <Card>
          <CardHeader className="px-0 mt-4">
            <div className="row col-sm-12">
              <div className="col-sm-10">
                <TableFilter rdsList={rdsList} serverList={serverList} />
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setUserModal(true)}
                >
                  Add New User
                </button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              authToken={authToken}
              rdsList={rdsList}
              serverList={serverList}
            />
          </CardBody>
        </Card>
      </div>
      {/* </div>
      </div> */}
    </>
  )
}
