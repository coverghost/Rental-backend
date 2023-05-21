import { Router } from "express";
import { Login, Register } from "./Auth.tsx/AuthCotroller";
import { Dashboarddata } from "./UserDashboard/Dashboarddatacontro";

const router = Router();

router.post('/login',Login)
router.post('/user-register',Register)


router.post('/dashboard',Dashboarddata.GetUserInfo)
router.get("/get-all-user",Dashboarddata.GetAllUser)

export default router;
