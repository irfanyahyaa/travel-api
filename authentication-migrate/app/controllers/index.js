// file dengan nama index.js akan selalu dibaca (di folder manapun), bisa dilihat di package.json bahwa "main": "index.js"
const verifySign = require("./verifySign");
const verifySignUp = require("./verifySignUp");
const verifyJwtToken = require("./verifyJwtToken");
const status = require("./status");

module.exports = {
  verifySign,
  verifySignUp,
  verifyJwtToken,
  status,
};
