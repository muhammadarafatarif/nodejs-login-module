const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUsers = (res, req, next) => {
    // get user from jwt and add id it to req object
    const token = req.header('auth-token');

    if( ! token ){
        res.status(401).send({error: "please authenticate usin a valid token"});
    }

    try{
        const tokenVerification = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenVerification.user;
        next();
    } catch(error){
        res.status(401).send({error: "please authenticate usin a valid token"});
    }
}

module.exports = fetchUsers;