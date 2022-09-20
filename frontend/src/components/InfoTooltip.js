import PopupWithForm from "./PopupwithForm.js";
import okImg from "../images/authOk.svg";
import failImg from "../images/authFail.svg";

function InfoTooltip(props) {

  return (
    <PopupWithForm 
      name="popup"
      isOpen={props.isOpen}
      onClose={props.onClose}
      style={
        {
          visibility: "hidden",
        }
      }
      buttonText={props.regOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
    >
      <img 
        className="popup__infotooltip-img"
        src={props.regOk ? `${okImg}` : `${failImg}`}
        alt={props.regOk ? "Успех!" : "Что-то пошло не так!"}
      />
      <p 
        className="popup__title"
      >
        {props.regOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
      </p>  
    </PopupWithForm>
  );

};

export default InfoTooltip;