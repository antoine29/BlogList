import axios from 'axios'
import { getBackendUrl } from '../utils/utils'

const checkHealth = async () => {
  const baseUrl = `${getBackendUrl()}/health`
  const response = await axios.get(baseUrl)
  return response.data
}

export { checkHealth }