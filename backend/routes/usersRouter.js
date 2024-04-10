// routes/users.js

import express from 'express';
import User from '../models/User.js';
import { getUser, register, userDelete} from '../controllers/userController.js';

const router = express.Router();


router.get('/', getUser);


router.post('/', register);


router.delete('/:id', userDelete);

export default router;
