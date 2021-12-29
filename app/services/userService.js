const User = require('../models/User');

module.exports = class UserService {

    static async userCreate(userData) {
        try {
            const newUer = {
                name: userData.name,
                email: userData.email,
                password: userData.password
            }
            const response = await new User(newUer).save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserbyEmail(userEmail){
        try {
            const singleUserResponse =  await User.findOne({email: userEmail});
            return singleUserResponse;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }
}