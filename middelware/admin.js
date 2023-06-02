const { userModel } = require("../src/models/user")

module.exports = async  function  (req , res , next) {
      // Get user input
  const { email } = req.body;
  // find el email in database
    const user = await userModel.findOne({email });
    // check email is Admin or not    
    if(!user.isAdmin){
        return res.status(403).json('not admin')
    }
    // res.send('you admin')
    next();
}
// "username" : "ahmed alnahhal",
// "email" : "ahmed@gmail.com",
// "password" : "23542fghaA@"

// {
//     "username" : "sondos",
//     "email" : "sondos@gmail.com",
//     "password" : "2354gfhdHf2@@"
    
//     }

// module.exports = {
//     isAdmin: (req, res, next) =>{
//         if(req.user.admin){
//             next();
//         }else{
//             res.status(403).send();
//         }
//     }
// }