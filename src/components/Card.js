import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__card-delete ${isOwn ? '' : 'element__card-delete_hide'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__card-like ${isLiked ? 'elements__card-like_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__card">
      <div className="elements__card-image-container">
        <img src={props.card.link} alt={props.card.name} className="elements__card-image" onClick={handleClick}/>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="elements__text-container">
        <h2 className="elements__card-title">{props.card.name}</h2>
        <div className="elements__card-like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className='elements__counter'>{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
