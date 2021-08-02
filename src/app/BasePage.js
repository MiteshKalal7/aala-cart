import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'
// import { BuilderPage } from './pages/BuilderPage'
// import { MyPage } from './pages/MyPage'
// import { DashboardPage } from './pages/Page'
import {
  Users,
  Dashboard,
  Servers,
  RDS,
  PlansAndCoupons,
  DataScheduler,
} from './pages'
// import Users from './modules/Users'

// const GoogleMaterialPage = lazy(() =>
//   import('./modules/GoogleMaterialExamples/GoogleMaterialPage'),
// )
// const ReactBootstrapPage = lazy(() =>
//   import('./modules/ReactBootstrapExamples/ReactBootstrapPage'),
// )
// const ECommercePage = lazy(() =>
//   import('./modules/ECommerce/pages/eCommercePage'),
// )
// const Users = lazy(() => import('./modules/Users'))
const UserProfilepage = lazy(() =>
  import('./modules/UserProfile/UserProfilePage'),
)

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  let userData = localStorage.getItem('userData')
  userData = JSON.parse(userData)

  let isAdmin = userData && userData.user_type === 1 ? true : false

  // console.log(isAdmin)

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={Dashboard} />
        {isAdmin ? (
          <>
            <ContentRoute path="/users" component={Users} />
            <ContentRoute path="/manage-server" component={Servers} />
            <ContentRoute path="/manage-rds" component={RDS} />
            <ContentRoute path="/plans-coupon" component={PlansAndCoupons} />
          </>
        ) : (
          <>
            <ContentRoute path="/data-scheduler" component={DataScheduler} />
          </>
        )}

        {/* <ContentRoute path="/builder" component={BuilderPage} /> */}
        {/* <ContentRoute path="/my-page" component={MyPage} /> */}
        {/* <Route path="/google-material" component={GoogleMaterialPage} /> */}
        {/* <Route path="/react-bootstrap" component={ReactBootstrapPage} /> */}
        {/* <Route path="/e-commerce" component={ECommercePage} /> */}
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  )
}
