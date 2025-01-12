const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    instructor_id: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
});

module.exports = mongoose.model('Course', courseSchema);