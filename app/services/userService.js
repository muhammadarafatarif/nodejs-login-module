const User = require('../models/User');

module.exports = class UserService{

    static async userLogin(emailAddress, password) {
        try {
            const checkUserResponse =  await User.findOne({email: emailAddress, password: password}).select('-password');
            return checkUserResponse;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }
}