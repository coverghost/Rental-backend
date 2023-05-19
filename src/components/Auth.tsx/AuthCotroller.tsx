import express, { Request, Response } from "express";
import { User } from "../modals/User";
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
  console.log("data from frontend +++>>>", value.mobile, value.password);

  const isuser = await User.find({"personal.mobile":value.mobile})
  const paswword = isuser[0].personal?.password
  console.log("isuer----------->>",isuser,paswword)

  if (paswword===value.password) {
    const token = jwt.sign({ mobile: value.mobile }, "your-secret-key");

    // Include the token in the response
    return response.json({ success: true, token: token });
  }

  return response
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
};





export const Register = async (request: Request, response: Response) => {
  const value = request.body;
  console.log("signup value----->>>",value)
  const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
  await User.create({
    userId: userId,
    personal: { name: value.Name , mobile: value.S_mobile, password: value.S_password, dob: " " },
    address: {
      line1: " ",
      line2: " ",
      pincode: " ",
      state: " ",
      city: " ",
    },
    kyc: {
      panNumber: " ",
      aadhaarNumber: " ",
    },
    bankDetails: {
      bankName: " ",
      accountName: " ",
      ifsc: " ",
      accountNumber: " ",
    },
  });
  return response
    .status(200)
    .json({ success: true, message: "User Created Succefully" });
};
