const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    },
    progress: {
        type: Number,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
