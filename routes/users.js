const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.get("/login", userController.getUserLogin);
router.get("/register", userController.getUserRegister);

router.post("/login", userController.postUserLogin);
router.post("/register", userController.postUserRegister);

module.exports = router;