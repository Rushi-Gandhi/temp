const mongoose = require('mongoose');

const launcherSchema = new mongoose.Schema({
    fligthNumber: { type: Number, require: true },
    mission: { type: String, require: true },
    rocket: { type: String, require: true },
    target: { type: String, require: true },
    launchDate: { type: Date, require: true },
    customer: [String],
    upcoming: { type: Boolean, require: true },
    success: { type: Boolean, require: true, default: true }
});

module.exports = mongoose.model('Launch' , launcherSchema)
