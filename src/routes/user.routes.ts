import express from 'express';
import { UserController } from '../controllers/user.controller';
import { admin_auth } from '../middlewares/adminAuth.middleware';
import { DeleteReqGroup } from '../types/request/group.request';
import { LoginReqUser, SaveReqUser, UpdateReqUser } from '../types/request/user.request';
import { SaveLoginResUser } from '../types/response/user.response';
import customError from '../utils/error.utils';
import jwt from 'jsonwebtoken'
import { user_auth } from '../middlewares/userAuth.middleware';

export class UserRoutes {
    router: express.Router;

    constructor() {

        this.router = express.Router();
        this.routes();
    }

    routes() {

        this.router.post('/saveUser', async (req, res, next) => {
            try {

                const saveReq: SaveReqUser = req.body;
                const new_user: SaveLoginResUser = await new UserController().saveUser(saveReq);
                if(!new_user) throw new customError(404, 'User not saved');
                
                res.status(200).json({
                    message: 'User Saved',
                    new_user
                });
            }catch(err) {
                next(err);
            }
        });

        this.router.delete('/deleteUser', admin_auth, async (req, res, next) => {
            try{

                const del_Req: DeleteReqGroup = req.body;
                const deleted_group = await new UserController().deleteUser(del_Req);

                res.status(200).json({
                    message: 'User Deleted'
                });
            }catch(err) {

            }
        });

        this.router.put('/updateUser', user_auth, async (req, res, next) => {
            try{

                const user: UpdateReqUser = req.body;
                const updated_user: SaveLoginResUser = await new UserController().updateUser(user);

                res.status(200).json({
                    updated_user 
                });
            } catch(err) {
                next(err);
            }
        });

        this.router.post('/loginUser', async (req, res, next) => {
            try{

                const auth_req: LoginReqUser = req.body;
                const auth_user: SaveLoginResUser = await new UserController().findUser(auth_req);

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

export const user_api = new UserRoutes().router;