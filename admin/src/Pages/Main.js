import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login'
import AdminIndex from './AdminIndex'

export default () => {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
      <Route path="/index/" exact component={AdminIndex} />
    </Router>
  )
}