const express = require('express');
const router = express.Router();

const { enrollCourse, getCourseByStudentId } = require("../controllers/enrollments.controller");
const authorizeUser = require("../middlewares/authorize.middleware");

router.post("/", authorizeUser, enrollCourse);
router.get("/student/:id", authorizeUser, getCourseByStudentId);

module.exports = router;