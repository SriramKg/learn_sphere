const moduleModel = require("../database/Models/modules.model");

async function createModuleFromModel(req) {
    try {
        //console.log();
        const {course_id, title, order} = req.body;
        if (!course_id || !title || !order) {
            return {
                message: "Please provide all required fields",
                status: 400,
            };
        }
        const newModule = new moduleModel({
            course_id,
            title,
            order,
        });
        await newModule.save();
        return {
            message: "Module created successfully " + newModule._id,
            status: 201,
        };
    } catch (error) {
        throw new Error("Module did not create ! " + error);
    }
}

module.exports = { createModuleFromModel };