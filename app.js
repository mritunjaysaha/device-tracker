// EJS WITH EXPRESS

const app = require("express")();
const address = require("address");
const bodyparser = require("body-parser");

// Set view engine to ejs
app.set("view engine", "ejs");

// Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views");

// Use body-parser
app.use(bodyparser.urlencoded({ extended: false }));

// // Instead of sending ejs, we render index.ejs
// app.get("/", (req, res) => {
//     res.render("index");
// });

app.listen(8080, () => {
    console.log("Server online on port 8080");
});

// RENDERING VARIABLES FROM BACKEND(NODE.JS)
// const user = "Prodicode";

const macAdd = address.mac(function (err, addr) {
    return addr;
});
app.get("/", (req, res) => {
    res.render("index", { username: macAdd });
});
