const UserService = require('../services/userService');
require('dotenv').config();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


module.exports = class User {

    static async apiGetAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            if (!users) {
                res.status(404).json("There are no user registered yet!")
            }
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.user.id || {};
            const user = await UserService.getUserbyId(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async apiCreateUser(req, res, next) {
        try {

            let user = await UserService.getUserbyEmail(req.body.email);
            if (user) {
                return res.status(400).json({ error: 'Sorry a user with this email is already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            const userRegister = await UserService.createUser(req.body).then((result) => {

                const data = {
                    user: {
                        id: result.id
                    }
                }
                const authToken = jwt.sign(data, process.env.JWT_SECRET);

                //res.status(201).json(result);

                res.json({ authtoken: authToken });
            });

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiUserLogin(req, res) {
        try {

            let email = req.body.email;

            let user = await UserService.getUserbyEmail(email);
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1800s'});
            res.json({ authtoken: authToken });
            // res.json(user);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal Server Error");
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const updatedData = {}
            updatedData.name = req.body.name;
            updatedData.email = req.body.email;
            updatedData.password = req.body.password;

            const updatedUser = await UserService.updateUser(updatedData);

            if (updatedUser.modifiedCount === 0) {
                throw new Error("Unable to update user, error occord");
            }

            res.json(updatedUser);

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const userId = req.body.id;
            const deleteResponse = await UserService.deleteUser(userId)
            res.json(deleteResponse);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

}