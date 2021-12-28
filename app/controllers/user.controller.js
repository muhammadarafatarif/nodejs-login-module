const UserService = require('../services/userService');

const jwt = require('jsonwebtoken');
jwtKey = "jwt";

module.exports = class User{

    static async apiUserRegister(req, res, next){
        try {
           const userRegister =  await UserService.userRegister(req.body).then((result) => {
            jwt.sign({result}, jwtKey, {expiresIn:"300s"}, (err, token) => {
                // res.status(201).json(userRegister);
                res.status(201).json({token});
            });
        });
        } catch (error) {
           res.status(500).json({error: error});
        }
    }

    static async apiUserLogin(req, res) {
        try {
            let password = req.body.password;
            let email = req.body.email;
            const user = await UserService.userLogin(email, password);
            console.warn(user);
            res.json(user);
            // if( user ){
                

            //     jwt.sign({result}, jwtKey, {expiresIn:"300s"}, (err, token) => {
            //         // res.status(201).json(userRegister);
            //         res.status(200).json({token});
            //     });
            // }

        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}