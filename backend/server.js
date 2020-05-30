const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());

app.use(cookieParser());
app.use(express.json());

const uri =
    "mongodb+srv://device:device@cluster-7wx2i.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/user");
app.use("/user", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
