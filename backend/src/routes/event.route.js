import { createEventAdmin , eventsFetchAdmin , eventMenu} from "../controllers/event.controller.js";
import { Router } from "express";
import { checkUser } from "../middleware/authMiddleware.js";

const eventRouter = Router();

eventRouter.route("/create").post(createEventAdmin);
eventRouter.route("/fetch").get(eventsFetchAdmin);
eventRouter.route("/menu").post(eventMenu);



export default eventRouter;