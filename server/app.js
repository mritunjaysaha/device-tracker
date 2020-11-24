require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth");

// Database connection
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established");
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.get("/", (req, res) => res.send("Server is up and running"));
app.use("/api", authRoutes);
// PORT
const PORT = process.env.PORT || 8000;

// Starting a server
app.listen(PORT, () => {
    console.log(`app is running at http://localhost:${PORT}`);
});
