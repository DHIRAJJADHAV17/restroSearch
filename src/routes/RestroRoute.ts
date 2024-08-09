import express from "express";
import AccessToken from "../middleware/AccessToken";
import { param } from "express-validator";
import RestroController from "../controllers/RestroController";

const router = express.Router();

router.get(
  "/discrip/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  RestroController.getRestaurant
);

router.get("/", RestroController.getAllRestaurant);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city parameter must be a valid string"),
  RestroController.searchRestaurant
);

export default router;
