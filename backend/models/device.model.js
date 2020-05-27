const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    username: { type: String, required: true },
    devicename: { type: String, required: true },
    devicemac: [{ type: String, required: true }],
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
