const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = require("./keys").encryptKey;

// Encryption type

module.exports = function encryptedFunction(text) {
    let cipher = crypto.createCipher(algorithm, secretKey);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  };


