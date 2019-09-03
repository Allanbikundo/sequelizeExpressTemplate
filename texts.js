const credentials = {
    apiKey: process.env.AT_API_KEY, // use your sandbox app API key for development in the test environment
    username: process.env.AT_USER_NAME // use 'sandbox' for development in the test environment
};
const Africastalking = require("africastalking")(credentials);

// Initialize a service e.g. SMS
sms = Africastalking.SMS;


const caseID = 8959;
const messageoptions = {
    to: [`+254793720223`],
    message: `A match for your case id ${caseID} has been found, pairedke.`
};

// Send message and capture the response or error
sms
    .send(messageoptions)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });