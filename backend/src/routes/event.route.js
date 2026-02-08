import { createEventAdmin , eventsFetchAdmin , eventMenu ,registerEvent} from "../controllers/event.controller.js";
import { Router } from "express";
import { checkUser } from "../middleware/authMiddleware.js";

const eventRouter = Router();

eventRouter.route("/create").post(checkUser,createEventAdmin);
eventRouter.route("/fetch").get(checkUser, eventsFetchAdmin);
eventRouter.route("/menu").post(eventMenu);
eventRouter.route("/register").post(checkUser,registerEvent);


export default eventRouter;