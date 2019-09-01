# Introduction

# Features
- [x] Cron Jobs
- [x] Passport authentication
- [x] Push notifications
- [x] Sequelize

# Running it
1. NPM install
2. Rename the EXAMPLE file to .env and fill in the respective fields

3. To create the vapid key 
4. Run app.js once and console.log both vapid keys
5. In the config folder rename exampleConfig.json to config.json and edit the file with the needed variables

## Useful links and notes
[cron jobs examples]https://scotch.io/tutorials/nodejs-cron-jobs-by-examples

* * * * * * \n
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
[EOF]
