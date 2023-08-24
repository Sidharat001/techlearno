//Require module
var jwt = require('jsonwebtoken');

class JWT {
    async generateAccessToken(UserData) {
        var data = await jwt.sign(UserData, process.env.TOKEN_SECRET);
        return data;
    }
    async getUID(token) {
        var output2 = await jwt.verify(token, process.env.TOKEN_SECRET);
        return output2;
    }
}

module.exports = JWT;