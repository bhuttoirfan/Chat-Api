export interface SaveReqUser {
    userName: string;
    email: string;
    password: string;
    pictureUrl: string;
}

export interface DeleteReqUser {
    _id: string;
}

export interface UpdateReqUser {
    _id:string;
    userName: string;
    email: string;
    password: string;
    pictureUrl: string;
}

export interface LoginReqUser {
    email: string;
    password: string;
}