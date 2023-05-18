import { Schema , model} from "mongoose";




interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    mobile?: string;
    photo?: string;
    userId: string;
    dob: string;
    isAddressCompleted: boolean;
    isKycDone: boolean;
    isPanUploaded: boolean;
    isEmailVerified?: boolean;
    isMobileVerified?: boolean;
    isBasicDetailsCompleted: boolean;
    isBankDetailsCompleted?: boolean;
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
    createdAt: number;
    updatedAt: number;
  }
  
  const userSchema = new Schema<IUser>({
    name: { type: String, default: 'user' },
    email: { type: String, default: '' },
    mobile: { type: String, default: '' },
    photo: { type: String, default: '' },
    userId: { type: String, required: true },
    dob: { type: String, required: true },
    isAddressCompleted: { type: Boolean, default: false },
    isBasicDetailsCompleted: { type: Boolean, default: false },
    isKycDone: { type: Boolean, default: false },
    isPanUploaded: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isBankDetailsCompleted: { type: Boolean, default: false },
    address: {
      line1: { type: String, required: true, default: '' },
      line2: { type: String, required: true, default: '' },
      pincode: { type: Number, required: true, default: null },
      state: { type: String, required: true, default: '' },
      city: { type: String, required: true, default: '' },
    },
    kyc: {
      panNumber: { type: String, required: true, default: '' },
      aadhaarNumber: { type: String, required: false, default: '' },
    },
    bankDetails: {
      bankName: { type: String, required: false, default: '' },
      accountName: { type: String, required: false, default: '' },
      ifsc: { type: String, required: false, default: '' },
      accountNumber: { type: String, required: false, default: '' },
      upiId: { type: String, required: false, default: '' },
    },
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() },
  });
  
  export const User = model<IUser>('User', userSchema);

  export const RegisterUser = async (key: string, value: string, emailVerified: boolean, mobileVerified: boolean) => {
    const userId = `USER${Math.floor(Math.random() * 1000000000)}`;
    return User.create({
      [key]: value,
      userId: userId,
      dob: ' ',
      isAddressCompleted: false,
      isKycDone: false,
      isPanUploaded: false,
      isEmailVerified: emailVerified,
      isMobileVerified: mobileVerified,
      isBankDetailsCompleted: false,
      isBasicDetailsCompleted: false,
      address: {
        line1: ' ',
        line2: ' ',
        pincode: ' ',
        state: ' ',
        city: ' ',
      },
      kyc: {
        panNumber: ' ',
        aadhaarNumber: ' ',
      },
      bankDetails: {
        bankName: ' ',
        accountName: ' ',
        ifsc: ' ',
        accountNumber: ' ',
        upiId: ' ',
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
      dob: ' ',
      isAddressCompleted: false,
      isKycDone: false,
      isPanUploaded: false,
      isEmailVerified: false,
      isMobileVerified: true,
      isBankDetailsCompleted: false,
      isBasicDetailsCompleted: false,
      address: {
        line1: ' ',
        line2: ' ',
        pincode: ' ',
        state: ' ',
        city: ' ',
      },
      kyc: {
        panNumber: ' ',
        aadhaarNumber: ' ',
      },
      bankDetails: {
        bankName: ' ',
        accountName: ' ',
        ifsc: ' ',
        accountNumber: ' ',
      },
    });
  };
  