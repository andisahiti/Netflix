import * as actionTypes from '../action/actionTypes'
const initialState = {
    token: null,
    userId: null,
    error: null,
    email: '',
    password: '',
    isAuth: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMAIL_VALUE:
            return {
                ...state,
                email: action.event.target.value
            }

        case actionTypes.PASSWORD_VALUE:
            return {
                ...state,
                password: action.event.target.value
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                email: '',
                password: '',
            }
        default:
            return state;
    }
}


export default loginReducer;







