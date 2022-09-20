import { useState } from 'react';

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    props.onLogin( email, password );
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  return (
    <div className="auth">
      <h3 className="auth__title">Вход</h3>
      <form 
        className="auth__form"
        onSubmit={handleOnSubmit}
      >
        <input 
          className="auth__input"
          placeholder="Email"
          type="email"
          onChange={handleEmailChange}
          value={"" || props.email}
          required
        ></input>
        <input 
          className="auth__input"
          placeholder="Пароль"
          type="password"
          onChange={handlePasswordChange}
          value={"" || props.password}
          required
        ></input>
        <button 
          className="auth__submit"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );

};

export default Login;