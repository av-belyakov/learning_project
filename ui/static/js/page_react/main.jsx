'use strict'

import React from 'react'
import ReactDom from 'react-dom/client'
import { Col, Row } from 'react-bootstrap'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import PropTypes from 'prop-types'

import Root from './root.jsx'
import CreatePageHome from './pages/createPageHome.jsx'
import CreatePageAlerts from './pages/createPageAlerts.jsx'
import CreatePageBadges from './pages/createPageBadges.jsx'
import CreatePageProgressBar from './pages/createProgressBar.jsx'
import CreatePageError from './pages/createPageError.jsx'
import Contact from './pages/createPageContact.jsx'
import loader from './loader.jsx'

ReactDom.createRoot(document.getElementById('react_root_element')).render(
    <CreateMainPage />
)

function createRouter() {
    console.log("func 'createRouter', START")

    return createBrowserRouter([
        {
            path: '/examples_react',
            element: <Root />,
            loader: async ({ params }) => {
                return fetch(
                    `http://${window.location.host}/examples_react/api?page=root_page`
                )
            },
            /*action: async() => {
                const data = useLoaderData()
                console.log(data)
    
                return data
            },*/
            errorElement: <CreatePageError />,
            children: [
                {
                    path: 'home_page',
                    loader: loader.bind(null, {
                        page: 'home_page',
                        command: 'GET_DATA',
                        name: 'ANY_BODY',
                    }),
                    element: <CreatePageHome />,
                },
                {
                    path: 'alerts_page',
                    loader: loader.bind(null, {
                        page: 'alert_page',
                        command: 'GET_DATA',
                        name: 'ANY_BODY',
                    }),
                    element: <CreatePageAlerts />,
                },
                {
                    path: 'badges_page',
                    loader: loader.bind(null, {
                        page: 'badges_page',
                        command: 'GET_DATA',
                        name: 'ANY_BODY',
                    }),
                    element: <CreatePageBadges />,
                },
                {
                    path: 'progress_bar_page',
                    loader: loader.bind(null, {
                        page: 'progress_bar_page',
                        command: 'GET_DATA',
                        name: 'ANY_BODY',
                    }),
                    element: <CreatePageProgressBar />,
                },
                {
                    path: 'contacts_page',
                    element: <Contact />,
                },
            ],
        },
    ])
}

/**
 * Основная точка входа для создания страницы
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @return {void}
 */
function CreateMainPage() {
    console.log("func 'CreateMainPage', START")

    return (
        <React.StrictMode>
            <RouterProvider router={createRouter()} />
        </React.StrictMode>
    )
}

CreateMainPage.propTypes = {}

function CreateNavBar(props) {
    const { listLink, handlerClick } = props

    const generateNavBar = (pl, handlerClick) => {
        return pl.map((value, index) => {
            return (
                <li key={`link_${index}`} className="nav-item">
                    <Link
                        to={value.link}
                        className="nav-link"
                        onClick={handlerClick}
                    >
                        {value.name}
                    </Link>
                    {/* <a href={value.link} className="nav-link">{value.name}</a> */}
                </li>
            )
        })
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo02"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {generateNavBar(listLink, handlerClick)}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

CreateNavBar.propTypes = {
    listLink: PropTypes.array.isRequired,
    handlerClick: PropTypes.func.isRequired,
}
