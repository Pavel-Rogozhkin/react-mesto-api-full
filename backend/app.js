const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const console = require('console');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { createNewUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { NotFoundError } = require('./errors/not-found-err');
const { regexValidUrl, SERVER_CODE } = require('./utils/consts');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

console.log(process.env);
const {
  PORT = 4000,
  MONGO_URI,
} = process.env;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://pashalex.nomorepartiesxyz.ru',
    'https://localhost:3000',
    'https://pashalex.nomorepartiesxyz.ru',
  ],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexValidUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createNewUser);

app.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход выполнен' });
});

app.use(express.json());
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res, next) => {
  try {
    return next(new NotFoundError('Страница не найдена'));
  } catch (err) {
    return next();
  }
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = SERVER_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function server() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
  });
}

server();
