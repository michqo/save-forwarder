const express = require("express");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
});

db.run("CREATE TABLE players(username text, password text)");

const app = express();
const port = 5000;

app.post("/add", (req, res) => {
    db.run(`INSERT INTO players (username, password) VALUES ("${req.headers.username}", "${req.headers.password}")`)
    res.send(req.headers.username + " " + req.headers.password);
});

app.get("/list", (req, res) => {
    let players = {};
    function addPlayer(data) {
        players[Object.keys(players).length] = data;
    }
    db.all("SELECT * FROM players", (err, row) => {
        row.forEach(data => {
            addPlayer(data);
        });
        res.json(players);
    });
});

app.listen(port, () => console.log("Listening on port 5000"));