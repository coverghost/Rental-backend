import express, { Request, Response } from "express";
import { User } from "../modals/User";
import jwt from "jsonwebtoken";





export const GetUserInfo = async (request: Request, response: Response) => {
    console.log("from backens userinfo--->>>>>>>>", request.body);
    const token = request.body.token;
    console.log("token---------------- line 81 ------->>>", token);
    try {
      const decodedToken: any = jwt.verify(token, "your-secret-key");
      const mobile = decodedToken.mobile;
      const user = await User.findOne({ "personal.mobile": mobile });
  
      if (user) {
        return response.json({ success: true, user:user });
        
      }
  
      return response.status(404).json({
        success: false,
        message: "User not found.",
      });
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
  };

export const Dashboarddata = {
    GetUserInfo,
}