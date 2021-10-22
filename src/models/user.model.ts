import { model, Schema } from "mongoose";
import { IUser } from "../types/document/user.document";

const i_user_schema = new Schema({
    userName: {type: String},
    email: {type: String},
    password: {type: String},
    pictureUrl: {type: String}
}, {timestamps: true});

export const user_schema = model<IUser>('user-schema', i_user_schema);