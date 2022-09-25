import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { useState, useEffect } from 'react';
import Api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Auth from '../utils/Auth.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [authorizedEmail, setAuthorizedEmail] = useState("");
  const [regOk, setRegOk] = useState(false);

  useEffect( () => {
    if (loggedIn) {
      Promise.all([ Api.getCards(), Api.getUserInfo() ])
      .then(( [ cardsItems, userProfile ] ) => {
        setLoggedIn(true);
        setCards(cardsItems);
        setCurrentUser(userProfile);
        })
      .catch(err => {console.log(err)});
    }
  }, [loggedIn] );

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsPopupClosed(!isPopupClosed);
    setSelectedCard({});
    setIsInfoToolTipPopupOpen(false);
  };
  
  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    Api.changeCardLikeState(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        closeAllPopups();
    })
      .catch(err => {console.log(err)});
  };

  function handleCardDelete(card) {

    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch(err => {console.log(err)});
  };

  function handleUpdateUser(user) {
    Api.editUserInfo({name: user.name, about: user.about})
      .then ((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {console.log(err)});
  };

  function handleUpdateAvatar(user) {
    Api.editAvatar(user.avatar)
      .then ((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {console.log(err)});
  };

  function handleAddPlaceSubmit(card) {
    Api.addCard({name: card.name, link: card.link})
      .then ((res) => {
        setCards([res,...cards]);
        closeAllPopups();
      })
      .catch(err => {console.log(err)});
  };

  // useEffect(() => {
  //   handleTokenValid();
  // }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  // function handleTokenValid() {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt');
  //     Auth.tokenValidation(jwt)
  //     .then((res) => {
  //       setLoggedIn(true);
  //       setAuthorizedEmail(res.data.email);
  //     })
  //     .catch((err) => console.log(err));
  //   }
  // };

  function handleLoginSubmit(email, password) {
    if (!email || !password) {
      return;
    }
    Auth.authorize(email, password)
      .then(() => {
          setLoggedIn(true);
          setRegOk(true);
          setAuthorizedEmail(email);
          history.push("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        setRegOk(false);
        handleInfoTooltip();
      });
  };

  function handleRegisterSubmit(email, password) {
    Auth.register(email, password)
      .then(() => {
        setRegOk(true);
        handleInfoTooltip();
        history.push("/signin");
      })
      .catch(() => {
        setRegOk(false);
        handleInfoTooltip();
      });
  };

  function handleInfoTooltip() {
    setIsInfoToolTipPopupOpen(!isInfoToolTipPopupOpen);
  };

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

  return (
    <CurrentUserContext.Provider 
      value={currentUser}
    >
      <div className='page'>
        <Header 
          email={authorizedEmail}
          signOut={signOut}
        />
          <Switch>
            <Route path='/signin'>
              <Login 
                onLogin={handleLoginSubmit}
              />
            </Route>
            <Route path='/signup'>
              <Register
                onRegister={handleRegisterSubmit}
              />
            </Route>
            <ProtectedRoute
              component={Main}
              exact path="/"
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick} 
              onCardClick={handleCardClick} 
              cards={cards} 
              onCardLike={handleCardLike} 
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
        <Footer />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onUpdatePlace={handleAddPlaceSubmit} 
        />
        <ImagePopup 
          onClose={closeAllPopups} 
          card={selectedCard} 
        />
        <InfoTooltip 
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          regOk={regOk}
        />
      </div>
    </CurrentUserContext.Provider>
  );
  
};

export default App;
