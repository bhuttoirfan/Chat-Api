import { Document } from "mongoose";

export interface IAdmin extends Document {
    _id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}