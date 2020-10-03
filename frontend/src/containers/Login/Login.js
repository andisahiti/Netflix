import React from 'react'
import Footer from '../../components/Footer/Footer';
import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';
import './Login.css'

const Login = (props) => {
    return (
        <div className='loginBody'>
            <div className="wrapper">
                <Header></Header>
                <Form></Form>
                <Footer></Footer>
            </div>
        </div>
    )
}


export default Login;