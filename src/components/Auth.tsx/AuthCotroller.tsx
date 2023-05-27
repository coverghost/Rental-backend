import express, { Request, Response } from "express";
import { User } from "../modals/User";
import { Order } from "../modals/Order";
import jwt from "jsonwebtoken";
import { Useraccount } from "../modals/Useraccount";

export const deletuser = async () => {
  await User.deleteMany();
};
export const deletorder = async () => {
  await Order.deleteMany();
};
export const deletbankacount = async () => {
  await Useraccount.deleteMany();
};
export const Login = async (request: Request, response: Response) => {
  const value = request.body;

  const isuser = await User.find({ "personal.mobile": value.mobile });
  console.log("isuser line number 57 ----->>>", isuser[0].userId);
  if (isuser.length > 0) {
    const paswword = isuser[0].personal?.password;

    if (paswword === value.password) {
      const token = jwt.sign(
        { mobile: value.mobile, userId: isuser[0].userId },
        "your-secret-key"
      );

      return response.json({ success: true, token: token });
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }
  } else {
    return response.status(401).json({
      success: false,
      message: "User Not found please register.",
    });
  }
};

export const Register = async (request: Request, response: Response) => {
  const value = request.body;
  console.log("value----------->>>>>>>>>> 84 ===>>", value);
  const isuser = await User.find({ "personal.mobile": value.S_mobile });
  if (isuser.length > 0) {
    return response
      .status(401)
      .json({ success: false, message: "Mobile Number Already exist" });
  }
  const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
  const banknumber = `${Math.floor(Math.random() * 100000000000)}`;
  const bankname = "Kotak Bank";
  const ifsc = "SBIN00003";
  await User.create({
    userId: userId,
    personal: {
      name: value.name,
      mobile: value.S_mobile,
      password: value.S_password,
      dob: "",
    },
    address: {
      line1: "",
      line2: "",
      pincode: "",
      state: "",
      city: "",
    },
    kyc: {
      panNumber: "",
      aadhaarNumber: "",
    },
    bankDetails: {
      bankName: bankname,
      accountName: value.name,
      ifsc: ifsc,
      accountNumber: banknumber,
      upiId: `${value.S_mobile}@ybl`,
    },
    beneficiary:[]
  });
  await Useraccount.create({
    userId: userId,
    totalamount: 0,
    totaldebt: 0,
    upi: `${value.S_mobile}@ybl`,
    bank: banknumber,
  });
  return response
    .status(200)
    .json({ success: true, message: "User Created Succefully" });
};

export const CreateCard = async (request: Request, response: Response) => {
  const value = request.body;
};
