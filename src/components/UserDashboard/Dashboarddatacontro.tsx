import express, { Request, Response } from "express";
import { User } from "../modals/User";
import jwt from "jsonwebtoken";

const GetUserInfo = async (request: Request, response: Response) => {
  const token = request.body.token;
  try {
    const decodedToken: any = jwt.verify(token, "your-secret-key");
    const mobile = decodedToken.mobile;
    const user = await User.findOne({ "personal.mobile": mobile });

    if (user) {
      return response.json({ success: true, user: user });
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

const GetAllUser = async (request: Request, response: Response) => {
  try {
    const Userlist = await User.find({});
    return response.status(200).json({ success: true, Userlist: Userlist });
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
  // const token = request.body.token;
};

export const Dashboarddata = {
  GetUserInfo,
  GetAllUser,
};
