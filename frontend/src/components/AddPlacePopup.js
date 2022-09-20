import React from "react";
import PopupWithForm from "./PopupwithForm.js";


function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name,
      link
    });
  };

  React.useEffect( () => {
    setName("");
    setLink("");
    }, [props.isOpen] 
  );

  return (
    <PopupWithForm 
      name="add" 
      title="Новое место" 
      buttonText="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
    >
      <ul className="popup__inputs-list">
        <li className="popup__input-element">
          <input 
            id="title-input" 
            className="popup__input popup__input_type_title" 
            value={name} 
            onChange={handleNameChange} 
            type="text" 
            name="name" 
            placeholder="Название" 
            minLength="2" 
            maxLength="30" 
            required 
          />
          <span className="title-input-error popup__span"></span> 
        </li>
        <li className="popup__input-element">
          <input 
            id="link-input" 
            className="popup__input popup__input_type_link" 
            value={link} 
            onChange={handleLinkChange} 
            type="URL" name="link" 
            placeholder="Ссылка на картинку" 
            required 
          />
          <span className="link-input-error popup__span"></span>
        </li>
      </ul>
    </PopupWithForm>
  );

};

export default AddPlacePopup;