import { decode } from "jsonwebtoken";
import User from '../models/user';
import HttpException from "../exceptions/httpException";

const auth = async (req, res, next) => {
    const token = req.headers['authorization']
    
    if(!token || !token.split(' ')[1]) {
       return next(new HttpException('Authorization Denied' ,401));
    }
    const tokenStr = token.split(' ')[1];
    const decodedUser = decode(tokenStr);

    if(!decodedUser) return next(new HttpException('Authorization Denied', 401));
    
    req.user = decodedUser;
    
    return next()
}

export default auth;