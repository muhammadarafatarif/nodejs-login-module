const User = require('../models/User');

module.exports = class UserService {

    static async getAllUsers() {
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async createUser(data) {
        try {

            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            const response = await new User(newUser).save();
            return response;
        } catch (error) {
            console.log(error);
        }

    }

    static async getUserbyId(userId) {
        try {
            const singleUserResponse = await User.findById({ _id: userId }).select("-password");
            return singleUserResponse;
        } catch (error) {
            console.log(`User not found. ${error}`)
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

    static async updateUser(name, email, password) {
        try {
            const updateResponse = await User.updateOne(
                { name, email, password },
                { $set: { date: new Date.now() } });

            return updateResponse;
        } catch (error) {
            console.log(`Could not update User ${error}`);

        }
    }

    static async deleteUser(userId) {
        try {
            const deletedResponse = await User.findOneAndDelete(userId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete user ${error}`);
        }

    }
}