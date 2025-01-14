const { createLessonFromModel, getLessonForModuleFromModel } = require('../services/lessons.service');

async function createLesson(req, res) {
    try {
        const { message, status } = await createLessonFromModel(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          }); 
    }
    
}

async function getLessonForModule(req, res) {   
    try {
        const { message, status } = await getLessonForModuleFromModel(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          }); 
    }
    
}

module.exports = { createLesson, getLessonForModule };