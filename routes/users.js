const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.get("/login", userController.getUserLogin);
router.get("/register", userController.getUserRegister);
router.get("/logout", userController.getUserLogout);
router.get("/profile", userController.getProfile);


router.post("/login", userController.postUserLogin);
router.post("/register", userController.postUserRegister);

module.exports = router;