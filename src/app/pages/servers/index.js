import React, { useState } from 'react'
import Table from './Table/index'
import {
  Card,
  CardBody,
  CardHeader,
} from './../../../_metronic/_partials/controls'
import { ServerModal } from './modals'
import TableFilter from './Table/Filter'

export default function () {
  const [serverModal, setServerModal] = useState(false)

  return (
    <>
      <ServerModal
        show={serverModal}
        onHide={() => setServerModal(!serverModal)}
      />
      <div>
        <Card>
          <CardHeader className="px-0 mt-4">
            <div className="row col-sm-12">
              <div className="col-sm-10">
                <TableFilter />
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
            <Table />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
