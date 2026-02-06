import { createEvent , eventsFetch , allEventsFetch , searchClub ,searchVenue , sortOld , sortNew , searchEvent} from "../controllers/event.controller.js";
import { Router } from "express";

const eventRouter = Router();

eventRouter.route("/create").post(createEvent);
eventRouter.route("/fetch").get(eventsFetch);
eventRouter.route("/menu").get(allEventsFetch);
eventRouter.route("/club").get(searchClub);
eventRouter.route("/venue").get(searchVenue);
eventRouter.route("/old").get(sortOld);
eventRouter.route("/new").get(sortNew);
eventRouter.route("/search").get(searchEvent);


export default eventRouter;