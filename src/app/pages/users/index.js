import React, { useState } from 'react'
import Table from './Table/index'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from './../../../_metronic/_partials/controls'
import { UserModal } from './modals'
import TableFilter from './Table/Filter'
export default function () {
  const [userModal, setUserModal] = useState(false)

  return (
    <>
      <UserModal show={userModal} onHide={() => setUserModal(!userModal)} />
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
                  onClick={() => setUserModal(true)}
                >
                  Add New User
                </button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Table />
          </CardBody>
        </Card>
      </div>
      {/* </div>
      </div> */}
    </>
  )
}
