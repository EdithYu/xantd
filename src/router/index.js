import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import RouteConfig from './routeConfig'
import Home from '@/page/Home'
import NoMatch from '@/page/common/NoMatch'
import { Loadable } from '@/components'

const routes = RouteConfig.map((item) => {
  return (
    <Route
      exact
      key={item.path}
      path={item.path}
      component={Loadable(() => import(`@/page/${item.component}`))}
      name={item.path}
    />
  )
})

const RouterConfig = function () {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
          {
            routes
          }
        <Route path='*' component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
