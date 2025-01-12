const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const moduleSchema = new Schema({
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true }
});

module.exports = mongoose.model('Module', moduleSchema);