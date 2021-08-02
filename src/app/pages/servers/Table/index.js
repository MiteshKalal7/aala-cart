import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import {
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
  toAbsoluteUrl,
} from './../../../../_metronic/_helpers'
import { Pagination } from './../../../../_metronic/_partials/controls'
import cellEditFactory from 'react-bootstrap-table2-editor'
import { data as data_ } from './_data'
import { UserListModal, ServerModal } from './../modals'
import SweetAlert from 'react-bootstrap-sweetalert'
import Loader from '../../../components/Loader'
import SVG from 'react-inlinesvg'
import { API_URL } from '../../../config'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Table() {
  const history = useHistory()
  const { authToken } = useSelector((state) => state.auth)

  const [sizePerPage, setSizePerPage] = useState(5)
  const [userListModal, seUserListModal] = useState(false)
  const [userModal, setServerModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(data_)
  const [alert, setAlert] = useState(null)
  const [selectedRow, setSelectedRow] = useState({})

  // document.searchFunction = (key) => {
  //   const value = document.getElementById(key)
  //   console.log(key + ' = ' + value.value)
  // }

  useEffect(() => {
    getTableRecords()
  }, [])

  // useEffect(() => {
  //   if (!loading) appendTableHeader()
  // }, [loading])

  // const appendTableHeader = () => {
  //   var d1 = document.getElementsByTagName('thead')[0]

  //   d1.insertAdjacentHTML(
  //     'beforeend',
  //     ` <tr>
  //     <td></td>
  //     <td><input
  //           id="searchServer"
  //           type="text"
  //           class="form-control form-control-sm"
  //           onInput="document.searchFunction('searchServer')">
  //           </td>
  //     <td></td>
  //     <td><input
  //           id="searchInstanceType"
  //           type="text"
  //           class="form-control form-control-sm"
  //           onInput="document.searchFunction('searchInstanceType')">
  //           </td>
  //     <td></td>
  //     <td><input
  //           id="searchPlatform"
  //           type="text"
  //           class="form-control form-control-sm"
  //           onInput="document.searchFunction('searchPlatform')">
  //           </td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  // </tr>`,
  //   )
  // }

  const getTableRecords = () => {
    const params = ''
    fetch(`${API_URL}server${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if (res.code === '200') {
          setData(res.data)
        } else if (res.status === 401) {
          history.push('/logout')
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  const deleteRecordAlert = (id, name) => {
    setAlert(
      <SweetAlert
        danger
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
      >
        You want to delete <b>{name}</b>
      </SweetAlert>,
    )
  }

  const changeIsDefault = (id, status) => {
    const result = [...data]
    result.map((item) => {
      if (item.id === id) {
        item.is_default = status
      } else {
        item.is_default = false
      }
    })
    setData(result)
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '60px' }
      },
      headerSortingClasses,
    },
    {
      dataField: 'name',
      text: 'Server name',
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'ip_address',
      text: 'IP address',
      sort: true,
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '130px' }
      },
      headerSortingClasses,
    },
    {
      dataField: 'instance_type',
      text: 'Instance Type',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'puplic_ip_address',
      text: 'Public IP Address',
      sort: true,
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      sortCaret: sortCaret,
      // formatter: (_, row) => <span class="d-flex">lorem ipsum</span>,
    },
    {
      dataField: 'platform',
      text: 'Platform',
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'is_default',
      text: 'Is default',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { minWidth: '100px' }
      },
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <span class="switch switch-sm">
          <label>
            <input
              type="checkbox"
              name="email_notification_1"
              onChange={(e) => {
                changeIsDefault(row.id, e.target.checked)
              }}
              checked={row.is_default ? true : false}
            />
            <span></span>
          </label>
        </span>
      ),
    },
    {
      dataField: 'user',
      text: 'Users',
      editable: false,
      headerStyle: () => {
        return { minWidth: '130px' }
      },
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <a
          href="#"
          onClick={() => {
            seUserListModal(true)
          }}
        >
          <u>
            <b>Show All Users</b>
          </u>
        </a>
      ),
    },
    {
      dataField: 'created_at',
      text: 'Created At',
      editable: false,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'updated_at',
      text: 'Updated At',
      editable: false,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      editable: false,
      formatter: (_, row) => (
        <>
          <a
            title="Edit Server"
            className="btn btn-icon btn-light btn-hover-primary btn-sm"
            onClick={() => {
              setSelectedRow(row)
              setServerModal(true)
            }}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
              />
            </span>
          </a>
          <> </>

          <a
            title="Delete Server"
            className="btn btn-icon btn-light btn-hover-danger btn-sm"
            onClick={() => deleteRecordAlert(row.id, row.name)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
            </span>
          </a>
        </>
      ),
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ]

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: data.length,
    sizePerPage: sizePerPage,
    sizePerPageList: [
      { text: '3', value: 3 },
      { text: '5', value: 5 },
      { text: '10', value: 10 },
    ],
    page: 1,
    onSizePerPageChange: (e) => {
      setSizePerPage(e)
    },
  }

  return (
    <>
      {alert}
      <UserListModal
        show={userListModal}
        onHide={() => seUserListModal(!userListModal)}
      />
      <ServerModal
        show={userModal}
        onHide={() => setServerModal(!userModal)}
        edit={true}
        data={selectedRow}
        onSuccess={(name) =>
          setAlert(
            <SweetAlert
              success
              title="Success"
              onConfirm={() => setAlert(null)}
            >
              <b>{name}</b> Edited successfully.
            </SweetAlert>,
          )
        }
      />
      {loading ? (
        <Loader />
      ) : (
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => {
            return (
              <Pagination isLoading={loading} paginationProps={paginationProps}>
                <BootstrapTable
                  wrapperClasses="table-responsive"
                  bordered={false}
                  classes="table table-head-custom table-vertical-center overflow-hidden"
                  id="userTable"
                  bootstrap4
                  keyField="id"
                  data={data === null ? [] : data}
                  columns={columns}
                  cellEdit={cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                  })}
                  noDataIndication={() => {
                    return <div>No Data to Display</div>
                  }}
                  defaultSorted={[{ dataField: 'id', order: 'asc' }]}
                  {...paginationTableProps}
                >
                  <PleaseWaitMessage entities={data} />
                </BootstrapTable>
              </Pagination>
            )
          }}
        </PaginationProvider>
      )}
    </>
  )
}
