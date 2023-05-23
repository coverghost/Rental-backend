import { Schema, model } from "mongoose";

export interface IOrder {
  _id?: string;
  userId: string;
  orderId: string;
  amount: number;
  self: boolean;
  transfrom: {
    upi: boolean;
    bank: boolean;
    loan: boolean;
  };
  user?: {
    userUpi: string;
    userBank: string;
    userName: string;
  };
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  self:{type:Boolean, required:false, default:false},
  transfrom:{
    upi:{type:Boolean, required:false, default:false},
    bank:{type:Boolean, required:false, default:false},
    loan:{type:Boolean, required:false, default:false},
  },
  user:{
    userUpi: { type: String, required: true, default:"" },
    userBank: { type: String, required: true, default:"" },
    userName:{type:String, required:false, default:""},
  },
  createdAt: { type: Date, default: Date.now() }
});
export const Order = model<IOrder>("Orders", OrderSchema);

