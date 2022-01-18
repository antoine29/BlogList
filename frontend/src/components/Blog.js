import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, getBlogs } from '../reducers/blogsReducer'
import { openSignInRequiredModal } from '../reducers/layoutReducer'
import { Image, Card, Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom';

const Blog = ({ blog, signedUser }) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const increaseLikes = async blog => {
    if(signedUser){
      await dispatch(likeBlog(blog))
      // ToDo: avoid reloading all blogs foreach like req
      dispatch(getBlogs())
    }
    else dispatch(openSignInRequiredModal())
  }

  return blog !== null ?
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
        <Card.Header>
          <Link
            onClick={()=>{
              if(!signedUser) dispatch(openSignInRequiredModal())
            }}
            to={signedUser ? `/users/${blog.user.id}` : location.pathname}> {blog.user.username}
          </Link>
        </Card.Header>
        <Card.Description>{blog.title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <span style={{ marginRight: 10 }}>
          <Icon
            name={blog.likes.includes(signedUser?.id) ? 'thumbs up' : 'thumbs up outline'}
            style={{ cursor: 'pointer' }}
            onClick={() => { increaseLikes(blog) }}/> {blog.likes.length}
        </span>
        <span>
          <Icon
            name='comments'
            style={{ cursor: 'pointer' }}
            onClick={() => { history.push(`/blogs/${blog.id}`) }}/> {blog.comments.length}
        </span>
      </Card.Content>
    </Card>:
    <></>
}

export default Blog