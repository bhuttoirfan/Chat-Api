import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { GroupController } from '../controllers/group.controller';
import { admin_auth } from '../middlewares/adminAuth.middleware';
import { AddReqMessageToGroup, AddReqUserToGroup, CheckReqMessages, DeleteReqGroup, SaveReqGroup } from '../types/request/group.request';
import { DeleteReqUser } from '../types/request/user.request';
import { SaveUpdateResGroup, WordCheckResGroup } from '../types/response/group.response';
import customError from '../utils/error.utils';

export class GroupRoutes{
    router: express.Router;

    constructor() {

        this.router = express.Router();
        this.routes();
    }

    routes() {

        this.router.post('/saveGroup', admin_auth, async (req, res, next    ) => {
            try{

                const saveReq: SaveReqGroup = req.body;
                const new_group: SaveUpdateResGroup = await new GroupController().saveGroup(saveReq);
                if(!new_group) throw new customError(404, 'Group not Saved');

                res.status(200).json({
                    message: 'Group Saved',
                    new_group
                });
            }catch(err) {
                next(err);
            } 
        });

        this.router.delete('/deleteGroup', admin_auth, async (req, res, next) => {
            try {

                const delReq: DeleteReqGroup = req.body;
                const deleted_group = await new GroupController().deleteGroup(delReq);
                
                res.status(200).json({
                    message: 'Group Deleted'
                });
            }catch (err) {
                next(err);
            }
        });

        this.router.post('/addUserToGroup', admin_auth, async (req, res, next) => {
            try{

                const addReq: AddReqUserToGroup = req.body;
                const updated_group: SaveUpdateResGroup = await new GroupController().addUserToGroup(addReq);

                res.status(200).json({
                    message: 'User added to group',
                    updated_group
                });
            }catch (err) {
                next(err);
            }
        });

        this.router.post('/saveMessageToGroup', async (req, res, next) => {
            try{

                const saveMsg: AddReqMessageToGroup = req.body;
                const updated_group: SaveUpdateResGroup =  await new GroupController().saveMessageToGroup(saveMsg);

                res.status(200).json({
                    message: 'User added to group',
                    updated_group
                });

            }catch(err) {
                next(err);
            }
        });

        this.router.post('/checkMessages', admin_auth, async (req, res, next) => {
            try{

                const msg_check_req: CheckReqMessages = req.body;
                let allMessages = await new GroupController().checkMessages(msg_check_req);

                res.status(200).json({
                    message: 'All Message:',
                    allMessages
                });
            }catch(err) {
                next(err);
            }
        });

        this.router.get('/checkWords', admin_auth, async (req, res, next) => {
            try{

                const info: WordCheckResGroup =<any> await new GroupController().checkWords();

                res.status(200).json({
                    info
                });
            }catch(err) {
                next(err);
            }
        });
        
        this.router.get('/noOfTimesWordUsed', admin_auth, async (req, res, next) => {
            try{

                const userAndWordCount = await new GroupController().noOfTimesWordUsed();

                res.status(200).json({
                    userAndWordCount
                });
            }catch(err) {
                next(err);
            }
        });
    }
}

export const gorup_api = new GroupRoutes().router;