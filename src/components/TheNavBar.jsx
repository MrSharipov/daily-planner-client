import '../assets/styles/navbar.css'
import {Link} from "react-router-dom";
function TheNavBar() {
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  }
  const isLoggedIn = localStorage.getItem("auth-token");
  return <div className="app-navbar">
    <ul>
      <li className="brand">
        <Link to="/">Daily Planner App</Link>
      </li>
      <li className="nav-item">
        {isLoggedIn ?
          <p className="logout" onClick={logOut}>Log out</p>
          :
          <Link to="/auth/login">Login</Link> }

      </li>
    </ul>
  </div>
}

export default TheNavBar;