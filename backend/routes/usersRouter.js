// routes/users.js

import express from 'express';
import User from '../models/User.js';
import { getUser, register, userDelete} from '../controllers/userController.js';
import { upload } from '../utils/multer.js'

const router = express.Router();


router.get('/', getUser);


router.post('/', upload.single("image"), register);


router.delete('/:id', userDelete);

export default router;
