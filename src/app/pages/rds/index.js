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
import SweetAlert from 'react-bootstrap-sweetalert'

export default function () {
  const [rdsModal, setRDSModal] = useState(false)
  const [alert, setAlert] = useState(null)
  const [createdSuccess, setCreatedSuccess] = useState(false)

  return (
    <>
      {alert}

      <RDSModal
        show={rdsModal}
        onHide={() => setRDSModal(!rdsModal)}
        onSuccess={(message) => {
          setCreatedSuccess(true)
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
      {/* <div className="row">
        <div class="col-md-12"> */}
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
                  onClick={() => setRDSModal(true)}
                >
                  Add New RDS
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <Table reloadList={createdSuccess} />
          </CardBody>
        </Card>
      </div>
      {/* </div>
      </div> */}
    </>
  )
}
