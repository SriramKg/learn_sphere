const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const enrollmentSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollment_date: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);