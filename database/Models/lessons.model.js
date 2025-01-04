const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const lessonSchema = new Schema({
    module_id: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    content_type: { type: String, required: true },
    content_url: { type: String, required: true }
});

module.exports = mongoose.model('Lesson', lessonSchema);