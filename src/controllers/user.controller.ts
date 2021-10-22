import { IUser } from "../types/document/user.document";
import { SaveLoginResUser } from "../types/response/user.response";
import { MainUser } from "../repositories/user.repository";
import { SaveReqUser, DeleteReqUser, UpdateReqUser, LoginReqUser } from "../types/request/user.request";

import { Post, Delete, SuccessResponse, Route, Tags, Body, Security, Put} from 'tsoa';
import customError from '../utils/error.utils';

@Route('User')
@Tags('User Routes')
export class UserController {
    constructor() {}

    @Post('/saveUser')
    async saveUser(@Body() user: SaveReqUser): Promise<SaveLoginResUser> {

        const new_user: IUser =<any> await new MainUser().saveUser(user);
        if(!new_user) throw new customError(404, 'User not saved');

        return <SaveLoginResUser>new_user;
    }


    @Security('api_key')
    @Delete('/deleteUser')
    @SuccessResponse('200', 'User deleted from database')
    async deleteUser(@Body() delUser: DeleteReqUser) {
        
        return await new MainUser().deleteUser(delUser);
    }

    @Security('api_key')
    @Put('/updateUser')
    async updateUser (@Body() user: UpdateReqUser): Promise<SaveLoginResUser> {
        
        const updated_user: IUser =<any> await new MainUser().updateUser(user);
        if(!updated_user) throw new customError(404, 'User not updated');

        return <SaveLoginResUser>updated_user;
    }

    @Post('/loginUser')
    async findUser(@Body() reqFind: LoginReqUser): Promise<SaveLoginResUser> {

        const user: IUser =<any> await new MainUser().findUser(reqFind);
        return <SaveLoginResUser>user;
    }
}