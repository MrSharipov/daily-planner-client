import '../../assets/styles/auth.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const sendRequest = (url, method = "POST", data) => {
    const baseUrl = "https://daily-planner-1dz0.onrender.com/";
    fetch(baseUrl + url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status && data.authToken) {
           localStorage.setItem('auth-token', data.authToken);
          return navigate('/');
        }
      });
  }

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      setUserName(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    const authData = {
      userName: userName,
      password: password,
    }
    sendRequest('auth/register', 'POST', authData);
  }
  return <div className='app-register-page'>
    <h2>Register</h2>
    <form>
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input onChange={handleInputChange} type="text" id="username" name="username" value={userName}/>
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input onChange={handleInputChange} type="password" id="password" name="password" value={password}/>
      </div>
      <button type='submit' onClick={handleClick}>Register</button>
    </form>
    <p>If you have an account, <Link to="/auth/login">Login</Link> here</p>
  </div>
}

export default Register;