import React, { useState } from 'react'
import Table from './Table/index'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../_metronic/_partials/controls'
import { SchedulerModal } from './modals'
import TableFilter from './Table/Filter'

export default function () {
  const [schedulerModal, setSchedulerModal] = useState(false)

  return (
    <>
      <SchedulerModal
        show={schedulerModal}
        onHide={() => setSchedulerModal(!schedulerModal)}
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
                  onClick={() => setSchedulerModal(true)}
                >
                  Add New Scheduler
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
