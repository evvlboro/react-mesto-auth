function ImagePopup(props) {
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div className={`popup ${Object.keys(props.card).length === 0 ? '' : 'popup_opened'}`} id="popup_img" onMouseUp={handleClose}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__img-title">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
