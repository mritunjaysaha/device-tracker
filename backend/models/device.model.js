const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: { type: String, required: true },
    // mac: { type: String },
    // lat: { type: String },
    // lng: { type: String },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
