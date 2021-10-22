import express from 'express';
import { admin_api } from './admin.routes';
import { gorup_api } from './group.routes';
import { user_api } from './user.routes';

export class MainApi {
    router: express.Router;

    constructor(){

        this.router = express.Router();
        this.routes();
    }

    routes() {
        
        this.router.use('/Admin', admin_api);
        this.router.use('/Group', gorup_api);
        this.router.use('/User', user_api);
    }
}

export const main_api = new MainApi().router;