// src/pages/LoginPage.js

import React from 'react';
import './Login.css'; // Make sure to create this CSS file

function Login() {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <p>Sign in to access the application</p>
      <button className="google-signin-btn">Sign in with Google</button>
    </div>
  );
}

export default Login;
