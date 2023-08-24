const mongooes = require('mongoose');
var uuid = require("uuid");

const userschema = new mongooes.Schema({
    UID: {
        type: String,
        unique: true,
        default: uuid.v4(),
        required: [true, "ID can't be blank"],
        index: true
    },
    AURName: {
        type: String
    },
    AUREmail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    AURMobile: {
        type: String
    },
    AURUserid: {
        type: String,
        default: "Admin"
    },
    AURPassword: {
        type: String,
        default: "Admin@12"

    },
    AURcomfpass: {
        type: String,
        default: "Admin@12"
    },
    AURRoll: {
        type: String,
        enum: ["Admin", "Sales", "Caller", "Tearm Lead", "HR"],
        default: "Caller"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    U_Added_date: {
        type: Date,
        default: Date.now
    },
    U_Last_log_inDate: {
        type: Date
    }
});

module.exports = users = mongooes.model('users', userschema);