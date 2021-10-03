import React, {useContext, useEffect, useState} from "react";

import "./AuthPage.scss";
import useHttp from "../../hooks/http.hook.js";
import useMessage from "../../hooks/message.hook.js";
import AuthContext from "../../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "", password: ""
  });
  
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">URL shortener</h1>
      <div className="auth-page__container">
        <div className="form">
          <h3 className="form__title">Authorization</h3>
          <input id="email" type="email" name="email" placeholder="Email" value={form.email} onChange={changeHandler}/>
          <input id="password" type="password" name="password" placeholder="Password" value={form.password} onChange={changeHandler}/>
          <div className="form__buttons">
            <button onClick={loginHandler} disabled={loading}>Sign In</button>
            <button onClick={registerHandler} disabled={loading}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
