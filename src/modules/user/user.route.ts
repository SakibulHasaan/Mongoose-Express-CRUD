import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// User Routes

router.post('/', userControllers.createUser);

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userControllers.getASingleUser);

router.put('/:userId', userControllers.updateUser);

router.delete('/:userId', userControllers.deleteAUser);

export const UserRoutes = router;
