import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import cellEditFactory from 'react-bootstrap-table2-editor'
import {
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
  toAbsoluteUrl,
} from '../../../../_metronic/_helpers'
import { Pagination } from '../../../../_metronic/_partials/controls'
import SweetAlert from 'react-bootstrap-sweetalert'
import { UserListModal, RDSModal } from '../modals'
// import { data as _data } from './_data'
import { useSelector } from 'react-redux'
import SVG from 'react-inlinesvg'
import Loader from '../../../components/Loader'
import { API_URL } from '../../../config'

export default function Table(props) {
  const { authToken } = useSelector((state) => state.auth)

  const [sizePerPage, setSizePerPage] = useState(20)
  const [userListModal, seUserListModal] = useState(false)
  const [rdsModal, setRDSModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState({})
  const [data, setData] = useState([])
  const [alert, setAlert] = useState(null)

  // document.searchFunction = (key) => {
  //   const value = document.getElementById(key)
  //   console.log(key + ' = ' + value.value)
  // }

  useEffect(() => {
    getTableRecords()
  }, [])

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true)
      getTableRecords()
    }
  }, [props.reloadList])

  // useEffect(() => {
  //   if (!loading) appendTableHeader()
  // }, [loading])

  // const appendTableHeader = () => {
  //   var d1 = document.getElementsByTagName('thead')[0]

  //   d1.insertAdjacentHTML(
  //     'beforeend',
  //     ` <tr>
  //     <tr>
  //     <td></td>
  //     <td><input
  //      id="searchName"
  //           type="text"
  //           class="form-control form-control-sm"
  //           onInput="document.searchFunction('searchName')"
  //     ></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td><input
  //      id="searchDatabase"
  //           type="text"
  //           class="form-control form-control-sm"
  //           onInput="document.searchFunction('searchDatabase')"
  //     ></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  // </tr>
  // </tr>`,
  //   )
  // }

  const getTableRecords = () => {
    fetch(`${API_URL}rds`, {
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
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  const deleteRecord = (id) => {
    setAlert(null)
    setLoading(true)
    fetch(`${API_URL}rds/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // alert(JSON.stringify(res))
        if (res.code === '200') {
          getTableRecords()
        }
      })
      .catch((err) => {
        setAlert(null)
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
        onConfirm={() => deleteRecord(id)}
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
      text: 'Name',
      headerStyle: () => {
        return { minWidth: '140px' }
      },
      sort: true,
      cellEdit: { blurToSave: true },
      validator: (newValue, row, column) => {
        console.log(newValue)
      },
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'size',
      text: 'Size',
      sort: true,
      validator: (newValue, row, column) => {
        console.log(newValue)
      },
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      headerSortingClasses,
    },
    {
      dataField: 'hostname',
      text: 'Host Name',
      sort: true,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      validator: (newValue, row, column) => {
        console.log(newValue)
      },
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'username',
      text: 'Username',
      sort: true,
      headerStyle: () => {
        return { minWidth: '130px' }
      },
      validator: (newValue, row, column) => {
        console.log(newValue)
      },
      sortCaret: sortCaret,
    },
    {
      dataField: 'password',
      text: 'Password',
      headerStyle: () => {
        return { minWidth: '130px' }
      },
      validator: (newValue, row, column) => {
        console.log(newValue)
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    // {
    //   dataField: 'db_name',
    //   text: 'Database Name',
    //   headerStyle: () => {
    //     return { minWidth: '150px' }
    //   },
    //   validator: (newValue, row, column) => {
    //     console.log(newValue)
    //   },
    //   sort: true,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
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
              setRDSModal(true)
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
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
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
      <RDSModal
        show={rdsModal}
        onHide={() => setRDSModal(!rdsModal)}
        edit={true}
        data={selectedRow}
        onSuccess={(message, object) => {
          setLoading(true)
          getTableRecords()
          setAlert(
            <SweetAlert
              success
              title="Success"
              onConfirm={() => setAlert(null)}
            >
              {message}
            </SweetAlert>,
          )
        }}
      />
      {loading ? (
        <Loader />
      ) : (
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => {
            return (
              <Pagination isLoading={false} paginationProps={paginationProps}>
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
                    return 'No Data to Display'
                  }}
                  defaultSorted={[{ dataField: 'id', order: 'asc' }]}
                  {...paginationTableProps}
                >
                  {/* <PleaseWaitMessage entities={data} /> */}
                </BootstrapTable>
              </Pagination>
            )
          }}
        </PaginationProvider>
      )}
    </>
  )
}
