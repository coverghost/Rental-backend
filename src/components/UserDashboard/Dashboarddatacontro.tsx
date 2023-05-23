import express, { Request, Response } from "express";
import { User } from "../modals/User";
import jwt from "jsonwebtoken";
import { Useraccount } from "../modals/Useraccount";
import { Order } from "../modals/Order";

const GetUserInfo = async (request: Request, response: Response) => {
  const token = request.body.token;
  try {
    const decodedToken: any = jwt.verify(token, "your-secret-key");
    const userid = decodedToken.userId;
    const mobile = decodedToken.mobile;
    const user = await User.findOne({ "personal.mobile": mobile });
    const useracount  = await Useraccount.find(
      { userId: userid } 
    );

    if (user) {
      return response.json({ success: true, user: user, useracount:useracount });
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

const TransferByUpi = async (request: Request, response: Response) => {
  const data = request.body;
  const decodedToken: any = jwt.verify(data.token, "your-secret-key");
  const userid = decodedToken.userId;
  const recverupi = data.value.upi;
  const amount = data.value.amount;
  const Orderid = `BOA${Math.floor(Math.random() * 100000000000)}`;

  // console.log("line 43 transfer money----->>",{userid,upi,amount})
  const myacount =   await Useraccount.find({userId:userid});
  const user = await Useraccount.find({ upi: recverupi });
  const reciveruser = await User.find({userId:user[0].userId})
  const usera = await Useraccount.find(
    { upi: recverupi } 
  );
  console.log("user ---- line 51+++>>", myacount[0].totalamount);

  if(myacount[0].totalamount<amount){
    return response.status(401).json({
      success: false,
      message: "insuficiant balance",
    });

  }



  try {
    await Order.create({
      userId: userid,
      orderId: Orderid,
      amount: amount,
      self: false,
      transfrom: {
        upi: true,
        bank: false,
        loan: false,
      },
      user: {
        userUpi: user[0].upi,
        userBank: user[0].bank,
        userName: reciveruser[0].personal?.name,
      },
    });
    await Useraccount.updateOne(
      { userId:userid },
      { $set: { totalamount: (myacount[0].totalamount - Number(amount)) } }
    );
    await Useraccount.updateOne(
      { upi: recverupi },
      { $set: { totalamount: (user[0].totalamount + Number(amount)) } }
    );

    return response
      .status(200)
      .json({ success: true, message: "Money Send Succefully" });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Technical error",
    });
  }
};

export const Dashboarddata = {
  GetUserInfo,
  GetAllUser,
  TransferByUpi,
};
