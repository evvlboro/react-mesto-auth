function PopupWithForm(props) {
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`popup_${props.name}`} onMouseUp={handleClose}>
      <div className="popup__container popup__container_form-style">
        <button type="button" className="popup__button-close" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button-save">{props.buttonSubmitText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
