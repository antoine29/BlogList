const initialState = {
	signInRequiredModalOpenness: false
}

export const layoutReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SIGNIN_REQUIRED_MODAL_OPENNESS':
			return {...state, signInRequiredModalOpenness: action.openness}
		default:
			return state
	}
}

export const openSignInRequiredModal = () => {
	return {
		type: 'SET_SIGNIN_REQUIRED_MODAL_OPENNESS',
		openness: true
	}
}

export const closeSignInRequiredModal = () => {
	return {
		type: 'SET_SIGNIN_REQUIRED_MODAL_OPENNESS',
		openness: false
	}
}
