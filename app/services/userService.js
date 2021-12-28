const User = require('../models/User');

const crypto = require("crypto");
const algorithm = 'aes-256-cbc';

const ENCRYPTION_KEY = crypto.randomBytes(32); // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

module.exports = class UserService{

    static async userRegister(userData) {
        try {
            let iv = crypto.randomBytes(IV_LENGTH);
            let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(userData.password);

            encrypted = Buffer.concat([encrypted, cipher.final()]);

            const newUer = {
                name: userData.name,
                email: userData.email,
                password: iv.toString('hex') + ':' + encrypted.toString('hex')
            }
           const response = await new User(newUer).save();
           return response;
        } catch (error) {
            console.log(error);
        } 
    }

    static async userLogin(emailAddress, password) {
        try {
            const checkUserResponse =  await User.findOne({email: emailAddress}).then((data) => {

                let pwdText = data.password;
                let pswrdParts = pwdText.split(':');

                let iv = Buffer.from(pswrdParts.shift(), 'hex');
                let encryptedText = Buffer.from(pswrdParts.join(':'), 'hex');
                console.warn(pswrdParts);
                let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
                let decrypted = decipher.update(encryptedText);
                
                decrypted = Buffer.concat([decrypted, decipher.final()]);
                let checkMatch = decrypted.toString();

                console.warn(checkMatch);
            });
            
            console.warn(checkUserResponse);
            //return checkUserResponse;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }
}