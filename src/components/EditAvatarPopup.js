import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      buttonSubmitText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-input-link"
        name="link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error avatar-input-link-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
