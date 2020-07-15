const User = require('../models/User');

module.exports.registerValidation = (username, password) => {
    const errors = [];

    User.findOne({username: username}, (err, res) => {
        if (res) {
            errors.push("Such username already exists!");
        }
    });

    if (password.length < 8) {
        errors.push({message : "Password should be longer than 8 characters!"});
    }

    if (password.includes(username)) {
        errors.push({message : "Password shouldn't contain username!"});
    }

    return errors;
}