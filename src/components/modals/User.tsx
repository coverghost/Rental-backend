import { Schema, model } from "mongoose";

interface IUser {
  _id?: string;
  userId: string;
  personal?: {
    name?: string;
    email?: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true },
  personal: {
    name: { type: String, default: "user" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    photo: { type: String, default: "" },
    dob: { type: String, required: true },
  },
  address: {
    line1: { type: String, required: true, default: "" },
    line2: { type: String, required: true, default: "" },
    pincode: { type: Number, required: true, default: null },
    state: { type: String, required: true, default: "" },
    city: { type: String, required: true, default: "" },
  },
  kyc: {
    panNumber: { type: String, required: true, default: "" },
    aadhaarNumber: { type: String, required: false, default: "" },
  },
  bankDetails: {
    bankName: { type: String, required: false, default: "" },
    accountName: { type: String, required: false, default: "" },
    ifsc: { type: String, required: false, default: "" },
    accountNumber: { type: String, required: false, default: "" },
    upiId: { type: String, required: false, default: "" },
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const User = model<IUser>("User", userSchema);

export const RegisterUser = async (
  key: string,
  value: string,
  emailVerified: boolean,
  mobileVerified: boolean
) => {
  const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
  return User.create({
    [key]: value,
    userId: userId,
    dob: " ",
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
      upiId: " ",
    },
  });
};

type RegisterUserViaMobile = {
  name: string;
  mobile: string;
};
export const registerUserViaMobile = async (data: RegisterUserViaMobile) => {
  const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
  return User.create({
    name: data.name,
    mobile: data.mobile,
    email: null,
    userId: userId,
    dob: " ",
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
