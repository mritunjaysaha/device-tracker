const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    username: { type: String },
    devicename: { type: String },
    devicemac: [{ type: String }],
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
