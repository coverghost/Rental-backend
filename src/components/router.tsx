import { Router } from "express";
import { Login, Register } from "./Auth.tsx/AuthCotroller";

const router = Router();

router.post('/login',Login)
router.post('/user-register',Register)

export default router;
