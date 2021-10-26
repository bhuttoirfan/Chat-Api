import {Post, Get, Delete, Body, SuccessResponse, Route, Tags, Security} from 'tsoa';
import { MainGroup } from '../repositories/group.repository';
import { IGroup } from '../types/document/group.document';
import { SaveReqGroup, DeleteReqGroup, AddReqUserToGroup, CheckReqMessages, AddReqMessageToGroup } from '../types/request/group.request';
import { SaveUpdateResGroup} from '../types/response/group.response';
import customError from '../utils/error.utils';

@Route('Group')
@Tags('Group Route')
export class GroupController {
    constructor() {}

    @Security('api_key')
    @Post('/saveGroup')
    async saveGroup(@Body() saveReq: SaveReqGroup): Promise<SaveUpdateResGroup> {

        const new_group: IGroup = await new MainGroup().saveGroup(saveReq);
        if(!new_group) throw new customError(404, 'Group not saved');

        return <SaveUpdateResGroup>new_group;
    }

    @Security('api_key')
    @Post('/addUserToGroup')
    async addUserToGroup(@Body() addReq: AddReqUserToGroup): Promise<SaveUpdateResGroup> {

        const group: IGroup =<any> await new MainGroup().findGroup(addReq);
        
        if(group) {
            
            group.member.push({
                userId: addReq.userId
            });

            const update_group: SaveUpdateResGroup =<any> await new MainGroup().addUserOrMessageToGroup(group);
            return <SaveUpdateResGroup>update_group;
        }else {
            
            throw new customError(404, 'Group not found');
        }

    }

    @Post('/saveMessageToGroup')
    async saveMessageToGroup(@Body() msgSave: AddReqMessageToGroup): Promise<SaveUpdateResGroup> {

        const group: IGroup =<any> await new MainGroup().findGroupForMessage(msgSave);
        
        if(group) {
            let userInGroup: Boolean = false;

            group.member.filter(function(cur) {
                
                if(cur.userId === msgSave.userId) {
                    userInGroup = true;
                }
            });

            if(userInGroup) {
                group.message.push({
                    userId: msgSave.userId,
                    message: msgSave.message
                });

                const update_group: SaveUpdateResGroup =<any> await new MainGroup().addUserOrMessageToGroup(group);
                return <SaveUpdateResGroup>update_group;
            }else {
            
                throw new customError(404, 'User not found');
            }

        }else {
            
            throw new customError(404, 'Group not found');
        }
    }

    @Security('api_key')
    @Get('/checkWords')
    async checkWords() {
        const groups: IGroup[] =<any> await new MainGroup().allGroups();

        let employees: string[] = [];
        let groupId: string[] = [];
        let groupName: string[] =[];

        if(groups) {
            
            groups.map((curGrp) => {
                curGrp.message.map((curMsg) => {
                    
                    if(curMsg.message.includes('Salary') || curMsg.message.includes('salary')) {
                        
                        if( !(employees.includes(curMsg.userId)) ) {
                            employees.push(curMsg.userId);
                        }

                        if( !(groupName.includes(curGrp.name)) ) {
                            groupName.push(curGrp.name);
                            groupId.push(<any>curGrp._id);
                        }
                    }
                });


            });

            return {
                employees,
                group: {
                    groupName,
                    groupId
                }
            };

        }
    }

    @Security('api_key')
    @Get('/noOfTimesWordUsed')
    async noOfTimesWordUsed() {
        const groups: IGroup[] =<any> await new MainGroup().allGroups();
        
        let employeeId: string[] = [];
        let wordCount: number[] = [];
        let count: number = 0, index: number = 0;

        let instanceOfEmployee = {
            employeeId,
            wordCount
        }

        groups.map((curGrp) => {
            curGrp.message.map((curMsg, i) => {
                let something =<any> new MainGroup().messageCount(<string>curGrp._id);

                if(curMsg.message.includes('Salary') || curMsg.message.includes('salary')) {
                    count++;

                    if( !instanceOfEmployee.employeeId.includes(curMsg.userId) ){
                        instanceOfEmployee.employeeId.push(curMsg.userId);
                    }else {
                        index++;
                    }
                }
                instanceOfEmployee.wordCount[index] = count;
                count = 0;
            }); 
        });

        return instanceOfEmployee;
    }

    @Security('api_key')
    @Delete('/deleteGroup')
    @SuccessResponse('200', 'Group Deleted Successfully.')
    async deleteGroup(@Body() delReq: DeleteReqGroup) {

        return await new MainGroup().deleteGroup(delReq);
    }

    @Security('api_key')
    @Post('/checkMessages')
    async checkMessages(@Body() msgsReq: CheckReqMessages) {
        
        const group: IGroup =<any> await new MainGroup().checkMessages(msgsReq);
        
        if(group) {

            let allMessages = [];
            
            allMessages = group.message.map((cur) => {
                return [cur.userId, cur.message];
            });
            
            return allMessages;
        }else {
            
            throw new customError(404, 'Group not found');
        }
    }
}