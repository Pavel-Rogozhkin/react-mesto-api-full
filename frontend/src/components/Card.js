import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card ( { card, onCardClick, onCardLike, onCardDelete } ) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteCard() {
    onCardDelete(card);
  };

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__heart ${isLiked ? 'element__heart_active' : ''}`;

  return (
    <li className="element" >
      <img 
        className="element__photo" 
        onClick={handleClick} 
        src={card.link} 
        alt={card.name} 
      />
      <button 
        aria-label="Delete" 
        className={cardDeleteButtonClassName} 
        type="button" 
        onClick={handleDeleteCard}>
      </button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <button 
          aria-label="Heart" 
          className={cardLikeButtonClassName} 
          type="button" 
          onClick={handleLikeClick}
        >
          <p className="element__heart_ind_count">{card.likes.length}</p>
        </button>
      </div>
    </li>
  );

};

export default Card;