const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: { type: String, required: true },
    mac: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    accuracy: { type: String, required: true },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
