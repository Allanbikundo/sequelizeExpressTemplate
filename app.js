const express = require('express')
const app = express()
const times = require("lodash.times");
const faker = require("faker");
const cron = require("node-cron");
const nodemailer = require("nodemailer")

const port = process.env.PORT
var db = require("./models");
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;



passport.use(new Strategy(
  function (token, cb) {
    db.users.findByToken(token, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

app.use(require('morgan')('combined'));

db.sequelize.sync().then(() => {
  db.article.bulkCreate(
    times(10, () => ({
      title: faker.lorem.words(10),
    }))
  );
});

let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

cron.schedule("* * * * *", function(){
  console.log("---------------------");
  console.log("Running Cron Job");
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: "allanbmageto@gmail.com",
    subject: `CRON JOB TEST MAIL`,
    text: faker.internet.url()
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});


console.log(faker.internet.exampleEmail(), ",", faker.name.firstName(), ",", faker.lorem.words(20), ",", faker.finance.amount(), ",", faker.lorem.words(5))

app.get('/',
  passport.authenticate('bearer', { session: false }),
  function (req, res) {
    res.json({ username: req.user.username, email: req.user.emails[0].value });
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))