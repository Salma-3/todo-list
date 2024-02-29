import User from '../models/user';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { Router } from 'express';
import { body } from 'express-validator';
import HttpException from '../exceptions/httpException';
import validationMiddleware from '../middlewares/validation';
import authMiddleware from '../middlewares/auth';

const router = Router();


//signup route
router.post('/signup', [
    body('email').isEmail().withMessage('invalid email'),
    body('username').notEmpty().withMessage('invalid sername'),
    body('password').notEmpty().withMessage('invalid password'),
], validationMiddleware, async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        //check if the email is used before
        const findUser = await User.findOne({ email });

        if(findUser) throw new HttpException('This email is registred', 409);

        const user = await User.create({ username, email, password });
        
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60});

        res.status(201).json({
            user, 
            token,
        })

    } catch (error) {
        next(error)
    }
});

//login route
router.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage('invalid password'),
], validationMiddleware, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check if the email is used before
        const findUser = await User.findOne({ email });

        if(!findUser) throw new HttpException('Invalid credentials', 400);

        const isMatch = await compare(password, findUser.password);

        if(!isMatch) throw new HttpException('Invalid credentials', 400);
        
        const token = jwt.sign(findUser.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60});

        res.status(200).json({
            user: findUser, 
            token,
        })

    } catch (error) {
        next(error)
    }
});

//login route
router.get('/current', authMiddleware, async (req, res, next) => {
    try {
       return res.json(req.user);
    } catch (error) {
        next(error)
    }
});

export default router;