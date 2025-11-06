import express from "express";
import RoleController from "../controllers/Role.controller.js";

const router = express.Router();
const roleController = new RoleController();

router.get("/role", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.post("/createRole", roleController.createRole);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

export default router;
