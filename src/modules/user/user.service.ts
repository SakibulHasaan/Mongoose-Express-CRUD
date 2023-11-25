/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOrder, TUser } from './user.types';
import { User } from './user.model';
import { UpdateQuery } from 'mongoose';

const createUserInDB = async (user: TUser) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(user.userId);
  if (isUserExists) {
    throw new Error('User already exists');
  }
  const response = await User.create(user);
  const { password, ...result } = response.toObject();

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getASingleUserFromDB = async (userId: number) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User not found!');
  }

  const result = await User.findOne({ userId });

  return result;
};

const updateUserInDB = async (
  userId: number,
  updatedData: UpdateQuery<TUser> | undefined,
) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User not found');
  }

  const result = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });

  return result;
};

const deleteAUserFromDB = async (userId: number) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId });

  return result;
};

// User Order Related Services

const updateUserOrderInDB = async (userId: number, order: TOrder) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);
  if (!isUserExists) {
    throw new Error('User not found');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
    { new: true },
  );

  const { orders, ...result } = response.toObject();

  return orders;
};

const getOrderDataForUser = async (userId: number) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User not found');
  }

  const response = await User.findOne({ userId });

  const { orders, ...result } = (response as any).toObject();

  return orders;
};

const getTotalPriceForUserFromDB = async (userId: number) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User not found');
  }

  const response = await User.findOne({ userId });

  const { orders, ...result } = (response as any).toObject();

  let totalPrice = 0;

  orders.forEach((order: TOrder) => {
    totalPrice += order.price * order.quantity;
  });

  return { totalPrice };
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getASingleUserFromDB,
  deleteAUserFromDB,
  updateUserInDB,
  updateUserOrderInDB,
  getOrderDataForUser,
  getTotalPriceForUserFromDB,
};
