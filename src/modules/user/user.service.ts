/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.types';
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
    throw new Error('User does not exists');
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
    throw new Error('User does not exists');
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
    throw new Error('User does not exists');
  }
  const result = await User.deleteOne({ userId });

  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getASingleUserFromDB,
  deleteAUserFromDB,
  updateUserInDB,
};
