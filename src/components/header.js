import React from "react"
import { Link } from "gatsby"

const Header = ({ menuItems, siteTitle }) => (
    <header
        style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h1 style={{ margin: 0 }}>
                <Link
                    to="/"
                    style={{
                        color: `white`,
                        textDecoration: `none`,
                    }}
                >
                    {siteTitle}
                </Link>
            </h1>

            { menuItems.map((m, i) => m.parentId === null ? (
                <Link key={i} to={ m.path === '/home/' ? '/' : m.path }>{ m.label }</Link>
            ) : null)}
        </div>
    </header>
)

export default Header
