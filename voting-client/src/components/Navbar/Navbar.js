import { Link } from "react-router-dom";

export const Navbar = () => {

    const loggedIn = true;

    return(
        <div className="navbar bg-base-100 border-b-2">
            <div className="flex-1">
                <h1 className="pl-2 font-bold text-3xl normal-case rounded-sm">ZKP</h1>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal text-sm">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/vote">Vote</Link></li>
                    <li><Link to="/candidates">Candidates</Link></li>
                    <li><Link to="/standings">Standings</Link></li>
                    <li>{loggedIn?<Link to="/profile" className="btn btn-primary text-white">Profile</Link>: <Link to="/login"className="btn btn-error">Login</Link>}</li>
                </ul>
            </div>
        </div>
    )
}