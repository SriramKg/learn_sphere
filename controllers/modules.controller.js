const { createModuleFromModel } = require("../services/modules.service");

async function createModule(req, res) {
    try {
        const { message, status } = await createModuleFromModel(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          }); 
    }
    
}

module.exports = { createModule };