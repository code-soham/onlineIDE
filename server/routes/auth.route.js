import express from 'express';
import authController from '../controllers/auth.controller.js';
import {authValidate, isAdmin} from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get("/authValidate",authValidate);
router.get("/isAdmin",isAdmin);
router.post("/signup",authController.signup);
router.post("/login",authController.login);
router.get("/logout",authController.logout);

export default router;