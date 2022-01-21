import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignInForm from './components/SignForms//SignInForm'
import SignUpForm from './components/SignForms/SignUpForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import FullBlog from './components/FullBlog'
import Error503 from './components/ErrorPages/Error503'
import Error404 from './components/ErrorPages/Error404'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
  return(
    <Router>
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
        <PrivateRoute path='/users/:id' component={User}/>
        <PrivateRoute path='/users' component={Users}/>
        <Route path='/503'>
          <Error503 />
        </Route>
        <Route path='*'>
          <Error404/>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter