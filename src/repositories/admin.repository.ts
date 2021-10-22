import { admin_schema } from "../models/admin.model";
import { LoginReqAdmin, SaveReqAdmin } from "../types/request/admin.request";

export class MainAdmin {
    constructor() {}

    saveAdmin(saveReq: SaveReqAdmin) {
        return new admin_schema(saveReq).save();
    }

    findAdmin(findReq: LoginReqAdmin) {
        return admin_schema.findOne({
            email: findReq.email,
            password: findReq.password
        });
    }
}