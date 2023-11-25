/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userDataFromRequest = req.body;

    // Data validation using Zod
    const validatedData = UserValidationSchema.parse(userDataFromRequest);

    // Create user in DB query
    const result = await UserServices.createUserInDB(validatedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    res.status(200).json({
      success: false,
      message: error.message || 'There was an Error in creating user',
      error: error,
    });
  }
};

const getASingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.getASingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        message: 'User not found',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: 'There was an Error in getting users',
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const userDataFromRequest = req.body;

    const result = await UserServices.updateUserInDB(
      userId,
      userDataFromRequest,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: 'There was an Error in updating user data',
      error: error,
    });
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await UserServices.deleteAUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: 'There was an Error in deleting user',
      error: error,
    });
  }
};

export const userControllers = {
  createUser,
  getASingleUser,
  getAllUsers,
  updateUser,
  deleteAUser,
};
