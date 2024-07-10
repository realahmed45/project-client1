const crypto = require("crypto");

// Generate a random secret key
const secretKey = crypto.randomBytes(6).toString("hex");

console.log(secretKey);
