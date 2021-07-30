import React, { useState } from 'react'
import { PlanTable, CouponTable } from './Table'
import { Card, CardBody } from './../../../_metronic/_partials/controls'
import { PlanModal, CouponModal } from './modals'
import { Tab, Nav, Row } from 'react-bootstrap'
import PlanFilter from './Table/PlanFilter'
import CouponFilter from './Table/CouponFilter'

export default function () {
  const [planModal, setPlanModal] = useState(false)
  const [couponModal, setCouponModal] = useState(false)

  return (
    <>
      <PlanModal show={planModal} onHide={() => setPlanModal(!planModal)} />
      <CouponModal
        show={couponModal}
        onHide={() => setCouponModal(!couponModal)}
      />

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div>
          <Nav variant="pills" className="">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <span class="nav-icon">
                  <i class="flaticon-user-ok"></i>
                </span>
                <span class="nav-text">Plans</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" className="ml-2">
                <span class="nav-icon">
                  <i class="flaticon-layers"></i>
                </span>
                <span class="nav-text">Coupons</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <br />
        <div>
          <Tab.Content style={{ backgroundColor: 'transparent' }}>
            <>
              <Tab.Pane eventKey="first">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-custom card-stretch gutter-b">
                      <div class="card-header align-items-center px-0 mt-4">
                        <div className="row col-sm-12">
                          <div className="col-sm-10">
                            <PlanFilter />
                          </div>
                          <div className="ml-auto">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => setPlanModal(true)}
                            >
                              Add New Plan
                            </button>
                          </div>
                        </div>
                      </div>
                      <CardBody>
                        <PlanTable />
                      </CardBody>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-custom card-stretch gutter-b">
                      <div class="card-header align-items-center px-0 mt-4">
                        <div className="row col-sm-12">
                          <div className="col-sm-10">
                            <CouponFilter />
                          </div>
                          <div className="ml-auto">
                            <button
                              class="btn btn-primary px-5"
                              onClick={() => setCouponModal(true)}
                            >
                              Add New Coupon
                            </button>
                          </div>
                        </div>
                      </div>
                      <CardBody>
                        <CouponTable />
                      </CardBody>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </>
          </Tab.Content>
        </div>
      </Tab.Container>

      {/* <Card>
        <CardHeader title="Server list">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setPlanModal(true)}
            >
              Add New Server
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Table />
        </CardBody>
      </Card> */}
    </>
  )
}
