import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { openSignInRequiredModal, closeSignInRequiredModal } from '../reducers/layoutReducer'
import { Button, Modal } from 'semantic-ui-react'

const SignInRequiredModal = ({ openness, open, close }) => {
	const history = useHistory()

	return (
		<Modal
			open={openness}
			onClose={() => close()}
			onOpen={() => open()}>
			<Modal.Header>Sign in required</Modal.Header>
			<Modal.Actions>
				<Button
					color='black'
					onClick={() => close()}> Cancel
				</Button>
				<Button
					content='Sign in'
					labelPosition='right'
					icon='checkmark'
					onClick={event => {
						close()
						history.push('/signin')
					}} positive />
			</Modal.Actions>
		</Modal>
	)
}

const mapStateToProps = state => {
	return {
		openness: state.layout.signInRequiredModalOpenness
	}
}

const mapDispatchToProps = {
	open: openSignInRequiredModal,
	close: closeSignInRequiredModal
}

const ConnectedSignInRequiredModal = connect(mapStateToProps, mapDispatchToProps)(SignInRequiredModal)
export default ConnectedSignInRequiredModal