const courseModel = require("../database/Models/courses.model");
const userModel = require("../database/Models/users.model");
const enrollmentModel = require("../database/Models/enrollments.model");

async function enrollCourseService(req) {
    try {
        const { course_id, student_id, enrollment_date } = req.body;
        const findCourse = await courseModel.findById(course_id);
        if (!findCourse) {
            return { message: "Course not found", status: 404 };
        }
        const findStudent = await userModel.findById(student_id);
        if (!findStudent) {
            return { message: "Student not found", status: 404 };
        }
        const enrollment = new enrollmentModel({ course_id, student_id, enrollment_date, progress: 0 });
        await enrollment.save();
        return { message: "Course enrolled successfully", status: 201 };
    } catch (error) {
        throw new Error("Course did not enroll ! " + error);
    }
    
}

async function getCourseByStudentIdService(req) {
    try {
        const {id} = req.params;
        const courses = await enrollmentModel.find({ student_id: id }).populate("course_id");
        
    } catch (error) {
        throw new Error("Course not found " + error);
        
    }
}

module.exports = { enrollCourseService, getCourseByStudentIdService };