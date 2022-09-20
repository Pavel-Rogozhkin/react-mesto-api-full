import React from "react";
import PopupWithForm from "./PopupwithForm.js";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  React.useEffect( () => {
    avatarRef.current.value='';
    }, [props.isOpen] 
  );

  return (
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар" 
      buttonText="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
    >
      <ul className="popup__inputs-list">
        <li className="popup__input-element">
          <input 
            id="avatar-input" 
            className="popup__input popup__input_type_avatar-url" 
            type="URL" 
            name="name" 
            placeholder="Ссылка на аватар" 
            minLength="2" 
            ref={avatarRef} 
            required
          />
          <span className="avatar-input-error popup__span"></span> 
        </li>
      </ul>
    </PopupWithForm>
  );

};

export default EditAvatarPopup;