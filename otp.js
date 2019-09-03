const Express = require("express");
const BodyParser = require("body-parser");
const otplib = require('otplib');


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post("/totp-secret", (request, response, next) => {
    var secret = otplib.authenticator.generateSecret();
    response.send({ "secret": secret });
});
app.post("/totp-generate", (request, response, next) => {
    var secret = request.body.secret
    response.send({
        "token": otplib.authenticator.generate(secret),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
});
app.post("/totp-validate", (request, response, next) => {
    var secret = request.body.secret
    var token = request.body.token
    try {
        const isValid = otplib.authenticator.check(token, secret);
        console.log(isValid)
        response.send({
            "valid": isValid
        });
    } catch (err) {
        console.error(err);
        response.send({
            "valid": err
        });
    }
    
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});