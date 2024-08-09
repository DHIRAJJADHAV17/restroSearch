import express from "express";
import MyAdminController from "../controllers/MyAdminController";

const router = express.Router();

router.post("/login", MyAdminController.getAdmin);
router.post("/signup", MyAdminController.createAdmin);

export default router;
