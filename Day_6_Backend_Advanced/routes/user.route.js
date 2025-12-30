import { Router } from "express";
import fetchOneController from "../controllers/user/fetchOne.controller.js";

const router = Router();

router.get("/:id", fetchOneController)

export default router