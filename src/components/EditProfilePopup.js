import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      buttonSubmitText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="input-name"
        name="name"
        className="popup__input"
        placeholder="Имя"
        autoComplete="off"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        type="text"
        id="input-about"
        name="about"
        className="popup__input"
        placeholder="О Себе"
        autoComplete="off"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error input-about-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
