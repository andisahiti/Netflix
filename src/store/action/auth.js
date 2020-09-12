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
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA7Pf48XhZIzT_9ghf9E3zxYcL3FTJ-51c';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA7Pf48XhZIzT_9ghf9E3zxYcL3FTJ-51c';
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                if (remember) {
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('userId', response.data.localId);
                }
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
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