import express from "express"
import { userRegister, login, profile } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/users', userRegister);
router.post('/users/login', login )
router.get('/users/profile',authMiddleware, profile)

export default router;