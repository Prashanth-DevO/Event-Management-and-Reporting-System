import { createEvent , eventsFetch } from "../controllers/event.controller.js";
import { Router } from "express";

const eventRouter = Router();

eventRouter.route("/create").post(createEvent);
eventRouter.route("/fetch").get(eventsFetch);


export default eventRouter;