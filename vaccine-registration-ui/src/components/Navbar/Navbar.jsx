import { Link, useLocation } from "react-router-dom"
import bottle_logo from "../../assets/bottle_logo.svg"
import "./Navbar.css"

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="Navbar">
      <ul className="logo">
        <li>
          <Link to="/">
            <img src={bottle_logo} alt="logo" />
            <h2>VACCINE HUB</h2>
          </Link>
        </li>
      </ul>
      {location.pathname.indexOf("portal") === -1 ? (
        <ul>
          <li>
            <Link to="/login">
              <button className="btn ghost">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="btn primary">Register</button>
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  )
}
