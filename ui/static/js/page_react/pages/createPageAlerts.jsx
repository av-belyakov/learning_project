'use strict'

import React from 'react'
import {
    useLoaderData,
    BrowserRouter,
    Link as LinkRouter,
} from 'react-router-dom'
import ReactDom from 'react-dom/client'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function CreatePageAlerts(props) {
    console.log('func CreatePageAlerts, START...')

    const data = useLoaderData()
    console.log(data)

    /*fetch(
        `http://${window.location.host}/examples_react/api?command=get&name='name_element_1'`
    )
        .then((res) => res.json())
        .then((r) => {
            console.log('RESPONSE')
            console.log(r.headers)
            console.log(r)
        })
        .catch((err) => {
            console.log(err)
        })*/

    return (
        <div className="container-fluid">
            <div className="row">
                <h3>PAGE ALERTS</h3>
                <div className="col">{JSON.stringify(data)}</div>
            </div>
        </div>
    )
}

CreatePageAlerts.propTypes = {}
