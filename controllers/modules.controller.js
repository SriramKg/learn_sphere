const { createModuleFromModel, getModuleForCourseFromModel } = require("../services/modules.service");

async function createModule(req, res) {
    try {
        const { message, status, module } = await createModuleFromModel(req);
        res.status(status).send({
            message,
            module
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          }); 
    }
    
}


async function getModuleForCourse(req, res) {
    try {
        const { message, status } = await getModuleForCourseFromModel(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          }); 
    }
    
}

module.exports = { createModule, getModuleForCourse };