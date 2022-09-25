import { Link, Route } from 'react-router-dom';
import headerLogo from '../images/header.svg';

function Header( { email, signOut } ) {

  return (
    <header className="header">
      
      <img 
        className="header__logo" 
        src={headerLogo} 
        alt="Место россия" 
      />

      <div className="navlink">
        <Route exact path='/signin'><Link className="navlink__element" to="/signup">Регистрация</Link></Route>
        <Route exact path='/signup'><Link className="navlink__element" to="/signin">Войти</Link></Route>
        <Route exact path='/'><p className="navlink__element" style={{cursor: "default"}}>{email}&nbsp;</p></Route>
        <Route exact path='/'><Link className="navlink__element" onClick={signOut} to="/signin">Выйти</Link></Route>
      </div>

    </header>
  );

};

export default Header;