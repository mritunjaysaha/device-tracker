const express = require("express");
const app = express();
const User = require("./models/user.model");
app.use(express.json());
