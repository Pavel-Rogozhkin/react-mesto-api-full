import Card from './Card.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="main">
      <section className="profile">
        <img className="profile__avatar" 
          src={currentUser.avatar}
          alt="Жак-Ив-Кусто"/>
          <div 
            className="profile__avatar-edit" 
            onClick={props.onEditAvatar}>
          </div>
        <div className="profile__info">
          <div className="profile__first-line">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button 
              aria-label="Edit" 
              className="profile__button-edit" 
              onClick={props.onEditProfile} 
              type="button">
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button 
          aria-label="Add" 
          className="profile__button-add" 
          onClick={props.onAddPlace} 
          type="button">
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map( (item) => {
            return (
              <Card 
                card={item} 
                key={item._id} 
                onCardClick={props.onCardClick} 
                onCardLike={props.onCardLike} 
                onCardDelete={props.onCardDelete} 
              />
            )
          })}
        </ul>
      </section>
    </div>
  );
  
};

export default Main;