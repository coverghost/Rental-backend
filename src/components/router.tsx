import { Router } from "express";
import { Login, Register } from "./Auth.tsx/AuthCotroller";
import { Dashboarddata } from "./UserDashboard/Dashboarddatacontro";

const router = Router();

router.post('/login',Login)
router.post('/user-register',Register)


router.post('/dashboard',Dashboarddata.GetUserInfo)

export default router;
