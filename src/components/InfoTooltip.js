import React from 'react';

function InfoTooltip({ isOpen, onClose, infoMessage }) {
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  return (
    <div className={`popup ${isOpen && "popup_opened"}`} onMouseUp={handleClose}>
      <div className="popup__container popup__container_tooltip-style">
        <img className="popup__tooltip-img" src={infoMessage.icon} alt="Статус сообщения" />
        <h2 className="popup__caption">{infoMessage.caption}</h2>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        > </button>
      </div>
    </div>
  )
}


export default InfoTooltip;
