import { TUser } from './user.types';
import { User } from './user.model';
import { UserValidationSchema } from './user.validation';

const createUserInDB = async (user: TUser) => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(user.userId);
  if (isUserExists) {
    throw new Error('User already exists');
  }
  const response = await User.create(user);
  const result = response.toObject();
  delete result.password;

  if (result.orders?.length < 1) {
    delete result.orders;
  }

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getASingleUserFromDB = async userId => {
  // Check if User Exits
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User does not exists');
  }

  const result = await User.findOne({ userId });

  return result;
};

const updateUserInDB = async (userId, updatedData) => {
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

const deleteAUserFromDB = async userId => {
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
