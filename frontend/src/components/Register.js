import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const nopointer = "default";

function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    props.onRegister( email, password );
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };
  
  return (
    <div className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form 
        name="form-register"
        className="auth__form"
        onSubmit={handleOnSubmit}
        noValidate
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
          Зарегистрироваться
        </button>
      </form>
      <div className='navlink'>
        <p className="navlink__element" style={{cursor: `${nopointer}`}}>Уже зарегистрированы?&nbsp;</p>
        <NavLink
          className="navlink__element"
          to="/sign-in"
        >
          Войти
        </NavLink>
      </div>
    </div>
  );

};

export default Register;