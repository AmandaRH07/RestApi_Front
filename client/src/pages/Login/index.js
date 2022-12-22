import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './styles.css';
import padlock from '../../assets/padlock.png'

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const data = {
      userName,
      password
    };

    try {
      const response = await api.post('api/Auth/v1/signin', data);

      localStorage.setItem('userName', userName);
      localStorage.setItem('accessToken', response.data.accessToken );
      localStorage.setItem('refreshToken', response.data.refreshToken);

      navigate('/books');
    }
    catch (error) {
      alert("Login failed, please try again!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <img className="login-padlock" src={padlock} alt="Login" />
        <form onSubmit={login}>
          <h1>Login</h1>
          <input
            placeholder="User"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit" style={{ marginTop: '6%' }}>Save</button>
        </form>
      </div>
    </div>
  );
}