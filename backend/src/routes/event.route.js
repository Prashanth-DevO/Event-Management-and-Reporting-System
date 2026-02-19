import { createEventAdmin , eventsFetchAdmin , eventMenu ,registerEvent , deleteEvent , eventMenuDetails , eventsSearch} from "../controllers/event.controller.js";
import { Router } from "express";
import { checkUser } from "../middleware/authMiddleware.js";

const eventRouter = Router();

eventRouter.route("/create").post(checkUser,createEventAdmin);
eventRouter.route("/delete").delete(checkUser,deleteEvent);
eventRouter.route("/fetch").get(checkUser, eventsFetchAdmin);
eventRouter.route("/menu").post(eventMenu);
eventRouter.route("/menu/details").get(eventMenuDetails);
eventRouter.route("/search").post(eventsSearch);
eventRouter.route("/register").post(checkUser,registerEvent);


export default eventRouter;