import React from 'react'
import './MainPage.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Row from '../../components/Row/Row'
import requests from '../../requests/requests'
import Banner from '../../components/Banner/Banner'
import NavBar from '../../components/NavBar/NavBar'

const MainPage = (props) => {

    let rows = [];
    for (const key in requests) {
        rows.push({
            key: key.split('_').join(' '),
            request: requests[key]
        })
    }


    return (
        <div className='wrap'>
            <div className="main">
                <NavBar></NavBar>
                <Banner></Banner>
                <div className='rows'>
                    {rows.map((element, index) => {
                        return (
                            <Row key={index} bigRow={element.key === 'Netflix Originals' ? true : false} title={element.key} fetchUrl={element.request}></Row>

                        )
                    })
                    }
                </div>

            </div>
        </div>
    )
}


export default withRouter(connect(null, null)(MainPage));
