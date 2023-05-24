

module.exports = function (req , res , next) {
    if(!req.user.isAdmin){
        return res.status(403).json('not admin')
    }
    next()
}
// "username" : "ahmed alnahhal",
// "email" : "ahmed@gmail.com",
// "password" : "23542fghaA@"