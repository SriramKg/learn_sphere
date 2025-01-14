const express = require('express');
const router = express.Router();

const authorizeUser = require("../middlewares/authorize.middleware");
const validateUser = require("../middlewares/validateUser.middleware");
const { createModule, getModuleForCourse } = require("../controllers/modules.controller");


router.post("/", authorizeUser, validateUser, createModule);
router.get("/module/:id", authorizeUser, validateUser, getModuleForCourse);

module.exports = router;