const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/signup.html");


});

app.post("/", function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    let jsondata = JSON.stringify(data);
    console.log(firstName + " " + lastName + " " + email);

    let options = {
        url: "https://us19.api.mailchimp.com/3.0/lists/a1c7df11a6",
        method: "POST",
        headers: {
            "Authorization": "gmatias89 c68f9866bf209f5a35328c54a4cd9148-us19"
        },
        body: jsondata

    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + "/public/failure.html");
        } else if (response.statusCode === 200) {
            res.sendFile(__dirname + "/public/success.html");

        } else {
            res.sendFile(__dirname + "/public/failure.html");
        }

    });

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000");

});

//c68f9866bf209f5a35328c54a4cd9148-us19
//a1c7df11a6