import React from 'react'
import { useLoaderData, Link, Outlet } from 'react-router-dom'

/**
 * Создает навигационный раздел страницы
 * @return {void}
 */
export default function Root() {
    console.log("func 'Root'")
    const data = useLoaderData()

    const pagesLink = [
        { name: 'home', link: 'home_page' },
        { name: 'alerts', link: 'alerts_page' },
        { name: 'progress bar', link: 'progress_bar_page' },
        { name: 'badges', link: 'badges_page' },
        { name: 'contacts', link: 'contacts_page' },
    ]

    const handlerClickNavBar = (elem) => {
        console.log('function "handlerClickNavBar", START...')
        console.log(elem)
    }

    const generateNavBar = (pl, f) => {
        return pl.map((value, index) => {
            return (
                <li key={`link_${index}`} className="nav-item">
                    <Link to={value.link} className="nav-link">
                        {value.name}
                    </Link>
                </li>
            )
        })
    }

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <ul className="nav flex-column">
                    {generateNavBar(pagesLink, handlerClickNavBar)}
                </ul>
            </div>
            <div id="detail">
                {data ? JSON.stringify(data) : 'not data'}
                <Outlet />
            </div>
        </>
    )
}

Root.propTypes = {
    //  pagesLink: PropTypes.array.isRequired,
    //  handlerClick: PropTypes.func.isRequired
}
