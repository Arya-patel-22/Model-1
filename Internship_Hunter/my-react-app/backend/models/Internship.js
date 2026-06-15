const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    domain: { type: String, required: true },
    requiredSkills: [{ type: String }],
    location: { type: String, required: true },
    stipend: { type: String, required: true },
    duration: { type: String, required: true },
    applyLink: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Internship", InternshipSchema);
