var express = require('express');
var router = express.Router();
var mongooe = require('mongoose');
var userdataModule = require('../module/UserModule');

class Users {

    // data save
    async SaveUserData(data, cb) {
        // databased Fillter
        const existingUser = await userdataModule.findOne({
            $or: [
                { AUREmail: data.AdUsEmail },
                { AURMobile: data.AdUsMobile },
                { AURUserid: data.AdUsUserid }
            ],
        });
        // Messages
        if (existingUser) {
            return cb({ Status: "err", Msg: "User with this name, mobile number or email already exists" });
        } else {

            let UserRegister = {};
            UserRegister.AURName = data.AdUsName;
            UserRegister.AUREmail = data.AdUsEmail;
            UserRegister.AURMobile = data.AdUsMobile;
            UserRegister.AURUserid = data.AdUsUserid;
            UserRegister.AURPassword = data.AdUsPassword;
            UserRegister.AURcomfpass = data.AdUsComPassword; 
            UserRegister.AURRoll = data.AdUsroll;

            let UserdataModel = new userdataModule(UserRegister);

            await UserdataModel.save((err, data) => {
                if (err) {
                    return cb({ Status: "err", Msg: "Error While Saving Data" });
                } else {
                    return cb({ Status: "suc", Msg: "Data Detail Saved" });
                }
            });
        }
    }

    // data find & Fetch
    //get all user data Find
    async GetAllUser(cb) {
        await userdataModule.find({}, (err, Users) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (Users == null) {
                return cb({ Status: "err", Msg: "No data is there", data: err });
            } else {

                return cb({ Status: "suc", Msg: "User found", data: Users });
            }
        }).clone().catch(function(err) { console.log(err) });
    }

    // Active and inactive
    async activeanddeactivedata(data, cb) {
        const userId = data;
        try {
            const user = await userdataModule.findOne({ UID: userId });
            if (!user) {
                cb({ Status: "err", Message: "User not found." });
            } else {
                if (user.isActive) {
                    userdataModule.findOneAndUpdate({ UID: userId }, { $set: { isActive: false } }, (err, data) => {});
                } else {
                    userdataModule.findOneAndUpdate({ UID: userId }, { $set: { isActive: true } }, (err, data) => {});
                }
                cb({ Status: "suc", Message: "User data updated successfully." });
            }
        } catch (error) {
            cb({ Status: "err", Message: "Failed to update user data." });
        }
    }

    // User Login
    async UserLogin(loginname, loginpassword) {
        try {
            // Module Data 
            const user = await userdataModule.findOne({ $or: [{ AURName: loginname }, { AUREmail: loginname }, { AURMobile: loginname }, { AURUserid: loginname }], AURPassword: loginpassword });
            // Error and match and success 
            if (!user) {
                return { Status: "err", Msg: "User not found", User: null };
            }
            return { Status: "suc", Msg: "Logged in successfully", User: user };
        } catch (error) {
            // Check the error message in the catch block to see if it provides any more information
            console.log(error);
            return { Status: "err", Msg: "Error while checking login details", User: null };
        }
    }

}
module.exports = Users;