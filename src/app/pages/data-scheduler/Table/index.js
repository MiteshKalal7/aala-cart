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
import { DataLogsModal, SchedulerModal, SyncWithModal } from '../modals'
// import TableFilter from './Filter'
import { data } from './_data'
import SVG from 'react-inlinesvg'
import Loader from '../../../components/Loader'
import { API_URL } from '../../../config'

export default function Table() {
  const [sizePerPage, setSizePerPage] = useState(5)
  const [dataLogsModal, setDataLogsModal] = useState(false)
  const [schedulerModal, setSchedulerModal] = useState(false)
  const [syncWith, setSyncWith] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [data_, setData] = useState([])
  const [alert, setAlert] = useState(null)

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
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)

        if (res.code === '200') {
          setData(res.data)
        } else {
          alert(res.message)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const deleteRecord = (id) => {
    fetch(`${API_URL}rds/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAlert(null)
        alert(JSON.stringify(res))
        // if (res.code === '200') {
        //   setData(res.data)
        // } else {
        //   alert(res.message)
        // }
      })
      .catch((err) => {
        setAlert(null)
        console.log(err)
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
      dataField: 'channel',
      text: 'Channel',
      formatter: (_, row) => <img src={row.channel} width="20" />,
      editable: false,
      headerSortingClasses,
    },
    {
      dataField: 'marketplace',
      text: 'Marketplace',
      formatter: (_, row) => (
        <img src={row.marketplace} width="40" style={{ borderRadius: '3px' }} />
      ),
      editable: false,
      headerSortingClasses,
    },
    {
      dataField: 'report_type',
      text: 'Report Type',
      sort: true,
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      headerSortingClasses,
    },
    {
      dataField: 'hostname',
      text: 'Report/Data',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      formatter: (_, row) => (
        <a href="#">
          <u>
            <b>{row.report_data}</b>
          </u>
        </a>
      ),
      validator: (newValue, row, column) => {
        console.log(newValue)
      },
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'interval',
      text: 'Time Interval',
      sort: true,
      editable: false,
      formatter: (_, row) => (
        <select
          className="form-control form-control-sm"
          style={{ width: '100px' }}
        >
          <option value="">45 Min</option>
          <option value="">1 hour</option>
          <option value="">2 hour</option>
          <option value="">6 hour</option>
          <option value="">24 hour</option>
        </select>
      ),
      sortCaret: sortCaret,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      headerSortingClasses,
    },
    {
      dataField: 'schedule_type',
      text: 'Schedule Type',
      editable: false,
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      sortCaret: sortCaret,
    },
    {
      dataField: 'is_active',
      text: 'Active/Inactive',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { minWidth: '140px' }
      },
      sortCaret: sortCaret,
      formatter: (_, row) => (
        <span class="switch switch-sm">
          <label>
            <input
              type="checkbox"
              name="email_notification_1"
              checked={row.is_default == '1' ? true : false}
            />
            <span></span>
          </label>
        </span>
      ),
    },
    {
      dataField: 'next_schedule_type',
      text: 'Next Scheduled Time',
      editable: false,
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      sortCaret: sortCaret,
    },
    {
      dataField: '',
      text: 'Sync with',
      // sort: true,
      editable: false,
      // headerStyle: () => {
      //   return { minWidth: '100px' }
      // },
      // sortCaret: sortCaret,
      formatter: (_, row) => (
        <div className="d-flex ">
          <a
            href="#"
            className="mr-4"
            title="Google Sheets"
            onClick={() => setSyncWith(true)}
          >
            <u>
              <img
                src={toAbsoluteUrl('/media/icon1.png')}
                style={{ width: '30px' }}
                alt=""
              />
            </u>
          </a>
          <a
            href="#"
            className="mr-4"
            data-toggle="tooltip"
            title=""
            style={{ cursor: 'no-drop', opacity: '.6' }}
            data-original-title="Google Data Studio"
          >
            <img
              src={toAbsoluteUrl('/media/icon4.png')}
              style={{ width: '30px' }}
              alt=""
            />
          </a>
          <a
            href="#"
            className="mr-4"
            data-toggle="tooltip"
            title=""
            style={{ cursor: 'no-drop', opacity: '.6' }}
            data-original-title="Power BI"
          >
            <img
              src={toAbsoluteUrl('/media/icon3.png')}
              style={{ width: '30px' }}
              alt=""
            />
          </a>
          <a
            href="#"
            data-toggle="tooltip"
            title=""
            style={{ cursor: 'no-drop', opacity: '.6' }}
            data-original-title="Airtable"
          >
            <img
              src={toAbsoluteUrl('/media/icon2.png')}
              style={{ width: '30px' }}
              alt=""
            />
          </a>
        </div>
      ),
    },
    {
      text: 'Data Logs',
      sortCaret: sortCaret,
      editable: false,
      formatter: (_, row) => (
        <span>
          <a
            class="btn btn-sm btn-default btn-text-primary btn-icon btn-hover-primary"
            title="Data Logs"
            onClick={() => {
              setSelectedRow(row)
              setDataLogsModal(true)
            }}
          >
            <span class="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Code/Time-schedule.svg')}
              />
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
        <>
          <a
            title="Edit Scheduler"
            className="btn btn-icon btn-light btn-hover-primary btn-sm"
            onClick={() => {
              setSelectedRow(row)
              setSchedulerModal(true)
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
            onClick={() => deleteRecordAlert(row.id, row.report_data)}
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
      <DataLogsModal
        show={dataLogsModal}
        onHide={() => setDataLogsModal(false)}
        data={selectedRow}
      />

      <SyncWithModal show={syncWith} onHide={() => setSyncWith(false)} />
      <SchedulerModal
        show={schedulerModal}
        onHide={() => setSchedulerModal(false)}
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
