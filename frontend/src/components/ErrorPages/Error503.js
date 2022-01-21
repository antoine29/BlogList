import React from 'react'
import { Message } from 'semantic-ui-react'

const Error503 = () =>
  <Message>
    <Message.Header>Error 503.</Message.Header>
    <p>Couldn't reach the backend service.</p>
  </Message>

export default Error503