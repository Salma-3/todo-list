import { validationResult } from "express-validator";
import HttpException from "../exceptions/httpException";

const validate = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return next(new HttpException('Bad Request', 400, result.errors))
    }else {
        return next();
    }
}

export default validate;