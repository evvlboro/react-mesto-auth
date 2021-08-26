import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from "./InfoTooltip";

import api from '../utils/api.js';
import * as auth from '../utils/auth.js';

import tooltipDeny from '../images/tooltip-deny.svg';
import tooltipSuccess from '../images/tooltip-success.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    about: 'Загрузка...',
    avatar: 'https://i.gifer.com/g0R5.gif',
    name: 'Загрузка...',
  });

  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [isInfoToolTip, setInfoToolTip] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState({ icon: '', caption: '' });


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const whatMethondIShouldUseInApi = isLiked ? 'removeLike' : 'setLike';

    api[whatMethondIShouldUseInApi](card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((e => e._id !== card._id)))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history])

  React.useEffect(() => {
    tokenCheck();

    Promise.all([
      api.getUserInfo(),
      api.getInitalCardsList(),
    ])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoToolTip(false);
    setInfoMessage({ icon: '', caption: '' });
    setSelectedCard({});
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.sendCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  function InfoTooltipParams({ icon, caption }) {
    setInfoMessage({ icon: icon, caption: caption });
  }

  function openInfoTooltipPopup() {
    setInfoToolTip(true);
  }

  function handleRegister({ email, password }) {
    return auth.register({ email, password })
      .then(() => {
        InfoTooltipParams({ icon: tooltipSuccess, caption: 'Вы успешно зарегистрировались!' });
        openInfoTooltipPopup(true);
        history.push('/sign-in');
      }).catch(err => {
        InfoTooltipParams({ icon: tooltipDeny, caption: 'Что-то пошло не так! Попробуйте еще раз.' });
        openInfoTooltipPopup(true);
        console.log(err);
      })
  };

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then(data => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
        if (data.token) {
          setLoggedIn(true);
          auth.getContent(data.token)
            .then(res => {
              if (res) {
                setUserEmail(res.data.email);
              }
            })
          localStorage.setItem('jwt', data.token);
          InfoTooltipParams({ icon: tooltipSuccess, caption: 'Вы успешно авторизовались!' });
          openInfoTooltipPopup(true);
          history.push('/');
        }
      }).catch(err => {
        InfoTooltipParams({ icon: tooltipDeny, caption: 'Что-то пошло не так! Попробуйте еще раз.' });
        openInfoTooltipPopup(true);
        console.log(err);
      });
  };

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch(err => console.log(err));
    }
  };

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="overlay">
          <Header loggedIn={loggedIn} userEmail={userEmail} handleSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              component={Main}
              exact path='/'
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            <Route exact path='/sign-up'>
              <Register onRegister={handleRegister} />
            </Route>
            <Route exact path='/sign-in'>
              <Login onLogin={handleLogin} />
            </Route>
          </Switch>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip infoMessage={infoMessage} isOpen={isInfoToolTip} onClose={closeAllPopups} />
          {loggedIn && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
