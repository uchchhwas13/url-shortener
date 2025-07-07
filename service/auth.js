const jwt = require('jsonwebtoken');
const secret = "roy@1234567890";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email
        }, secret);
}   

function getUser(token) {
    console.log('Token received:', token);
    
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    }catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}   

module.exports = {
    setUser,
    getUser
};