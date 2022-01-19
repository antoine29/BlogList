import axios from 'axios'
import { getBackendUrl } from '../utils/utils'

const baseUrl = `${getBackendUrl()}/api/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }