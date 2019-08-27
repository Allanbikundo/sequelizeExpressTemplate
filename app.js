const express = require('express')
const app = express()
const times = require("lodash.times");
const faker = require("faker");
const port = 3000
var db = require("./models");

db.sequelize.sync().then(() => {
    db.article.bulkCreate(
        times(10, () => ({
          title: faker.lorem.words(10),
        }))
      );
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
