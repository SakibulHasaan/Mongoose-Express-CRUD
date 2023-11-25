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

export const userControllers = {
  createUser,
  getASingleUser,
};