/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  } catch (error: any) {
    console.error(error);

    res.status(200).json({
      success: false,
      message: error.message || 'There was an Error in creating user',
      error: {
        code: 404,
        description: error.message || 'There was an Error in creating user',
      },
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
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found!',
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
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message || 'There was an Error in getting users',
      error: {
        code: 404,
        description: error.message || 'There was an Error in getting users',
      },
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
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message || 'There was an Error in updating user data',
      error: {
        code: 404,
        description:
          error.message || 'There was an Error in updating user data',
      },
    });
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.deleteAUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message || 'There was an Error in deleting user',
      error: {
        code: 404,
        description: error.message || 'There was an Error in deleting user',
      },
    });
  }
};

// User Order related controllers

const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const order = req.body;
    const result = await UserServices.updateUserOrderInDB(userId, order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message || 'There was an Error in adding order',
      error: {
        code: 404,
        description: error.message || 'There was an Error in adding order',
      },
    });
  }
};

const getOrderForUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.getOrderDataForUser(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message || 'There was an Error in fetching order',
      error: {
        code: 404,
        description: error.message || 'There was an Error in fetching order',
      },
    });
  }
};

const getTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.getTotalPriceForUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message || 'There was an Error in fetching total price',
      error: {
        code: 404,
        description:
          error.message || 'There was an Error in fetching total price',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getASingleUser,
  getAllUsers,
  updateUser,
  deleteAUser,
  updateUserOrder,
  getOrderForUser,
  getTotalPriceForUser,
};
