import { Router } from 'express'
import Task from '../models/task';
import HttpException from '../exceptions/httpException';
import authMiddleware from '../middlewares/auth';
import validationMiddleware from '../middlewares/validation';
import { body } from 'express-validator';

const router = Router();

//create task
router.post('/', [
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty')
], 
validationMiddleware, 
authMiddleware,
async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title, 
            description,
            user: req.user.id,
        });

        return res.status(201).json(task);
    } catch (error) {
        return next(error);
    }
})

//get all tasks
router.get('/my-tasks', authMiddleware,
async (req, res, next) => {
    try {

        const tasks = await Task.find({ user: req.user.id });
        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
});

//update task
router.put('/:id', [
    body('completed').isBoolean().toBoolean(),
], 
validationMiddleware, 
authMiddleware,
async (req, res, next) => {
    try {
        const { completed } = req.body;

        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if(!task) throw new HttpException('Not Found', 404);

        task.completed = completed;
        await task.save();

        return res.status(200).json(task);
    } catch (error) {
        return next(error);
    }
})

//get one task
router.get('/:id', authMiddleware,
async (req, res, next) => {
    try {

        const task = await Task.findOne({ _id: req.params.id });

        if(!task) throw new HttpException('Not Found', 404);

        return res.status(200).json(task);
    } catch (error) {
        return next(error);
    }
});


//delete one task
router.delete('/:id', authMiddleware,
async (req, res, next) => {
    try {

        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if(!task) throw new HttpException('Not Found', 404);

        await Task.deleteOne({ _id: task.id });

        return res.status(200).json(task);
    } catch (error) {
        return next(error);
    }
});




export default router;
