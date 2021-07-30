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
} from '../../../../_metronic/_helpers'
import { Pagination } from '../../../../_metronic/_partials/controls'
// import { columns } from './TableColumn'
import { data } from './_data1'
import SweetAlert from 'react-bootstrap-sweetalert'
import cellEditFactory from 'react-bootstrap-table2-editor'
import Loader from '../../../components/Loader'
import { PlanModal } from '../modals'
// import TableFilter from './Filter'
import SVG from 'react-inlinesvg'

export default function Table() {
  const listLoading = false

  const [sizePerPage, setSizePerPage] = useState(5)
  const [planModal, setPlanModal] = useState(false)
  const [data_, setData] = useState([])
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState({})

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
        return { minWidth: '150px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: 'pricing',
      text: 'Pricing',
      editable: false,
      headerStyle: () => {
        return { minWidth: '120px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'description',
      text: 'Description',
      headerStyle: () => {
        return { minWidth: '300px' }
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
            onClick={() => setPlanModal(true)}
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
            onClick={() => console.log(row.id)}
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

  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

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
      <PlanModal
        show={planModal}
        onHide={() => setPlanModal(!planModal)}
        edit={true}
      />
      {loading ? (
        <Loader />
      ) : (
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => {
            return (
              <Pagination
                isLoading={listLoading}
                paginationProps={paginationProps}
              >
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
                  {/* <PleaseWaitMessage data={data} /> */}
                </BootstrapTable>
              </Pagination>
            )
          }}
        </PaginationProvider>
      )}
    </>
  )
}
