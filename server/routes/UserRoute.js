import express from "express"
import { addUser, Claim_points, getAllUser, getUserbyid } from "../controllers/UserController.js";
import multer from "multer";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/").post(singleUpload,addUser);
router.route("/").get(getAllUser);
router.route("/:id").get(getUserbyid);
router.route("/claim/:id").post(Claim_points);

export default router;