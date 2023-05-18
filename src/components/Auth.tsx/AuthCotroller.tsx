import express, { Request, Response } from "express";
import { RegisterUser, User, registerUserViaMobile } from "../modals/User";
import { Order } from "../modals/Order";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {
  // const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
  // await User.create({
  //   personal: { name: "arya", mobile: "7703990600", email: null, dob: " " },

  //   userId: userId,

  //   isAddressCompleted: false,
  //   isKycDone: false,
  //   isPanUploaded: false,
  //   isEmailVerified: false,
  //   isMobileVerified: true,
  //   isBankDetailsCompleted: false,
  //   isBasicDetailsCompleted: false,
  //   address: {
  //     line1: " ",
  //     line2: " ",
  //     pincode: " ",
  //     state: " ",
  //     city: " ",
  //   },
  //   kyc: {
  //     panNumber: " ",
  //     aadhaarNumber: " ",
  //   },
  //   bankDetails: {
  //     bankName: " ",
  //     accountName: " ",
  //     ifsc: " ",
  //     accountNumber: " ",
  //   },
  // });
  return await User.find();
};

export const deletuser = async () => {
  await User.deleteMany();
};

export const createorder = async () => {
  await Order.create({
    journeyId: "string",
    orderId: "string",
    name: "string",
  });
};

export const Login = async (request: Request, response: Response) => {
  const value = request.body;
  console.log("data from frontend +++>>>", value.mobile,value.password);

  if (value.mobile === "7703990600" && value.password === "arya@123") {
    const token = jwt.sign({ mobile: value.mobile }, "your-secret-key");

    // Include the token in the response
    return response.json({ success: true, token: token });
  }

  return response
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
};
