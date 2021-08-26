import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ loggedIn, userEmail, handleSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип сайта" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <span className="header__email">{userEmail}</span>
          <button to="" className="header__link header__link_signout" onClick={handleSignOut}>Выйти</button>
        </Route >
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
      </Switch >

    </header >
  );
}

export default Header;
