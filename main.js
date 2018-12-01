const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const messagesFile = "messages.json";

var messages = [];
if(fs.existsSync(messagesFile)) {
	var messageJson = fs.readFileSync(messagesFile);
	messages = JSON.parse(messageJson);
}

app.use("/", express.static("www"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/messages", (req, res) => {
	res.json(messages);
});

app.post("/submit", (req, res) => {
	if(req.body.name && req.body.message) {
		messages.push({
			name: req.body.name,
			message: req.body.message
		});
		saveMessages();
	}
	res.redirect("/");
});

app.listen(80, () => {
	console.log("Listening on port 80");
});

function saveMessages() {
	var messagesJson = JSON.stringify(messages);
	fs.writeFile(messagesFile, messagesJson, (err) => {
		if(err) throw err;
	});
}
