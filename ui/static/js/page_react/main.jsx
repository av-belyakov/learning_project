'use strict'

import React from 'react'
import ReactDom from 'react-dom/client'
import { Col, Row } from 'react-bootstrap'
import {
  createBrowserRouter,
  Link,
  RouterProvider
} from 'react-router-dom'
import PropTypes from 'prop-types'

import Contact from './contact.jsx'

import CreatePageHome from './pages/createPageHome.jsx'
import CreatePageAlerts from './pages/createPageAlerts.jsx'
import CreatePageBadges from './pages/createPageBadges.jsx'
import CreatePageProgressBar from './pages/createProgressBar.jsx'
import CreatePageError from './pages/createPageError.jsx'

ReactDom.createRoot(
  document.getElementById('react_root_element')
).render(<CreateMainPage/>)

function createRouter () {
  return createBrowserRouter([
    {
      path: '/examples_react',
      element: <Root/>,
      errorElement: <CreatePageError />
    },
    {
      path: '/examples_react/home_page',
      element: <CreatePageHome/>,
      errorElement: <CreatePageError />
    },
    {
      path: '/examples_react/alerts_page',
      element: <CreatePageAlerts />,
      errorElement: <CreatePageError />
    },
    {
      path: '/examples_react/badges_page',
      element: <CreatePageBadges />,
      errorElement: <CreatePageError />
    },
    {
      path: '/examples_react/progress_bar_page',
      element: <CreatePageProgressBar />,
      errorElement: <CreatePageError />
    },
    {
      path: '/examples_react/contacts/:contactId',
      element: <Contact />
    }
  ])
}

/**
 * Основная точка входа для создания страницы
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @return {void}
 */
function CreateMainPage () {
  const pagesLink = [
    { name: 'home', link: '/examples_react/home_page' },
    { name: 'alerts', link: '/examples_react/alerts_page' },
    { name: 'progress bar', link: '/examples_react/progress_bar_page' },
    { name: 'badges', link: '/examples_react/badges_page' }
  ]

  const handlerClickNavBar = (elem) => {
    console.log('function "handlerClickNavBar", START...')
    console.log(elem)
  }

  return (<React.StrictMode>
    <div style={{ display: 'flex' }}>
      {/* <CreateNavBar listLink={pagesLink} handlerClick={handlerClickNavBar}/> */}
      <RouterProvider router={createRouter()} />
    </div>
  </React.StrictMode>)
}

CreateMainPage.propTypes = {
}

function CreateNavBar (props) {
  const {
    listLink,
    handlerClick
  } = props

  const generateNavBar = (pl, handlerClick) => {
    return pl.map((value, index) => {
      return (<li key={`link_${index}`} className="nav-item">
        <Link to={value.link} className="nav-link" onClick={handlerClick}>{value.name}</Link>
        {/* <a href={value.link} className="nav-link">{value.name}</a> */}
      </li>)
    })
  }

  return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {generateNavBar(listLink, handlerClick)}
        </ul>
      </div>
    </div>
  </nav>)
}

CreateNavBar.propTypes = {
  listLink: PropTypes.array.isRequired,
  handlerClick: PropTypes.func.isRequired
}

/**
 * Создает основной элемент страницы
 * @return {void}
 */
function CreateMajorElements () {
  return (<div id='major_elem'>

  </div>)
}

CreateMajorElements.propTypes = {

}

/**
 * Создает навигационный раздел страницы
 * @return {void}
 */
function Root () {
  const pagesLink = [
    { name: 'home', link: '/examples_react/home_page' },
    { name: 'alerts', link: '/examples_react/alerts_page' },
    { name: 'progress bar', link: '/examples_react/progress_bar_page' },
    { name: 'badges', link: '/examples_react/badges_page' }
  ]

  const handlerClickNavBar = (elem) => {
    console.log('function "handlerClickNavBar", START...')
    console.log(elem)
  }

  const generateNavBar = (pl, f) => {
    return pl.map((value, index) => {
      return (<li key={`link_${index}`} className="nav-item">
        <Link to={value.link} className="nav-link">{value.name}</Link>
        {/* <a href={value.link} className="nav-link">{value.name}</a> */}
      </li>)
    })
  }

  return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {generateNavBar(pagesLink, handlerClickNavBar)}
        </ul>
      </div>
    </div>
  </nav>)
}

Root.propTypes = {
//  pagesLink: PropTypes.array.isRequired,
//  handlerClick: PropTypes.func.isRequired
}
