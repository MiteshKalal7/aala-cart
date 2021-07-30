import React from 'react'
import { Route } from 'react-router-dom'
import { CustomersLoadingDialog } from './customers-loading-dialog/CustomersLoadingDialog'
// import { CustomerEditDialog } from './customer-edit-dialog/CustomerEditDialog'
// import { CustomerDeleteDialog } from './customer-delete-dialog/CustomerDeleteDialog'
// import { CustomersDeleteDialog } from './customers-delete-dialog/CustomersDeleteDialog'
// import { CustomersFetchDialog } from './customers-fetch-dialog/CustomersFetchDialog'
// import { CustomersUpdateStateDialog } from './customers-update-status-dialog/CustomersUpdateStateDialog'
import { CustomersUIProvider } from './CustomersUIContext'
import { CustomersCard } from './CustomersCard'

export default function CustomersPage({ history }) {
  return <CustomersCard />
}
