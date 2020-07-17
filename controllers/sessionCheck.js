module.exports = (req, res, next) => {
    if (req.user) {
        return {
            status: true,
            type: req.user.type
        }
    } 
    return false;
}