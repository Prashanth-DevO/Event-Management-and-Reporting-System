import { Router } from "express";
import { registerUser , loginUser , logoutUser} from "../controllers/login.controller.js";
import { checkUser } from "../middleware/authMiddleware.js";

const loginRouter = Router();

loginRouter.route("/register").post(registerUser);
loginRouter.route("/login").post(loginUser);
loginRouter.route("/logout").post(checkUser , logoutUser);

export default loginRouter;