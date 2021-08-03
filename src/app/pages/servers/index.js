import React, { useState } from 'react'
import Table from './Table/index'
import {
  Card,
  CardBody,
  CardHeader,
} from './../../../_metronic/_partials/controls'
import { ServerModal } from './modals'
import TableFilter from './Table/Filter'
import toast, { Toaster } from 'react-hot-toast'

export default function () {
  const [serverModal, setServerModal] = useState(false)
  const [createdSuccess, setCreatedSuccess] = useState(false)
  const [filters, setFilters] = useState({ search: '', filter: '' })

  return (
    <>
      <Toaster />

      <ServerModal
        show={serverModal}
        onHide={() => setServerModal(!serverModal)}
        onSuccess={(message) => {
          setCreatedSuccess(true)
          toast.success(message)
        }}
      />
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
                  onClick={() => setServerModal(true)}
                >
                  Add New Server
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <Table reloadList={createdSuccess} filters={filters} />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
