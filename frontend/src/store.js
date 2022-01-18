import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { layoutReducer } from './reducers/layoutReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
  layout: layoutReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)
console.log('initial store:', store.getState())
export default store