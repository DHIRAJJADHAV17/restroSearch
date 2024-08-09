import express from "express";
import MyRestroController from "../controllers/MyRestroController";
import AccessToken from "../middleware/AccessToken";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
router.post(
  "/manage",
  upload.single("imageFile"),
  AccessToken,
  MyRestroController.createMyRestro
);
router.get(
  "/manage",
  upload.single("imageFile"),
  AccessToken,
  MyRestroController.getMyRestaurant
);
router.put(
  "/manage",
  upload.single("imageFile"),
  AccessToken,
  MyRestroController.updateMyRestaurant
);

export default router;
