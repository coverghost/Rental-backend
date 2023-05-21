import express, { Request, Response } from "express";
import { User } from "../modals/User";
import jwt from "jsonwebtoken";





export const GetUserInfo = async (request: Request, response: Response) => {
    console.log("from backens userinfo--->>>>>>>>", request.body);
    const token = request.body.token;
    // const token = request.headers.authorization?.split(" ")[1] as string; // Add type assertion to specify token as string
    console.log("token---------------- line 81 ------->>>", token);
    try {
      const decodedToken: any = jwt.verify(token, "your-secret-key");
      const mobile = decodedToken.mobile;
      const userId = decodedToken.userId
      
      // Query the MongoDB database using the mobile number to retrieve user information
      const user = await User.findOne({ "personal.mobile": mobile });
  
      if (user) {
        // Include the user information in the response
        return response.json({ success: true, userId: userId });
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