const express = require("express");
const router = express.Router();
const {
    signinUser,
    signupUser,
} = require('../controllers/userController')


//TO signup SINGLE WORKOUT
router.post("/signin", signinUser);
router.post("/signup", signupUser);

//post a new workout

module.exports = router;
