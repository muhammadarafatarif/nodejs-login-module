const jwt = require('jsonwebtoken');
require('dotenv').config();
//console.log(process.env.JWT_SECRET);

const fetchuser = (req, res, next) => {

    // get user from jwt and add id it to req object
    const token = req.header('authtoken');
    // console.log(req.header);
    if( ! token ){
        res.status(401).send({error: "please authenticate using a valid token"});
    }

    try{
        const tokenVerification = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenVerification.user;
        next();
    } catch(error){
        res.status(401).send({error: "please authenticate using a valid token"});
    }
}

module.exports = fetchuser;