import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTimedNotification } from '../reducers/notificationReducer'
import { getBlogs, createBlog } from '../reducers/blogsReducer'
import { Button, Form, Modal } from 'semantic-ui-react'
import { useAppLogout } from '../utils/utils'

const AddBlogModal = ({ user, openness, open, close, setTimedNotification, getBlogs, createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', content: '' })
  const history = useHistory()
  const appLogout = useAppLogout()

  const addBlog = async () => {
    try {
      setTimedNotification({ type: 'OK', message: `new blog ${newBlog.title} is being added` }, 5000)
      await createBlog(newBlog)
      setNewBlog({ author: '', title: '', url: '' })
      getBlogs()
    }
    catch (error) {
      // ToDo: move this jwt expiration check to services or function in a container comp or client/axios interceptor?
      if (error === 'jwt expired') {
        setNewBlog({ author: '', title: '', url: '' })
        appLogout();
        setTimedNotification({ type: 'ERROR', message: 'Expired session' }, 5000)
      }
      else setTimedNotification({ type: 'ERROR', message: error }, 5000)
    }
  }

  return (
    <Modal
      onClose={() => close()}
      onOpen={() => open()}
      open={openness}>
      <Modal.Header>Add blog</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              value={newBlog.title}
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <input
              value={newBlog.content}
              onChange={({ target }) => setNewBlog({ ...newBlog, content: target.value })} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='black'
          onClick={() => close()}> Cancel
        </Button>
        <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          onClick={event => {
            if (user) {
              event.preventDefault()
              addBlog()
              close()
            }
            else history.push('/signin')
          }} positive />
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setTimedNotification,
  getBlogs,
  createBlog,
  //setUser
}

const ConnectedAddBlogModal = connect(mapStateToProps, mapDispatchToProps)(AddBlogModal)
export default ConnectedAddBlogModal