const nodemailer = require("nodemailer");
let config = require("./config.json");

let transporter = nodemailer.createTransport({
    host: "https://europa.protondns.net:2080",
    port: 2080,
    secure: false,
    auth: {
        user: config.email,
        pass: config.password,
    },
});

module.exports = transporter;``