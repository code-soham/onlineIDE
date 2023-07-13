import express from "express";
import sphereEngineController from "../controllers/sphere-engine.controller.js";
import { authValidate } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/:runID", authValidate, sphereEngineController.getVerdict);
router.post(
  "/:qid",
  authValidate,
  sphereEngineController.submit,
  sphereEngineController.verdictify
);
export default router;
