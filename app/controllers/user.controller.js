const UserService = require('../services/userService');
require('dotenv').config();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


module.exports = class User{

    static async apiUserCreate(req, res, next){
        try {

            let user = await UserService.getUserbyEmail(req.body.email);
            if( user ) {
                return res.status(400).json({error: 'Sorry a user with this email is already exists'});
            }

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            const userRegister =  await UserService.userCreate(req.body).then((result) => {

                const data = {
                    user: {
                        id: result.id
                    }
                }
                const authToken = jwt.sign(data, process.env.JWT_SECRET);

                //res.status(201).json(result);

                res.json({authtoken: authToken});
            });

        } catch (error) {
           res.status(500).json({error: error});
        }
    }

    static async apiUserLogin(req, res) {
        try {

            let email = req.body.email;

            let user = await UserService.getUserbyEmail(email);
            if( ! user ){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);

            if( ! passwordCompare ) {
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            res.json({authtoken: authToken});
            // res.json(user);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal Server Error");
        }
    }
}