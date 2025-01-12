const express = require('express');
const router = express.Router();

const authorizeUser = require("../middlewares/authorize.middleware");
const validateUser = require("../middlewares/validateUser.middleware");
const { createModule } = require("../controllers/modules.controller");


router.post("/", authorizeUser, validateUser, createModule);

module.exports = router;