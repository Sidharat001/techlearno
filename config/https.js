//for implementation of https we need key and cret
// To generate a self-signed certificate, run the following in your shell:
// change director in github  cd /d/nodejs/myapp/ssl
// openssl genrsa -out key.pem
// openssl req -new -key key.pem -out cert.pem
// openssl x509 -req -days 360 -in cert.pem -signkey key.pem -out key-cert.pem
// rm cert.pem

var fs = require("fs");
var httpsOptions = {
    key: fs.readFileSync("./ssl" + "/key.pem"),
    cert: fs.readFileSync("./ssl" + "/key-cert.pem")
}
module.exports = httpsOptions;