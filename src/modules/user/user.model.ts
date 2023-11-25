import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.types';
import bcrypt from 'bcrypt';

// Mongoose User Schema
const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

userSchema.statics.isUserExists = async function (userId) {
  const user = await User.findOne({ userId });
  return user;
};

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
