import { IGroupMember, IGroupMessages } from "../document/group.document";

export interface SaveReqGroup {
    name: string;
    member: IGroupMember[];
    message: IGroupMessages[];
}

export interface DeleteReqGroup {
    _id: string;
}

export interface AddReqUserToGroup {
    groupId: string;
    userId: string;
}

export interface CheckReqMessages {
    groupId: string;
}

export interface AddReqMessageToGroup {
    groupId: string;
    userId: string;
    message: string;
}
