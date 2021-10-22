import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { user_schema } from '../models/user.model';

export const user_auth = async (req: Request, res: Response, next: NextFunction) => {

    const token: any = req.header('token');
    if (!token) return res.send('Unauthorised');

    const user_id: any = jwt.verify(token, 'this is the key');
    res.locals.useid = user_id._id;

    const user = await user_schema.findById(user_id._id);
    if (user) {
        
        res.locals.id = user_id._id;
        next();
    } else {
        return res.status(400).json({
            message: 'user for login not found'
        });
    }

}