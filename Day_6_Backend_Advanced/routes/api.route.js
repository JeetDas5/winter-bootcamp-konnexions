import { Router } from "express"
import authRoutes from "./auth.route.js"
import userRoutes from "./user.route.js"
import authMiddleware from "../middleware/auth.middleware.js"
import errorHandlerMiddleware from "../middleware/error.middleware.js"

const router = Router();

router.use("/api/auth", authRoutes)

router.use(authMiddleware)
router.use("/api/user", userRoutes)
router.use(errorHandlerMiddleware)

export default router