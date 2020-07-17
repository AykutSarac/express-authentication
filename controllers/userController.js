const User = require('../models/User');
const passport = require('passport');
const sessionCheck = require('./sessionCheck'); //  Check whether if user logged in or not
require('../authentication/passport/local');

module.exports.getUserLogin = (req, res, next) => {
    if (sessionCheck(req, res, next).status) return res.redirect("/");
    res.render("pages/login");
}

module.exports.getUserRegister = (req, res, next) => {
    if (sessionCheck(req, res, next).status) return res.redirect("/");
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
                isAdmin: false
            });
            newUser.save()
            .then( () => {
                req.flash("registerSuccess", "Registered successfully!");
                res.redirect("/login");
            })
            .catch(e => console.log(e));
        }
    });
}

module.exports.postUserLogin = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect : "/",
        failureRedirect : "/login",
        successFlash : true,
        failureFlash: true
    })(req, res, next);
}

module.exports.getUserLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.getProfile = (req, res, next) => {
    if (!sessionCheck(req, res, next).status) return res.redirect("/login");
    res.render("pages/profile");
}