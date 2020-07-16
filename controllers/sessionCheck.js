module.exports = (req, res, next) => {
    if (req.user) {
        res.redirect("/");
        return true;
    } 
    return false;
}