import express from "express";
const router = express.Router();
import signUpSchema from "../validators/signupValidator.js";
import loginSchema from "../validators/loginValidator.js";
import userController from "../controllers/userController.js";
import userMiddleware from "../middlewares/user-middleware.js";

router.route("/signup").post(userMiddleware.validate(signUpSchema),userController.registerUser);
router.route("/login").post(userMiddleware.validate(loginSchema), userController.login);
router.route("/credits").get(userMiddleware.userAuth, userController.userCredits);

export default router;