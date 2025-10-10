import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, isBlog, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div 
      className={isBlog ? "global-wrapper2" : "global-wrapper"} 
      data-is-root-path={isRootPath}
    >
      {/* <header className="global-header">{header}</header> */}
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://hyperdart.com">hyperDart</a>
      </footer>
    </div>
  )
}

export default Layout
