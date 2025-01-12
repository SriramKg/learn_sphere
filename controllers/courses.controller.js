const {getAllCourseFromModel, getCourseByIdFromModel, createCourseFromModel, updateCourseFromModel, deleteCourseFromModel, getCourseByCourseId} = require("../services/courses.service");

async function getAllCourses(req, res) {
  try {
    const { message, status } = await getAllCourseFromModel(req);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

async function getCourseById(req, res) {
  try {
    const { message, status } = await getCourseByIdFromModel(req);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

async function getCourseByCourse(req, res) {
  try {
    const { message, status } = await getCourseByCourseId(req);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

async function createCourse(req, res) {
  try {
    const { message, status } = await createCourseFromModel(req);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

async function updateCourse(req, res) {
  try {
    const { message, status } = await updateCourseFromModel(req);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

async function deleteCourse(req, res) {
  try {
    const { message, status } = await deleteCourseFromModel(req);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getCourseByCourse };
