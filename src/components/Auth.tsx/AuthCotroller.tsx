import express, { Request, Response } from "express";
import { RegisterUser, User, registerUserViaMobile } from "../modals/User";
import { Order } from "../modals/Order";

export const getAllUsers = async () => {
  const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
  await User.create({
    name: "arya",
    mobile: "7703990600",
    email: null,
    userId: userId,
    dob: " ",
    isAddressCompleted: false,
    isKycDone: false,
    isPanUploaded: false,
    isEmailVerified: false,
    isMobileVerified: true,
    isBankDetailsCompleted: false,
    isBasicDetailsCompleted: false,
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
};

export const deletuser =async () => {
    await User.deleteMany()
}

export const createorder =async () => {
    await Order.create(
        {
            journeyId: "string",
            orderId: "string",
            name:"string"
        }
        )
}

