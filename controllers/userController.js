const User = require('../models/User');

module.exports.getUserLogin = (req, res, next) => {
    res.render("pages/login");
}

module.exports.getUserRegister = (req, res, next) => {
    res.render("pages/register");
}

module.exports.postUserRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];
    const validationError = require('../validation/formValidation').registerValidation(username, password);

    //  Error Check
    if (validationError.length > 0) {
        return res.render("pages/register", {
            username: username,
            password: password,
            errors: validationError
        });
    }

    // Database check for user & registration
    User.findOne({username}).then(user => {
        if (user) {
            errors.push({message : "Username already in use!"});
            return res.render("pages/register", { errors });
        } else {
            const newUser = new User({
                username,
                password,
                joinDate: new Date(),
                userType: 1
            });
            newUser.save()
            .then( () => {
                res.render("pages/index", { username });
            })
            .catch(e => console.log(e));
        }
    });


}

module.exports.postUserLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];

    User.findOne({username}).then(user => {
        if (!user) {
            errors.push({message : "Username or password doesn't match!"});
            return res.render("pages/login", { errors });
        } 
        if (user) {
            if (password !== user.password) errors.push({message : "Username or password doesn't match!"});

            if (errors.length > 0) {
                return res.render("pages/login", { errors });
            }

            return res.render("pages/index", { username });
            
        }
    }).catch(e => console.log(e));
}
