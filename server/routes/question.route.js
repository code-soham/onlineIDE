import express from "express";
import { authValidate, isAdmin } from "../middlewares/auth.middleware.js";
import questionController from "../controllers/question.controller.js";
const router = express.Router();

router.get("/", questionController.getQuestions);
router.get("/:id", questionController.getQuestion);
router.post("/", isAdmin, questionController.createQuestion);
router.put("/:id", isAdmin, questionController.updateQuestion);
router.delete("/:id", isAdmin, questionController.deleteQuestion);
router.post("/:id", isAdmin, questionController.addTestCase);
router.put("/:id/:testCaseId", isAdmin, questionController.updateTestCase);
router.delete("/:id/:testCaseId", isAdmin, questionController.deleteTestCase);
export default router;
