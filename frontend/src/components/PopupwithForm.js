function PopupWithForm (props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__content">
        <button 
          aria-label="Close" 
          className="popup__close" 
          type="button" 
          onClick={props.onClose}
        >
        </button>
        <h3 className="popup__title">
            {props.title}
        </h3>
        <form 
          className="popup__form popup__form_type_edit" 
          name={props.name} 
          noValidate 
          onSubmit={props.onSubmit}
        >
            {props.children}
          <button 
            aria-label="Save" 
            className="popup__submit"
            type="submit"
            style={props.style}
          >
              {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );

};

export default PopupWithForm;