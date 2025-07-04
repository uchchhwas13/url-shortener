const User = require('../models/user');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    
    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Nme, password and email are required' });
    }
    
    await User.create({
        name: name,
        email: email,
        password: password,
    });
    return res.render("home");
}

module.exports = {
    handleUserSignup
};