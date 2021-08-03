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
// import SweetAlert from 'react-bootstrap-sweetalert'
import { UserListModal, ServerModal } from '../modals'
// import { data as _data } from './_data'
import { useSelector } from 'react-redux'
import SVG from 'react-inlinesvg'
import { Loader, DeleteModal } from '../../../components'
import { API_URL, convertDate, timeSince } from '../../../config'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function Table(props) {
  const history = useHistory()
  const { authToken } = useSelector((state) => state.auth)

  const [sizePerPage, setSizePerPage] = useState(20)
  const [userListModal, setUserListModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [serverModal, setServerModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  // const [userModal, setServerModal] = useState(false)

  // const [alert, setAlert] = useState(null)

  // document.searchFunction = (key) => {
  //   const value = document.getElementById(key)
  //   console.log(key + ' = ' + value.value)
  // }

  // useEffect(() => {
  //   getTableRecords()
  // }, [])

  // useEffect(() => {
  // if (props.searchString.length > 3) {
  //   setLoading(true)
  //   getTableRecords(props.searchString)
  // } else if (props.searchString.length === 0) {
  //   setLoading(true)
  //   getTableRecords('')
  // }
  // }, [props.searchString])

  useEffect(() => {
    setLoading(true)
    getTableRecords()
    // if (props.filters) {
    //   let search = props.filters.search
    //   let filter = props.filters.filter
    //   let param = `?is_default=${filter}`
    //   if (search.length > 3) {
    //     param += `&filter_value=${search}`
    //     getTableRecords(param)
    //   } else {
    //     setLoading(true)
    //   }
    // }
  }, [props.filters])

  const getParams = () => {
    let filter = props.filters.filter
    let param = `?is_default=${filter}`
    if (props.filters) {
      let search = props.filters.search
      if (search.length) {
        param += `&filter_value=${search}`
      }
    }
    return param
  }

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

  const getTableRecords = async () => {
    // let params = ''
    // if (search) {
    //   params = `?filter_value=${search}`
    // }
    const params = await getParams()

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

  // const deleteRecord = (id) => {

  // }

  // const deleteRecordAlert = (id, name) => {
  //   setAlert(
  //     <SweetAlert
  //       danger
  //       showCancel
  //       confirmBtnText="Yes, delete it!"
  //       confirmBtnBsStyle="danger"
  //       title="Are you sure?"
  //       onConfirm={() => deleteRecord(id)}
  //       onCancel={() => setAlert(null)}
  //     >
  //       You want to delete <b>{name}</b>
  //     </SweetAlert>,
  //   )
  // }

  const changeIsDefault = (id, status) => {
    setLoading(true)
    fetch(`${API_URL}server/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ is_default: status }),
    })
      .then((res) => res.json())
      .then((res) => {
        // setLoading(false)
        if (res.status) {
          getTableRecords()
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      })
      .catch((err) => {
        setLoading(false)
        // onHide()
      })
    // const result = [...data]
    // result.map((item) => {
    //   if (item.id === id) {
    //     item.is_default = status
    //   } else {
    //     item.is_default = false
    //   }
    // })
    // setData(result)
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
      validator: (newValue, row) => {
        if (newValue !== row.name) {
          toast.promise(editInLineRow({ name: newValue }, row.id), {
            loading: 'Saving...',
            success: 'RDS Credentials Updated',
            error: <b>Could not save.</b>,
          })
        }
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
      validator: (newValue, row) => {
        if (newValue !== row.ip_address) {
          toast.promise(editInLineRow({ ip_address: newValue }, row.id), {
            loading: 'Saving...',
            success: 'RDS Credentials Updated',
            error: <b>Could not save.</b>,
          })
        }
      },
      headerSortingClasses,
    },
    {
      dataField: 'instance_type',
      text: 'Instance Type',
      sort: true,
      validator: (newValue, row) => {
        if (newValue !== row.instance_type) {
          toast.promise(editInLineRow({ instance_type: newValue }, row.id), {
            loading: 'Saving...',
            success: 'RDS Credentials Updated',
            error: <b>Could not save.</b>,
          })
        }
      },
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'public_ip_address',
      text: 'Public IP Address',
      sort: true,
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      validator: (newValue, row) => {
        if (newValue !== row.public_ip_address) {
          toast.promise(
            editInLineRow({ public_ip_address: newValue }, row.id),
            {
              loading: 'Saving...',
              success: 'RDS Credentials Updated',
              error: <b>Could not save.</b>,
            },
          )
        }
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
      validator: (newValue, row) => {
        if (newValue !== row.platform) {
          toast.promise(editInLineRow({ platform: newValue }, row.id), {
            loading: 'Saving...',
            success: 'RDS Credentials Updated',
            error: <b>Could not save.</b>,
          })
        }
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
            setSelectedRow(row)
            setUserListModal(true)
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
        return { minWidth: '130px' }
      },
      formatter: (_, row) => (
        <div>
          <span>{convertDate(row.created_at)}</span>
          <br />
          <span className="timeStampColor">({timeSince(row.created_at)})</span>
        </div>
      ),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'updated_at',
      text: 'Updated At',
      editable: false,
      headerStyle: () => {
        return { minWidth: '135px' }
      },
      formatter: (_, row) => (
        <div>
          <span>{convertDate(row.updated_at)}</span>
          <br />
          <span className="timeStampColor">({timeSince(row.updated_at)})</span>
        </div>
      ),
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
            onClick={() => {
              setSelectedRow(row)
              setDeleteModal(true)
            }}
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

  const replaceTableRow = (object, remove = false) => {
    let newArray = []
    data.map((item) => {
      if (item.id === object.id) {
        if (!remove) newArray.push(object)
      } else {
        newArray.push(item)
      }
    })
    setData(newArray)
  }

  const editInLineRow = async (body, id) => {
    // setLoading(true)
    return await fetch(`${API_URL}server/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // setLoading(false)
        if (res.status) {
          // toast.success(res.message)
          // console.log(res)
        } else {
          toast.error(res.message)
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <>
      {/* {alert} */}
      <Toaster />

      <UserListModal
        authToken={authToken}
        id={selectedRow.id}
        show={userListModal}
        onHide={() => setUserListModal(!userListModal)}
      />
      {serverModal && (
        <ServerModal
          show={serverModal}
          onHide={() => setServerModal(!serverModal)}
          edit={true}
          data={selectedRow}
          onSuccess={(message, object) => {
            toast.success(message)
            replaceTableRow(object)
          }}
          onError={(message) => {
            toast.error(message)
          }}
        />
      )}
      <DeleteModal
        show={deleteModal}
        api="server"
        title="Delete Server"
        message="Are you sure to permanently delete this Server?"
        onHide={() => setDeleteModal(!deleteModal)}
        id={selectedRow.id}
        authToken={authToken}
        onSuccess={(message) => {
          toast.success(message)
          replaceTableRow({ id: selectedRow.id }, true)
        }}
        onFailed={(message) => {
          toast.error(message)
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
