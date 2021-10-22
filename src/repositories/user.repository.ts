import { user_schema } from "../models/user.model";
import { DeleteReqUser, LoginReqUser, SaveReqUser, UpdateReqUser } from "../types/request/user.request";

export class MainUser {
    constructor() {}

    saveUser(saveReq: SaveReqUser) {
        return new user_schema(saveReq).save();
    }

    deleteUser(delReq: DeleteReqUser) {
        return user_schema.findByIdAndDelete(delReq._id);
    }

    updateUser(updReq: UpdateReqUser) {
        return user_schema.findByIdAndUpdate(updReq._id, updReq, {new: true});
    }

    findUser(loginReq: LoginReqUser) {
        return user_schema.findOne({
            email: loginReq.email,
            password: loginReq.password
        });
    }
}