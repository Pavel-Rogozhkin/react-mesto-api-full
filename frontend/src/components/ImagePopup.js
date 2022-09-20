function ImagePopup (props) {

  return (
    <div className={`popup popup_type_photo ${props.card.link && "popup_opened"}`}>
      <div className="popup__content-photo">
        <img 
          className="popup__photo" 
          src={`${props.card ? props.card.link : ""}`} 
          alt={props.card.name}
        />
        <button 
          aria-label="Close" 
          className="popup__close popup__close_type_photo" 
          type="button" 
          onClick={props.onClose}>
        </button>
        <h3 className="popup__title-photo">{props.card.name}</h3>
      </div>
    </div>
  );
  
};

export default ImagePopup;