


module.exports = function  (req , res , next) {
    if(!req.user.isAdmin){
        return res.status(403).send('not admin')
    }
    next()
}
// "username" : "ahmed alnahhal",
// "email" : "ahmed@gmail.com",
// "password" : "23542fghaA@"

// module.exports = {
//     isAdmin: (req, res, next) =>{
//         if(req.user.admin){
//             next();
//         }else{
//             res.status(403).send();
//         }
//     }
// }