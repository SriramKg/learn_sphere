const courseModel = require("../database/Models/courses.model");

async function getAllCourseFromModel() {
  try {
    const courses = await courseModel.find();
    return {
      message: courses,
      status: 200,
    };
  } catch (error) {
    throw new Error("Courses not found " + error);
  }
}

async function getCourseByIdFromModel(req) {
    try {
        const { id } = req.params;
        const course = await courseModel.findById(id);
        return {
        message: course,
        status: 200,
        };
    } catch (error) {
        throw new Error("Course not found " + error);
    }
}

async function createCourseFromModel(body) {
    try {
        const { title, description, price, status, instructor_id } = body;
        if (!title || !description || !price || !status || !instructor_id) {
        return {
            message: "Please provide all required fields",
            status: 400,
        };
        }
        const newCourse = new courseModel({
        title,
        description,
        price,
        status,
        instructor_id,
        });
        await newCourse.save();
        return {
        message: "Course created successfully " + newCourse._id,
        status: 201,
        };
    } catch (error) {
        throw new Error("Course did not create ! " + error);
    }
}

async function updateCourseFromModel(req) {
    try {
        console.log(req.body);
        const { id } = req.params;
        const {title, description, price, status, instructor_id } = req.body;
        const course = await courseModel.findById(id);
        if (!course) {
        return {
            message: "Course not found",
            status: 404,
        };
        }
        course.title = title;
        course.description = description;
        course.price = price;
        course.status = status;
        course.instructor_id = instructor_id;
        await course.save();
        return {
        message: "Course updated successfully " + course._id,
        status: 200,
        };
    } catch (error) {
        throw new Error("Course did not update ! " + error);
    }
}

async function deleteCourseFromModel(req) {
    try {
        const { id } = req.params;
        const course = await courseModel.findByIdAndDelete(id);
        if (!course) {
        return {
            message: "Course not found",
            status: 404,
        };
        }
        return {
        message: "Course deleted successfully " + course._id,
        status: 200,
        };
    } catch (error) {
        throw new Error("Course did not delete ! " + error);
    }
}

module.exports = {getAllCourseFromModel, getCourseByIdFromModel, createCourseFromModel, updateCourseFromModel, deleteCourseFromModel};