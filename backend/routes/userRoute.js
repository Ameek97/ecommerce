import express from "express";
import { login, signup, protect, restrictTo } from "../controller/authController.js";
import {getAllUsers} from "../controller/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route('/')
      .get(protect, restrictTo("admin"), getAllUsers);
       



export default router;
