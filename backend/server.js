import express from 'express';
import dotenv from 'dotenv';
import "./config.js";
import "./db-connect.js";
import userRouter from './routes/usersRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());

app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });


