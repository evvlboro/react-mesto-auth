import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser= React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="portfolio">
        <div className="portfolio__container">
          <img src={currentUser.avatar} alt="Аватар" className="portfolio__avatar" />
          <div className="portfolio__hover" id="portfolio_avatar_hover">
            <div className="portfolio__hover-button" onClick={props.onEditAvatar}></div>
          </div>
          <div className="portfolio__photo-info">
            <div className="portfolio__first-line">
              <h1 className="portfolio__name">{currentUser.name}</h1>
              <button type="button" className="portfolio__button-edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="portfolio__about">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="portfolio__button-add" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {props.cards.map((card, i)=>(
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
