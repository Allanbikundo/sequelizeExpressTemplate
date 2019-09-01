# Introduction

# Features
Cron Jobs
Passport authentication
Push notifications
Sequelize

# Running it
NPM install
Rename the EXAMPLE file to .env and fill in the respective fields

to create the vapid key 
run app.js once and console.log bboth vapid keys
In the config folder rename exampleConfig.json to config.json and edit the file with the needed variables

## Useful links and notes
https://scotch.io/tutorials/nodejs-cron-jobs-by-examples

* * * * * *
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second ( optional )

node-cron run job every 3 hours
You should zero-out the second and minute values, and use a step of /3. The cron expression for this is

0 0 */3 * * *

Which evaluates to 'At 0 seconds, 0 minutes every 3rd hour'.
