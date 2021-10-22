import { IGroupMember, IGroupMessages } from "../document/group.document";


export interface SaveUpdateResGroup{
    _id: string;
    name: string;
    member: IGroupMember[];
    message: IGroupMessages[];
    createdAt: string;
    updatedAt: string;
}

export interface WordCheckResGroup {
    employees: string[];
    group: Group[];
}

export interface Group {
    groupName: string;
    groupId: string;
}