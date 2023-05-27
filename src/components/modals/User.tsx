import { Schema, model } from "mongoose";

interface IUser {
  _id?: string;
  userId: string;
  personal?: {
    name?: string;
    password?: string;
    mobile?: string;
    photo?: string;
    dob: string;
  };
  address?: {
    line1: string;
    line2?: string;
    pincode: number;
    state: string;
    city: string;
  };
  kyc?: {
    panNumber: string;
    aadhaarNumber?: string;
  };
  bankDetails?: {
    bankName: string;
    accountName: string;
    ifsc: string;
    accountNumber: string;
    upiId?: string;
  };
  beneficiary:[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true },
  personal: {
    name: { type: String, default:"" },
    password: { type: String, default: "" },
    mobile: { type: String, default: "" },
    photo: { type: String, default: "" },
    dob: { type: String, required: false, default: ""},
  },
  address: {
    line1: { type: String, required: false, default: "" },
    line2: { type: String, required: false, default: "" },
    pincode: { type: Number, required: false, default: null },
    state: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
  },
  kyc: {
    panNumber: { type: String, required: false, default: "" },
    aadhaarNumber: { type: String, required: false, default: "" },
  },
  bankDetails: {
    bankName: { type: String, required: false, default: "" },
    accountName: { type: String, required: false, default: "" },
    ifsc: { type: String, required: false, default: "" },
    accountNumber: { type: String, required: false, default: "" },
    upiId: { type: String, required: false, default: "" },
  },
  beneficiary:[],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const User = model<IUser>("User", userSchema);
