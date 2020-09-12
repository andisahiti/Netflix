import React, { useState } from 'react'
import './Form.css'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import * as action from '../../store/action/index'
const Form = (props) => {

    const [isSignup, setSignUp] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [remember, setRemember] = useState(false);



    const submitHandler = (event) => {
        event.preventDefault();
        props.auth(props.emailValue, props.passwordValue, isSignup, remember);

    }

    const switchAuthModeHandler = () => {
        let switchMode = isSignup;
        setSignUp(!switchMode)

    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let label = 'Sign In'
    let switchLabel = 'Sign up now.'
    let questionLabel = 'New to Netflix?'
    if (isSignup) {
        label = 'Sign Up'
        switchLabel = 'Sign in now.'
        questionLabel = 'Already on Netflix?'
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to='/main' />
    }

    return (
        <React.Fragment>
            <div className="login">
                <form className="signin-form" onSubmit={submitHandler}>
                    <h1 className="title">{label}</h1>
                    <p style={{
                        color: 'red'
                    }}>{props.error ? props.error.message.split('_').join(' ') : null}</p>
                    <div className="field">
                        <input
                            onBlur={() => {
                                if (!validateEmail(props.emailValue)) {
                                    setEmailValid(true)
                                }
                            }}
                            onFocus={() => {
                                setEmailValid(false)
                            }}

                            onChange={event => {
                                event.persist()
                                props.email(event)
                            }} type="text" className={`text-input ${emailValid ? ' invalid' : null}`} required />
                        <span className="floating-label">Email address</span>
                        {emailValid ? <p className='error-message'>Enter a valid email</p> : null}
                    </div>
                    <div className="field">
                        <input
                            onBlur={() => {
                                if (props.passwordValue.length < 6) {
                                    setPasswordValid(true)
                                }
                            }}
                            onFocus={() => {
                                setPasswordValid(false)
                            }}
                            onChange={event => {
                                event.persist()
                                props.password(event)
                            }} type="password" className={`text-input ${passwordValid ? ' invalid' : null}`} required />
                        <span className="floating-label test">Password</span>
                        {passwordValid ? <p className='error-message'>Password must be between 6 and 60 characters long</p> : null}
                    </div>
                    <button className="signin-btn">{label}</button>
                    <div className="action-group">
                        <label >
                            <input
                                checked={remember}
                                onChange={() => {
                                    return !remember ? setRemember(true) : setRemember(false)
                                }}
                                type="checkbox" className="checkbox"

                                id="remember-me" />Remember me</label>
                    </div>
                    <div className="onboarding" style={{
                        paddingBottom: 50
                    }}>
                        <p >{questionLabel} <a onClick={switchAuthModeHandler} style={{
                            fontSize: 15
                        }}>{switchLabel}</a></p>
                        <p style={{
                            fontSize: 13
                        }}>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a style={{ color: 'blue' }}>Learn more.</a></p>
                    </div>
                </form>
                {authRedirect}
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null,
        emailValue: state.login.email,
        passwordValue: state.login.password,
        error: state.login.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        email: (event) => dispatch(action.emailValue(event)),
        password: (event) => dispatch(action.passwordValue(event)),
        auth: (email, password, isSignup, remember) => dispatch(action.auth(email, password, isSignup, remember))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
