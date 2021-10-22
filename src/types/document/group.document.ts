import { Document } from "mongoose";

export interface IGroup extends Document{
    _id?: string;
    name: string;
    member: IGroupMember[];
    message: IGroupMessages[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IGroupMember{
    userId: string;
}

export interface IGroupMessages{
    userId: string;
    message: string;
}