'use strict'

import React from 'react'
import ReactDom from 'react-dom/client'
import { Col, Row } from 'react-bootstrap'
import { BrowserRouter, Link as LinkRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function CreatePageBadges (props) {
  // const { socketIo, receivedData } = props

  return (<div className="container-fluid">
  <div className="row">
  <h3>PAGE BADGES</h3>
    <div className="col">
      Column
    </div>
    <div className="col">
      Column
    </div>
    <div className="col">
      Column
    </div>
  </div>
</div>)
}

CreatePageBadges.propTypes = {

}
