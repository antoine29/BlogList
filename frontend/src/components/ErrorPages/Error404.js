import React from 'react'
import { Message } from 'semantic-ui-react'

const Error404 = () =>
  <Message>
    <Message.Header>Error 404.</Message.Header>
    <p>Page not found.</p>
  </Message>

export default Error404