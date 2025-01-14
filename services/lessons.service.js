const lessonModel = require('../database/Models/lessons.model');

async function createLessonFromModel(req) {
    try {
        const {module_id, title, content_type, content_url} = req.body;
        if (!module_id || !title || !content_type || !content_url) {
            return {
                message: "Please provide all required fields",
                status: 400,
            };
        }
        const newLesson = new lessonModel({
            module_id,
            title,
            content_type,
            content_url
        });
        await newLesson.save();
        return {
            message: "Lesson created successfully " + newLesson._id,
            status: 201,
        };
    } catch (error) {
        throw new Error("Lesson did not create ! " + error);
    }
}

async function getLessonForModuleFromModel(req) {
    try {
        const { id } = req.params;
        const lessons = await lessonModel.find({ module_id: id });
        return {
            message: lessons,
            status: 200,
        };
    } catch (error) {
        throw new Error("Lesson not found ! " + error);
    }
}

module.exports = { createLessonFromModel, getLessonForModuleFromModel};
