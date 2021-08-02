import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import {
  sortCaret,
  headerSortingClasses,
  toAbsoluteUrl,
} from './../../../../_metronic/_helpers'
import { Pagination } from './../../../../_metronic/_partials/controls'
import SweetAlert from 'react-bootstrap-sweetalert'
import cellEditFactory from 'react-bootstrap-table2-editor'
// import TableFilter from './Filter'
// import { data } from './_data'
import Loader from '../../../components/Loader'
import { PaymentHistoryModal, UserModal } from './../modals'
import SVG from 'react-inlinesvg'
import { API_URL } from '../../../config'
import { OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Table() {
  const history = useHistory()
  const { authToken } = useSelector((state) => state.auth)
  const [sizePerPage, setSizePerPage] = useState(5)
  const [paymentModal, setPaymentModal] = useState(false)
  const [userModal, setUserModal] = useState(false)
  const [data, setData] = useState([])
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState({})

  // document.searchFunction = (key) => {
  //   const value = document.getElementById(key)
  //   console.log(key + ' = ' + value.value)
  // }

  // useEffect(() => {
  //   if (!loading) appendTableHeader()
  // }, [loading])

  // const appendTableHeader = () => {
  //   var d1 = document.getElementsByTagName('thead')[0]

  //   d1.insertAdjacentHTML(
  //     'beforeend',
  //     `<tr>
  //     <td></td>
  //     <td>
  //       <input
  //         id="searchUser"
  //         type="text"
  //         class="form-control form-control-sm"
  //         onInput="document.searchFunction('searchUser')"
  //       />
  //     </td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td>
  //       <input
  //       id="searchRDS"
  //       type="text"
  //       class="form-control form-control-sm"
  //       onInput="document.searchFunction('searchRDS')"
  //       />
  //     </td>
  //     <td>
  //       <input
  //       id="searchServer"
  //       type="text"
  //       class="form-control form-control-sm"
  //       onInput="document.searchFunction('searchServer')"
  //       />
  //     </td>
  //     <td></td>
  //   </tr>`,
  //   )
  // }

  useEffect(() => {
    getTableRecords()
  }, [])

  const getTableRecords = () => {
    const params = ''
    fetch(`${API_URL}user${params}`, {
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
      text: 'User',
      sort: true,
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '100px' }
      },
      formatter: (_, row) => (
        <span style={{ width: '130px' }} class="d-block">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40 symbol-sm flex-shrink-0">
              <img class="" src="/media/users/100_9.jpg" alt="photo" />
            </div>
            <div class="ml-4">
              <div class="text-dark-75 font-weight-bolder font-size-lg mb-0">
                {row.name}
              </div>
            </div>
          </div>
        </span>
      ),
      headerSortingClasses,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      headerSortingClasses,
    },
    {
      dataField: 'active_plan',
      text: 'Active Plan',
      sort: true,
      sortCaret: sortCaret,
      editable: false,
      headerStyle: () => {
        return { minWidth: '70px' }
      },
      formatter: (_, row) => (
        <ButtonToolbar>
          <OverlayTrigger
            placement={'right'}
            overlay={
              <Tooltip id={`tooltip-right`}>
                {/* <ul> */}
                {row.plan &&
                  row.plan.map((item, i) => (
                    <>
                      <span>{item}</span>
                      {row.plan.length !== ++i && <hr />}
                    </>
                  ))}
                {/* </ul> */}
              </Tooltip>
            }
          >
            <b>
              <a href="#">{row.active_plan}</a>
            </b>
          </OverlayTrigger>
        </ButtonToolbar>
      ),
      headerSortingClasses,
    },
    {
      dataField: 'status',
      text: 'Current Status',
      sort: true,
      sortCaret: sortCaret,
      editable: false,
      headerStyle: () => {
        return { minWidth: '100px' }
      },
      formatter: (_, row) => (
        <span class="label label-lg label-light-success label-inline">
          <b>Active</b>
        </span>
      ),
      headerSortingClasses,
    },
    {
      text: 'Payment History',
      sortCaret: sortCaret,
      editable: false,
      formatter: (_, row) => (
        <span>
          <a
            class="btn btn-sm btn-default btn-text-primary btn-icon"
            title="Payment Details"
            onClick={() => {
              setPaymentModal(true)
            }}
          >
            <span class="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Shopping/Dollar.svg')}
              />
            </span>
          </a>
        </span>
      ),
      headerSortingClasses,
    },
    {
      dataField: 'seller_name',
      text: 'Seller Name',
      sort: true,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      sortCaret: sortCaret,
      // formatter: (_, row) => <span class="d-flex">lorem ipsum</span>,
    },
    {
      dataField: 'contact_no',
      text: 'Contact No',
      headerStyle: () => {
        return { minWidth: '140px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'rds',
      text: 'RDS',
      editable: false,
      sort: true,
      headerStyle: () => {
        return { minWidth: '130px' }
      },
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <a href="javascript:;">
          <u>
            <b>Test RDS</b>
          </u>
        </a>
      ),
    },
    {
      dataField: 'server',
      text: 'Server',
      editable: false,
      sort: true,
      headerStyle: () => {
        return { minWidth: '130px' }
      },
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <a href="javascript:;">
          <u>
            <b>Test Server</b>
          </u>
        </a>
      ),
    },
    {
      dataField: 'is_enable',
      text: 'Enable/Disable Login',
      editable: false,
      sort: true,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <span class="switch switch-sm">
          <label>
            <input type="checkbox" id="b1" name="email_notification_1" />
            <span></span>
          </label>
        </span>
      ),
    },
    {
      dataField: 'avg_order_per_day',
      text: 'Avg order per day',
      editable: false,
      headerStyle: () => {
        return { minWidth: '100px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'avg_sku',
      text: 'Avg sku',
      editable: false,
      headerStyle: () => {
        return { minWidth: '100px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'total_sales',
      text: 'Total Sales',
      editable: false,
      headerStyle: () => {
        return { minWidth: '110px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'total_spend',
      text: 'Total Spend',
      editable: false,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
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
      dataField: 'id',
      text: 'Switch User',
      editable: false,
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <span>
          <a href="javascript:;" class="d-flex align-items-center">
            <span class="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Navigation/Sign-in.svg')}
              />
            </span>
            <span
              class="font-weight-bold text-dark ml-2"
              style={{ width: '80px' }}
            >
              Switch User
            </span>
          </a>
        </span>
      ),
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      editable: false,
      formatter: (_, row) => (
        <a
          title="Edit User"
          className="btn btn-icon btn-light btn-hover-primary btn-sm d-flex ml-auto mr-auto"
          onClick={() => {
            setSelectedRow(row)
            setUserModal(true)
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            />
          </span>
        </a>
      ),
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
      <PaymentHistoryModal
        show={paymentModal}
        onHide={() => setPaymentModal(!paymentModal)}
      />
      <UserModal
        show={userModal}
        onHide={() => setUserModal(!userModal)}
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
