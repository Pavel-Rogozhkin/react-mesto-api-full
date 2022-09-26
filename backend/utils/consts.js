const regexValidUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;
const SERVER_CODE = 500;

module.exports = {
  regexValidUrl,
  SERVER_CODE,
};
