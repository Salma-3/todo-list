import express from 'express'
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import { config as envConfig } from 'dotenv';
import connectDB from './db';

const app = express();
envConfig();

// config app 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// connect db
connectDB()


// init routes
app.get('/', (req, res) => {
    res.send('Welcome in To-do List!');
})
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// error handler
app.use(errorHandler);

// running the server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})