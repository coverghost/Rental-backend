import { Schema ,model } from "mongoose";


export interface IOrder {
    _id?: string;
    journeyId: string;
    orderId: string;
    name:string;
   
  }
  
  const OrderSchema = new Schema<IOrder>({
    orderId: { type: String, required: false },
    journeyId: { type: String, required: false },
    name: { type: String, required: false },

    
  });
  export const Order = model<IOrder>('Orders', OrderSchema);