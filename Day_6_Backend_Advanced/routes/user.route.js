import { Router } from "express";
import fetchOneUserController from "../controllers/user/fetchOne.controller.js";
import deleteUserController from "../controllers/user/delete.controller.js";
import editUserController from "../controllers/user/edit.controller.js";

const router = Router();

router.get("/:id", fetchOneUserController)
router.delete("/:id", deleteUserController)
router.put("/:id", editUserController)

export default router