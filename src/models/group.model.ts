import { model, Schema } from "mongoose";
import { IGroup } from "../types/document/group.document";

const i_group_schema = new Schema({
    name: {type: String},
    member: [
        {
            userId: {type: String}
        }
    ],
    message: [
        {
            userId: {type: String},
            message: {type: String}
        }
    ]
}, {timestamps: true});

export const group_schema = model<IGroup>('group-schema', i_group_schema);