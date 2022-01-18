import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Header, Comment, Form, Confirm } from 'semantic-ui-react'
import { get, comment } from '../services/blogs'
import { deleteBlog, getBlogs } from '../reducers/blogsReducer'
import { openSignInRequiredModal } from '../reducers/layoutReducer'
import Blog from './Blog'
import ResponsiveContainer from './ResponsiveContainer'

const FullBlog = ({ deleteBlog, getBlogs, blogs, user, openSignInRequiredModal }) => {
  // ToDo: Split this into container comp and representational comp
  const history = useHistory()
  const blogMatcher = useRouteMatch('/blogs/:id')
  const [blog, setBlog] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    const blogId = blogMatcher ? blogMatcher.params.id : null
    getBlog(blogId).then(_blog => { setBlog(_blog) })
  }, [blogs])

  const getBlog = blogId => get(blogId)
      .then(_blog => _blog)
      .catch(() => {history.push('/')})

  const _deleteBlog = async () => {
    try{
      await deleteBlog(blog)
      await getBlogs()
      history.push('/')
      setDeleteConfirm(false)
    }
    catch(error){
      console.log(error)
      setDeleteConfirm(false)
      window.localStorage.clear()
      history.push('/signin')
    }
  }

  const addCommentHandler = async event => {
    if(!!user){
      event.preventDefault()
      let commentedBlog = await comment(blog.id, { comment: newComment })
      setBlog(commentedBlog)
      setNewComment('')
    }
    else{
      openSignInRequiredModal()
    }
  }

  let logedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

  return blog !== null ?
    <ResponsiveContainer>
      <Container>
        <Confirm
          open={deleteConfirm}
          onCancel={() => {setDeleteConfirm(false)}}
          onConfirm={_deleteBlog}/>
        <Blog blog={blog} signedUser={user}/>
        <Comment.Group>
          <Header as='h3'> Comments: </Header>
          {blog.comments.map((comment, index) =>
          <Comment key={comment+index}>
            <Comment.Content>
              <Comment.Author as='a'>{blog.user.name}</Comment.Author>
              <Comment.Text>{comment}</Comment.Text>
            </Comment.Content>
          </Comment>)}
          {!!user &&
          <Form reply>
            <Form.TextArea
              value={newComment}
              onChange={event => {
                event.preventDefault()
                setNewComment(event.target.value)
              }} />
            <Button
              primary
              content='Add comment'
              labelPosition='left'
              icon='edit'
              onClick={addCommentHandler}/>
          </Form>}
        </Comment.Group>
        {user && blog?.user?.id === user?.id &&
        <Button
          content='Delete blog'
          labelPosition='left'
          icon='trash'
          primary
          onClick={() => {setDeleteConfirm(true)}}/>}
      </Container>
    </ResponsiveContainer> :
    <></>
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
    layout: state.layout
  }
}

const mapDispatchToProps = {
  deleteBlog,
  getBlogs,
  openSignInRequiredModal
}

const ConnectedFullBlog = connect(mapStateToProps, mapDispatchToProps)(FullBlog)
export default ConnectedFullBlog