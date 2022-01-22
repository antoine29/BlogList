import React from 'react'
import { Switch, Route, BrowserRouter as Router, HashRouter } from 'react-router-dom'
import SignInForm from './components/SignForms//SignInForm'
import SignUpForm from './components/SignForms/SignUpForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import FullBlog from './components/FullBlog'
import Error503 from './components/ErrorPages/Error503'
import Error404 from './components/ErrorPages/Error404'
import PrivateRoute from './PrivateRoute'
import { getRouterType } from './utils/utils'

const AppSwitch = () =>
  <Switch>
    <Route path='/signin'>
      <SignInForm />
    </Route>
    <Route path='/signup'>
      <SignUpForm />
    </Route>
    <Route path='/blogs/:id' >
      <FullBlog />
    </Route>
    <Route path='/blogs'>
      <Blogs />
    </Route>
    <PrivateRoute path='/users/:id' component={User} />
    <PrivateRoute path='/users' component={Users} />
    <Route path='/503'>
      <Error503 />
    </Route>
    <Route path='*'>
      <Error404 />
    </Route>
  </Switch>

const AppRouter = () => {
  const routerType = getRouterType()
  
  console.log(`Using ${routerType} router.`)
  if (routerType === 'hash') {
    return (
      <HashRouter>
        <AppSwitch />
      </HashRouter>
    )
  }
  else{
    return (
      <Router>
        <AppSwitch />
      </Router>
    )
  }
}

export default AppRouter