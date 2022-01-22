import { useEffect, useState } from "react"
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../reducers/userReducer"
import { checkHealth } from '../services/health'

export const useActualPath = () => {
  const location = useLocation()
  return location.pathname
}

export const useAppLogout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const logout = () => {
    // to clear user in local storage
    window.localStorage.clear()

    // to clear user in redux store
    dispatch(setUser(null))

    history.push('/signin')
  }

  return logout
}

export const setUserToLocalStorage = user => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
  const storedUser = window.localStorage.getItem('loggedBlogAppUser')
  return storedUser
}

export const getBackendUrl = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'
  console.log(`Using BackendUrl: ${backendUrl}`)
  return backendUrl
}

export const getRouterType = () => {
  const deploymentServer = process.env.REACT_APP_DEPLOYMENT_SERVER
  console.log('deployment server:', deploymentServer)
  return deploymentServer === 'gh-pages' ? 'hash' : 'browser'
}

export const useCheckBackendHealth = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (
      async () => {
        try {
          setLoading(true)
          const response = await checkHealth()
          setData(response)
        }
        catch (err) {
          setError(err)
        }
        finally {
          setLoading(false)
        }
      }
    )()
  }, [])

  return { data, error, loading }
}