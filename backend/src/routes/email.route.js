import { Router } from "express";
import { sendEmailServices } from "../controllers/email.controller.js";

const emailRouter = Router();

emailRouter.route("/sendEmail").post(sendEmailServices);

export default emailRouter;