const { enrollCourseService, getCourseByStudentIdService } = require("../services/enrollments.service");

async function enrollCourse(req, res) {
    try {
        const {message, status} = await enrollCourseService(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

async function getCourseByStudentId(req, res) {
    try {
        const {message, status} = await getCourseByStudentIdService(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

module.exports = { enrollCourse, getCourseByStudentId };