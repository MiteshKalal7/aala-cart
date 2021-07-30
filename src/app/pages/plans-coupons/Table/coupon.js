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
import { entities } from './_data2'
import { CouponModal } from '../modals'
import SVG from 'react-inlinesvg'

export default function Table() {
  const listLoading = false

  const [sizePerPage, setSizePerPage] = useState(5)
  const [couponModal, setCouponModal] = useState(false)

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
      dataField: 'coupon_code',
      text: 'Coupon Code',
      headerStyle: () => {
        return { minWidth: '150px' }
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'plan_name',
      text: 'Plan Name',
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
      formatter: (_, row) => (
        <>
          <a
            title="Edit Server"
            className="btn btn-icon btn-light btn-hover-primary btn-sm"
            onClick={() => setCouponModal(true)}
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

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: entities.length,
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
      <CouponModal
        show={couponModal}
        onHide={() => setCouponModal(!couponModal)}
        edit={true}
      />
      {/* <TableFilter /> */}
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
                data={entities === null ? [] : entities}
                columns={columns}
                noDataIndication={() => {
                  return <div>No Data to Display</div>
                }}
                defaultSorted={[{ dataField: 'id', order: 'asc' }]}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          )
        }}
      </PaginationProvider>
    </>
  )
}
