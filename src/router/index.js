import React, { lazy, Suspense } from 'react'
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom'
const Home = lazy(() => import('@/pages/home'))
const routes = [
  {
    path: '/home',
    component: Home
  }
]

const router = (
  <BrowserRouter>
    <Suspense fallback={''}>
      <Switch>
        {routes.map((route, i) => {
          return <Route component={route.component} exact key={i}
            path={route.path}></Route>
        })}
        <Redirect to="/home"></Redirect>
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default router
