import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    let { email, password } = userData;
    onRegister({ email, password })
      .catch(error => console.log(error.message || 'Что-то пошло не так'));
    evt.preventDefault();
  }

  return (
    <section className="auth login">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        action="#"
        onSubmit={handleSubmit}
      >
        <fieldset className="auth__form-fieldset">
          <input
            className="auth__input"
            name="email"
            type="email"
            value={userData.email}
            id="email-input"
            autoComplete="off"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <span className="auth__input-error" id="auth-email-input-error"> </span>
          <input
            className="auth__input"
            name="password"
            type="password"
            value={userData.password}
            id="password-input"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            placeholder="Пароль"
            required
            onChange={handleChange}
          />
          <span className="auth__input-error" id="auth-password-input-error"> </span>
        </fieldset>
        <button className="auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="sign-in" className="auth__signin auth__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  )
}

export default Register;
