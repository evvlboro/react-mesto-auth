import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('')
  const [placeUrl, setPlaceUrl] = React.useState('')

  function placeNameChange(e) {
    setPlaceName(e.target.value);
  }

  function placeUrlChange(e) {
    setPlaceUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeUrl
    });
  }
  React.useEffect(() => {
    setPlaceName('');
    setPlaceUrl('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      buttonSubmitText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="add-input-name"
        name="name"
        className="popup__input"
        placeholder="Название"
        autoComplete="off"
        required
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={placeNameChange}
      />
      <span className="popup__input-error add-input-name-error"></span>
      <input
        type="url"
        id="add-input-link"
        name="link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        value={placeUrl}
        onChange={placeUrlChange}
      />
      <span className="popup__input-error add-input-link-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
