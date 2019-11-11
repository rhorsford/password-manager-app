const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = require("./keys").encryptKey;


module.exports = function decryptedFunction(text) {
    let decipher = crypto.createDecipher(algorithm, secretKey);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  };

