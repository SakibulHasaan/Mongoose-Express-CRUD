import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// User Routes

router.post('/', userControllers.createUser);

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userControllers.getASingleUser);

router.put('/:userId', userControllers.updateUser);

router.delete('/:userId', userControllers.deleteAUser);

// Order Related Routes

router.put('/:userId/orders/', userControllers.updateUserOrder);

router.get('/:userId/orders/', userControllers.getOrderForUser);

router.get('/:userId/orders/total-price', userControllers.getTotalPriceForUser);

export const UserRoutes = router;
