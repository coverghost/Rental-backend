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
    const user_transaction = await Order.find({
      userId: userid
    })
    if (user) {
      return response.json({ success: true, user: user, useracount:useracount ,userTransaction:user_transaction });
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
  const reciverUpi = data.value.upi
  const reciverAmount = data.value.amount
  const Orderid = `BOA${Math.floor(Math.random() * 100000000000)}`;
  const myacount =   await Useraccount.find({userId:userid});
  const user = await Useraccount.find({ upi:reciverUpi.trim() });
  
  if(user.length<1){
    return response.status(401).json({
      success: false,
      message: "invalid Upi Id",
    });
  }
  const reciveruser = await User.find({userId:user[0].userId})

  if(myacount[0].totalamount<reciverAmount){
    return response.status(401).json({
      success: false,
      message: "insuficiant balance",
    });

  }
  try {
    await Order.create({
      userId: userid,
      orderId: Orderid,
      amount: reciverAmount,
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
      { $set: { totalamount: (myacount[0].totalamount - Number(reciverAmount)) } }
    );
    await Useraccount.updateOne(
      { upi: reciverUpi },
      { $set: { totalamount: (user[0].totalamount + Number(reciverAmount)) } }
    );

    return response
      .status(200)
      .json({ success: true, message: "Money Send Succefully" });
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Technical error",
    });
  }
};

const addbeneficary =async (request: Request, response: Response) => {
  const data = request.body
  const decodedToken: any = jwt.verify(data.token, "your-secret-key");
  const userid = decodedToken.userId;
  console.log("data from addbeneficary---->>> ",data.value)
  const userIdtoadd:any = data?.value
  const myuserdata = await User.findOne({userId:userid})
  console.log( "myuserdata -- Before--->>>",myuserdata)
  if (myuserdata && myuserdata.beneficiary) {
    const aaryB=myuserdata.beneficiary
    await User.updateOne(
      {userId:userid},
      { $push: { beneficiary: data.value } }
    )
  }
  const myuserdataa = await User.findOne({userId:userid})
  console.log( "myuserdata --After--->>>",myuserdataa)


}

export const Dashboarddata = {
  GetUserInfo,
  GetAllUser,
  TransferByUpi,
  addbeneficary
};
