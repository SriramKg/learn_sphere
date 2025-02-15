const express = require("express");
const router = express.Router();

const {getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getCourseByCourse} = require("../controllers/courses.controller");
const authorizeUser = require("../middlewares/authorize.middleware");
const validateUser = require("../middlewares/validateUser.middleware");

router.get("/", authorizeUser, getAllCourses);
router.get("/:id", authorizeUser, getCourseById);
router.get("/course/:id", authorizeUser, validateUser, getCourseByCourse);
router.post("/", authorizeUser, validateUser, createCourse);
router.put("/:id", authorizeUser, validateUser, updateCourse);
router.delete("/:id", authorizeUser, validateUser, deleteCourse);

module.exports = router;