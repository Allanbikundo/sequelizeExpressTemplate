const express = require('express')
const app = express()
const times = require("lodash.times");
const faker = require("faker");
const cron = require("node-cron");
const nodemailer = require("nodemailer")
const axios = require("axios")
const webpush = require('web-push');
const bodyParser = require('body-parser')
const path = require('path')
const apiArthur = require("./requests/arthur");
const port = process.env.PORT
var db = require("./models");
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;


apiArthur(app,db)

passport.use(new Strategy(
  function (token, cb) {
    db.users.findByToken(token, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

app.use(bodyParser.json());

app.use(require('morgan')('combined'));

db.sequelize.sync().then(() => {
  db.Article.bulkCreate(
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

cron.schedule("*/5 * * * *", function () {
  console.log("---------------------");
  console.log("Running Cron Job");
  axios.get("http://api.icndb.com/jokes/random").then(function (response) {
    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: "test@test.com",
      subject: `CRON JOB TEST MAIL`,
      text: response.data.value.joke
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  }).catch(function (error) {
    // handle error
    console.log(error);
  })
});

app.get('/auth',
  passport.authenticate('bearer', { session: false }),
  function (req, res) {
    res.json({ username: req.user.username, email: req.user.emails[0].value });
  }
);

// push notificatins

app.use(express.static(path.join(__dirname, "client")))
// generete Keys
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.privateKey)
// console.log(vapidKeys.publicKey)
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privatePublicKey = process.env.PRIVATE_VAPID_KEY

webpush.setVapidDetails(
  'mailto:test@test.org',
  publicVapidKey,
  privatePublicKey
  );

// Subscribe route
app.post('/subscribe', (req, res) => {
  const subscription = req.body

  res.status(201).json({});

  const payload = JSON.stringify({ title: "push Test" })

  webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))