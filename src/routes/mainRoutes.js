// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const router = express.Router();

const groomingRoutes = require('./groomingRoutes');
const messageRoutes = require('./messageRoutes');
const petrestRoutes = require('./petrestRoutes');
const petbondingRoutes = require('./petbondingRoutes');
const petRoutes = require('./petRoutes');
const taskprogressRoutes = require('./taskprogressRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

const userController = require('../controllers/userController');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.use("/grooming", groomingRoutes);
router.use("/message", messageRoutes);
router.use("/petrest", petrestRoutes);
router.use("/petbonding", petbondingRoutes);
router.use("/pet", petRoutes);
router.use("/taskprogress", taskprogressRoutes);
router.use("/task", taskRoutes);
router.use("/user", userRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.existusername, userController.existemail, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

// router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
// router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
// router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
// router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

module.exports = router;
