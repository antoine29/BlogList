import React from 'react'
import AppRouter from './AppRouter'
import { useCheckBackendHealth } from './utils/utils'
import Error503 from './components/ErrorPages/Error503'

const App = () => {
	const { data, error, loading } = useCheckBackendHealth()
	
	if(loading) return (
		<p>Checking backend...</p>
	)

	if(error) return (
		<Error503 />
	)

	return (
		<AppRouter />
	)
}

export default App