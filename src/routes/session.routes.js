import { Router } from "express";
import { logOut, signIn, signUp } from "../controllers/session.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/session.schema.js";
import { validateAuth } from "../middlewares/validateAuth.js";


const sessionRouter = Router();

sessionRouter.post('/signup', validateSchema(signUpSchema), signUp);
sessionRouter.post('/signin', validateSchema(signInSchema), signIn);
sessionRouter.post('/logout', logOut);

export default sessionRouter;