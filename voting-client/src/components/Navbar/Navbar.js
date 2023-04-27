import { Link } from "react-router-dom";

export const Navbar = () => {

    const loggedIn = false;

    return(
        <div className="navbar bg-base-100 border-b-2">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/vote">Vote</Link></li>
              <li><Link to="/candidates">Candidates</Link></li>
              <li><Link to="/standings">Standings</Link></li>
              </ul>
            </div>
            <p className="normal-case text-3xl font-bold px-2">ZKP</p>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/vote">Vote</Link></li>
              <li><Link to="/candidates">Candidates</Link></li>
              <li><Link to="/standings">Standings</Link></li>
            </ul>
          </div>
          <div className="navbar-end">
            {loggedIn?<Link to="/profile" className="btn btn-primary text-white">Profile</Link>: <Link to="/login"className="btn btn-error">Login</Link>}
          </div>
        </div>
    )
}
