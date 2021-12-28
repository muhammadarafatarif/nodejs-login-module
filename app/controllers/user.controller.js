const UserService = require('../services/userService');

module.exports = class User{

    static async apiUserLogin(req, res) {
        try {
            let password = req.body.password;
            let email = req.body.email;
            const user = await UserService.userLogin(email, password);
            res.json(user);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}