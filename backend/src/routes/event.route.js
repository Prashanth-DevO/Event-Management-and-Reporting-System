import { createEvent , eventsFetch , allEventsFetch} from "../controllers/event.controller.js";
import { Router } from "express";

const eventRouter = Router();

eventRouter.route("/create").post(createEvent);
eventRouter.route("/fetch").get(eventsFetch);
eventRouter.route("/menu").get(allEventsFetch);


export default eventRouter;