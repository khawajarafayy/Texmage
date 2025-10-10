import express from "express";
import userMiddleware from "../middlewares/user-middleware.js";
import generateImages from "../controllers/imageController.js";
const router = express.Router();

router.route("/generate-image").post(userMiddleware.userAuth, generateImages);

export default router;