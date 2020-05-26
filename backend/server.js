const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

app.use(cors());
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

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const devicesRouter = require("./routes/device");
app.use("/devices", devicesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
