import React, { useState, useStatus } from 'react'
import Table from './Table/index'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../_metronic/_partials/controls'
import { RDSModal } from './modals'
import TableFilter from './Table/Filter'
// import SweetAlert from 'react-bootstrap-sweetalert'
import toast, { Toaster } from 'react-hot-toast'

export default function () {
  const [rdsModal, setRDSModal] = useState(false)
  // const [alert, setAlert] = useState(null)
  // const [searchString, setSearchString] = useState('')
  // const [filterValue, setFilterValue] = useState('all')
  const [createdSuccess, setCreatedSuccess] = useState(false)
  const [filters, setFilters] = useState({ search: '', filter: '' })

  return (
    <>
      {/* {alert} */}
      <Toaster />

      <RDSModal
        show={rdsModal}
        onHide={() => setRDSModal(!rdsModal)}
        onSuccess={(message) => {
          setCreatedSuccess(true)
          toast.success(message)
        }}
      />
      {/* <div className="row">
        <div class="col-md-12"> */}
      <div>
        <Card>
          <CardHeader className="px-0 mt-4">
            <div className="row col-sm-12">
              <div className="col-sm-10">
                <TableFilter
                  searchString={filters.search}
                  filterValue={filters.filter}
                  setSearchString={(value) => {
                    let obj = { ...filters }
                    obj.search = value
                    setFilters(obj)
                  }}
                  setFilterValue={(value) => {
                    let obj = { ...filters }
                    obj.filter = value
                    setFilters(obj)
                  }}
                />
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setRDSModal(true)}
                >
                  Add New RDS
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <Table
              // searchString={searchString}
              reloadList={createdSuccess}
              filters={filters}
            />
          </CardBody>
        </Card>
      </div>
      {/* </div>
      </div> */}
    </>
  )
}
