import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import RouteConfig from './routeConfig'
// import loadable from '@/commons/utils/loadable'
import Home from '@/page/Home'
import NoMatch from '@/page/common/NoMatch'

const routes = RouteConfig.map((item) => {
  return (
    <Route
      exact
      key={item.path}
      path={item.path}
      component={() => import(`@/page/${item.component}`)}
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
