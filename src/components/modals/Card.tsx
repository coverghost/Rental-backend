import { Schema ,model } from "mongoose";


export interface ICard {
    _id?: string;
    userId: string;
    number:string;
    expiry:string;
    name:string;
    cvv:string;
    createdAt: Date;
   
  }
  
  const DebitcardSchema = new Schema<ICard >({
    userId: { type: String, required: true },
    number: { type: String, required: false, default:""},
    expiry: { type: String, required: false, default:""},
    name: { type: String, required: false, default:""},
    cvv: { type: String, required: false, default:""},
    createdAt: { type: Date, default: Date.now() },


    
  });
  export const Debitcard = model<ICard >('Debitcard', DebitcardSchema);