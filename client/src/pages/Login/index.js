import React from 'react';
import './styles.css';
import padlock from '../../assets/padlock.png'

export default function Login(){
  return(
   <div className="login-container">
    <div className="login-form">
      <img className="login-padlock"src={padlock} alt="Login"/>
      <form>
        <h1>Login</h1>
        <input placeholder="Usuário" type="text"/>
        <input placeholder="Senha" type="password"/>
        <button className="button" type="submit" style={{marginTop: '6%' }}>Save</button> 
      </form>
    </div>
   </div>
  );
}