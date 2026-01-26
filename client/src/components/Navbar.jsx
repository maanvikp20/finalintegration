import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-inner">
        <div className="brand">MenvikPoder SportHub</div>
        <div className="navbar-links">
          <NavLink className="link" to="/">Home</NavLink>
          <NavLink className="link" to="/scores">Scores</NavLink>
          <NavLink className="link" to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar