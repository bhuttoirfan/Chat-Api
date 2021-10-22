import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { LoginReqAdmin, SaveReqAdmin } from '../types/request/admin.request';
import { SaveLoginResAdmin } from '../types/response/admin.response';
import jwt from 'jsonwebtoken';
import customError from '../utils/error.utils';

export class AdminRoutes {
    router: express.Router;

    constructor() {

        this.router = express.Router();
        this.routes();
    }

    routes() {
        
        this.router.post('/saveAdmin', async(req, res, next) => {
            try{
                
                const admin: SaveReqAdmin = req.body;
                const new_admin: SaveLoginResAdmin = await new AdminController().saveAdmin(admin);
                
                res.status(200).json({
                    message: new_admin
                });
            }catch(err) {
                next(err);
            }
        });

        this.router.post('/loginAdmin', async (req, res, next) => {
            try{

                const auth_req: LoginReqAdmin = req.body;
                const auth_user: SaveLoginResAdmin = await new AdminController().findAdmin(auth_req);

                if(auth_user) {
                    if(auth_req.email === auth_user.email && auth_req.password === auth_user.password) {

                        res.json({
                            token: jwt.sign(
                                {_id: auth_user._id}, 'this is the key'
                            )
                        });
                    }else {
                
                        res.status(200).json({message: 'User not found'});    
                    }
                }else {
                    res.status(200).json({message: 'User not found'});
                }
            }catch(err) {
                next(err);
            }
        });
    }
}

export const admin_api = new AdminRoutes().router;