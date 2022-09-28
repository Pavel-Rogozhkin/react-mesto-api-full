const { SERVER_CODE } = require('../utils/consts');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = SERVER_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = errorsHandler;
