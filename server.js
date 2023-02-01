

/* Init -------------------------------------------------------------- */


const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({"extended" : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


/* Global variables -------------------------------------------------- */


const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = ["Study!"];


/* Home rout --------------------------------------------------------- */


/* Sending the home rout to the browser */
app.get("/", function(req, res) {
    /* Date */
    const day = date.getDay();

    /* Render */
    res.render("list", {listHeading: day, newListItem: items, rout: "/"});
});

/* Receiving the posts from the home rout */
app.post("/", function(req, res) {
    const item = req.body.newTask;
    
    items.push(item);
    
    res.redirect("/");
});


/* Sending the work list rout to the browser */
app.get("/work", function(req, res) {
    const heading = "Work";

    const href = req._parsedOriginalUrl.href;

    res.render("list", {listHeading: heading, newListItem: workItems, rout: href});
});

/* Receiving the posts from the home rout */
app.post("/work", function(req, res) {
    const workItem = req.body.newTask;

    workItems.push(workItem);

    res.redirect("/work");
});

/* Sending the about rout to the browser */
app.get("/about", function(req, res) {
    res.render("about");
});


/* Port -------------------------------------------------------------- */


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
