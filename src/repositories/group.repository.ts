import { group_schema } from "../models/group.model";
import { IGroup } from "../types/document/group.document";
import { AddReqMessageToGroup, AddReqUserToGroup, CheckReqMessages, DeleteReqGroup, SaveReqGroup } from "../types/request/group.request";

export class MainGroup {
    constructor() {}

    saveGroup(saveReq: SaveReqGroup) {
        return new group_schema(saveReq).save();
    }

    deleteGroup(delReq: DeleteReqGroup) {
        return group_schema.findByIdAndDelete(delReq._id);
    }


    findGroup(reqFind: AddReqUserToGroup){
        return group_schema.findById(reqFind.groupId);
    }

    findGroupForMessage(reqFind: AddReqMessageToGroup){
        return group_schema.findById(reqFind.groupId);
    }

    addUserOrMessageToGroup(updReq: IGroup) {
        return group_schema.findByIdAndUpdate(updReq._id, updReq, {new: true});
    }

    checkMessages(msgsReq: CheckReqMessages) {
        return group_schema.findById(msgsReq.groupId);
    }

    allGroups() {
        return group_schema.find();
    }

    messageCount(_id: string) {
        const aggregate = group_schema.aggregate([
            {
                $match: { gId: {_id} }
            }
        ]);

        console.log(aggregate);
    }
}