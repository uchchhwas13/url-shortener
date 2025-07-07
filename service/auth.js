const jwt = require('jsonwebtoken');
const secret = "roy@1234567890";

function setUser(user) {
    return jwt.sign(user, secret);
}   

function getUser(token) {
    console.log('Token received:', token);
    if(!token) return null;
    return jwt.verify(token, secret);
}   

module.exports = {
    setUser,
    getUser
};