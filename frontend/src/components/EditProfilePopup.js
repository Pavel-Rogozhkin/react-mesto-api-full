import PopupWithForm from './PopupwithForm.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleAboutChange(e) {
    setAbout(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm 
      name="edit" 
      title="Редактировать профиль" 
      buttonText="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
    >
      <ul className="popup__inputs-list">
        <li className="popup__input-element">
          <input 
            id="name-input" 
            className="popup__input popup__input_type_name" 
            value={name || ""} 
            onChange={handleNameChange} 
            type="text" 
            name="name" 
            placeholder="Имя" 
            minLength="2" 
            maxLength="40" 
            required
          />
          <span className="name-input-error popup__span"></span> 
        </li>
        <li className="popup__input-element">
          <input 
            id="profile-input" 
            className="popup__input popup__input_type_profile" 
            value={about || ""} 
            onChange={handleAboutChange} 
            type="text" 
            name="link" 
            placeholder="Профессия" 
            minLength="2" 
            maxLength="200" 
            required
          />
          <span className="profile-input-error popup__span"></span> 
        </li>
      </ul>
    </PopupWithForm>
  );

};

export default EditProfilePopup;