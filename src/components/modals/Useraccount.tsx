import { Schema ,model } from "mongoose";


export interface IUseraccount {
    _id?: string;
    userId: string;
    upi:string;
    bank:string;
    totalamount:number;
    totaldebt:number
    updatedAt: Date;
   
  }
  
  const UseraccountSchema = new Schema<IUseraccount >({
    userId: { type: String, required: true },
    upi: { type: String, required: true,default:"" },
    bank: { type: String, required: true,default:"" },
    totaldebt: { type: Number, required: false, default:0},
    totalamount: { type: Number, required: false, default:0},
    updatedAt: { type: Date, default: Date.now()},


    
  });
  export const Useraccount = model<IUseraccount >('Useraccount', UseraccountSchema);