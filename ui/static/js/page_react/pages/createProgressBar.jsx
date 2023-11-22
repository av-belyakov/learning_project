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

export default function CreatePageProgressBar(props) {
    // const { socketIo, receivedData } = props
    const data = useLoaderData()
    console.log(data)

    return (
        <div className="container-fluid">
            <div className="row">
                <h3>PAGE PROGRESS BAR</h3>
                <div className="col">{JSON.stringify(data)}</div>
            </div>
        </div>
    )
}

CreatePageProgressBar.propTypes = {}
