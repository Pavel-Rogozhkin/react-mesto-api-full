/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');

const auth = async (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  // const token = '05e45ebf-d4ff-4e41-8bcf-ab592cb66400';
  try {
    payload = await jwt.verify(token, 'Enigma');
  } catch (err) {
    return next(new AuthError('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
