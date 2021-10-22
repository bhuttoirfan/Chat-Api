import {Route, Tags, Body, Post} from 'tsoa';
import { MainAdmin } from '../repositories/admin.repository';
import { IAdmin } from '../types/document/admin.document';
import customError from '../utils/error.utils';
import { SaveReqAdmin, LoginReqAdmin } from '../types/request/admin.request';
import { SaveLoginResAdmin } from '../types/response/admin.response';

@Route('Admin')
@Tags('Admin Routes')
export class AdminController {
    constructor() {}

    @Post('/saveAdmin')
    async saveAdmin(@Body() admin: SaveReqAdmin): Promise<SaveLoginResAdmin> {

        const new_admin: IAdmin =<any> await new MainAdmin().saveAdmin(admin);
        if(!new_admin) throw new customError(404, 'Admin not saved');
        
        return <SaveLoginResAdmin>new_admin;
    }

    @Post('/loginAdmin')
    async findAdmin(@Body() reqFind: LoginReqAdmin): Promise<SaveLoginResAdmin> {

        const admin: IAdmin =<any> await new MainAdmin().findAdmin(reqFind);
        return <SaveLoginResAdmin>admin;
    }

    
}