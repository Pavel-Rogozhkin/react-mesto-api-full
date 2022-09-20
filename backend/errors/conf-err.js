// errors/conf-err.js

class ConfError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { ConfError };
