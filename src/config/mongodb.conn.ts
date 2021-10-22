import { connect, connection } from 'mongoose';

export class MongoDb {
    constructor() {}

    connect(h: string, dbName: string, u?: string, pass?: string, p?:number) {

        let connectionUrl = `mongodb://${h}/${dbName}`;
        
        if(u != undefined && pass != undefined) {
            // mongodb+srv://irfan_khan:<password>@cluster0.i4vog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
            connectionUrl = `mongodb+srv://${u}:${pass}@cluster0.i4vog.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        }

        connect(connectionUrl, (err: any) => {
            
            if(err) {
                console.log('Error in db')
                console.log(err);
            } else {

                console.log('connection successful with database');
            }
        }); 
    }
}

export const mon_stat_connection = connection.readyState;