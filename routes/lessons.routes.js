const express = require('express');
const router = express.Router();

const authorizeUser = require("../middlewares/authorize.middleware");
const validateUser = require("../middlewares/validateUser.middleware");

const { createLesson, getLessonForModule } = require("../controllers/lessons.controller");

router.post("/", authorizeUser, validateUser, createLesson);
router.get("/lesson/:id", authorizeUser, validateUser, getLessonForModule);

module.exports = router;