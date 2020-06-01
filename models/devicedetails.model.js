const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    details: { type: Object },
});

const Details = mongoose.model("Details", detailsSchema);

module.exports = Details;
