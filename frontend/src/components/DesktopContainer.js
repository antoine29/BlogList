import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
  Dropdown
} from 'semantic-ui-react'
import { useActualPath } from '../utils/utils'
import { openSignInRequiredModal, closeSignInRequiredModal} from '../reducers/layoutReducer'
import AddBlogModal from './AddBlogModal'
import SignInRequiredModal from './SignInRequiredModal'
import Notification from './Notification'
import { useAppLogout } from '../utils/utils'

const DesktopContainer = ({ children, Media }) => {
  const currentPath = useActualPath()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const logout = useAppLogout()

  const [addBlogModalOpenness, setAddBlogModalOpenness] = useState(false)
  const openAddBlogModal = () => setAddBlogModalOpenness(true)
  const closeAddBlogModal = () => setAddBlogModalOpenness(false)

  return (
    <Media greaterThan='mobile'>
      <AddBlogModal
        openness={addBlogModalOpenness}
        open={openAddBlogModal}
        close={closeAddBlogModal} />
      <SignInRequiredModal />
      {currentPath !== '/signin' && currentPath !== '/signup' &&
      <Container>
        <Menu
          fixed='top'
          size='large'
          inverted>
          <Container>
            <Dropdown item simple text='Blogs' onClick={() => { history.push('/blogs') }}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                  if(!!user) openAddBlogModal()
                  else dispatch(openSignInRequiredModal())
                }}>Add blog</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              as='a'
              active={currentPath === '/users'}
              onClick={() => { history.push('/users') }}> Users
            </Menu.Item>
            {user ?
            <Menu.Item position='right'>
              <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar />
              <span>
                <Dropdown
                  // item
                  // simple
                  inline
                  text={user === null ? '' : user.name}>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Logout' onClick={() => {logout()}} />
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </Menu.Item>:
            <Menu.Item
              position='right'
              as='a'
              onClick={() => {
                history.push('/signin')
              }}> Sign in
            </Menu.Item>}
          </Container>
        </Menu>
        {/* <HomepageHeading /> */}
      </Container>}
      <Container style={{ marginTop: '65px' }} inverted>
        {children}
        <Notification />
      </Container>
    </Media>
  )
}

export default DesktopContainer