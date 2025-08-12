import React from "react";
import "../../styles/login.css";

import logo from "/assets/images/logo.svg";

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const validate = () => {

  }

  return (
    <div className="login-page">
      <section className="login-sec">
        <div className="login-heading">
          <img src={logo} alt="Logo" className="login-logo" />
          <h1>
            Sign in to your account
          </h1>
        </div>
        <form className="login-form">
          <input 
            type="email" 
            name="email"
            onChange={() => {}}
            onBlur={() => {}}
            className="form-input" 
            placeholder="e-mail"
            required 
          />
          <input 
            type="password" 
            name="password"
            onChange={() => {}}
            onBlur={() => {}}
            className="form-input"
            placeholder="password"
            required 
          />
          <div className="remember-me-wrapper">
            <input type="checkbox" name="rememberMe" className="login-remember-me" />
            <label htmlFor="rememberMe" className="form-input">remember me</label>
          </div>
          <button type="submit" className="login-button-submit">Sign in</button>
          <button className="login-button-forgot">Forgot password?</button>
          <div className="login-button-reg-wrapper">
            <button className="login-button-reg">Create an account</button>
          </div>
        </form> 
      </section>
    </div>
  );
}
