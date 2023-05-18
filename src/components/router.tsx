import { Router } from "express";
import { Login } from "./Auth.tsx/AuthCotroller";

const router = Router();

router.post('/login',Login)


export default router;
