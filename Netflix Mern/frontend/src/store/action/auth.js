import * as actionTypes from './actionTypes'
import axios from 'axios';

export const emailValue = (event) => {
    return {
        type: actionTypes.EMAIL_VALUE,
        event: event

    }
}
export const passwordValue = (event) => {
    return {
        type: actionTypes.PASSWORD_VALUE,
        event: event

    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const auth = (email, password, isSignup, remember) => {

    let errMsg = {
        message: ''
    }

    return dispatch => {
        const authData = {
            email: email,
            password: password
        };
        let url = `${process.env.REACT_APP_BACKEND_URL}/signup`;
        errMsg.message = 'User with that email already exists'
        if (!isSignup) {
            url = `${process.env.REACT_APP_BACKEND_URL}/login`;
            errMsg.message = 'Could not login, please check your email and password'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data.token, response.data.userId));
                if (remember) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                }
            })
            .catch(err => {
                dispatch(authFail(errMsg.message));

            });
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
};